import { combineLatest, concat, from, map, Observable, tap } from "rxjs";
import {
  DeployedHydraStakeOnchainContract,
  DerivedLaunchpadContractState,
  LaunchpadContract,
  LaunchpadContractProviders,
  SaleData,
  StateraLaunchpadPrivateStateId,
} from "./common-types.js";
import {
  CoinPublicKey,
  ContractAddress,
  EncodedCoinPublicKey,
} from "@midnight-ntwrk/compact-runtime";
import {
  deployContract,
  FinalizedCallTxData,
  findDeployedContract,
} from "@midnight-ntwrk/midnight-js-contracts";
import {
  Contract,
  createLaunchpadPrivateState,
  ledger,
  StateraLaunchpadPrivateState,
  witnesses,
  type CoinInfo,
} from "@repo/launchpad-contract";
import { type Logger } from "pino";
import {
  derivedContractSales,
  derivedFundingInfo,
  derivedRaisedTokenPools,
  randomNonceBytes,
} from "./utils.js";
import {
  decodeCoinPublicKey,
  encodeCoinPublicKey,
  encodeTokenType,
  nativeToken,
} from "@midnight-ntwrk/ledger";

const LaunchpadContractInstance: LaunchpadContract = new Contract(witnesses);

export interface DeployedLaunchpadAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state: Observable<DerivedLaunchpadContractState>;
  createSale: (
    saleData: SaleData
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "createSale">>;
  fundSale: (
    sale_id: number,
    amount: number
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "fundSale">>;
  refund: (
    sale_id: number
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "refund">>;
  claimTokens: (
    amount: number
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "claimTokens">>;
  receiveFundsRaised: (
    sale_id: number
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "receiveFundsRaised">>;
  cancelSale: (
    sale_id: number
  ) => Promise<FinalizedCallTxData<LaunchpadContract, "cancelSale">>;
}

export class LaunchpadAPI implements DeployedLaunchpadAPI {
  deployedContractAddress: string;
  state: Observable<DerivedLaunchpadContractState>;

  private constructor(
    providers: LaunchpadContractProviders,
    public readonly allReadyDeployedContract: DeployedHydraStakeOnchainContract,
    private logger?: Logger
  ) {
    this.deployedContractAddress =
      allReadyDeployedContract.deployTxData.public.contractAddress;

    // Set the state property
    this.state = combineLatest(
      [
        providers.publicDataProvider
          .contractStateObservable(this.deployedContractAddress, {
            type: "all",
          })
          .pipe(
            map((contractState) => ledger(contractState.data)),
            tap((ledgerState) =>
              logger?.trace({
                ledgerStaeChanged: {
                  ledgerState: {
                    ...ledgerState,
                  },
                },
              })
            )
          ),
        concat(
          from(
            providers.privateStateProvider.get(StateraLaunchpadPrivateStateId)
          )
        ),
      ],
      (ledgerState, privateState) => {
        return {
          TVL: ledgerState.TVL,
          TokenSold: ledgerState.TokenSold,
          raisedTokenPools: derivedRaisedTokenPools(
            ledgerState.raisedTokenPools
          ),
          superAdmin: ledgerState.superAdmin,
          admins: Array.from(ledgerState.admins),
          allowedUser: Array.from(ledgerState.allowedUser),
          contractSalesInfo: derivedContractSales(
            ledgerState.contractSalesInfo
          ),
          fundingInfo: derivedFundingInfo(ledgerState.fundingInfo),
        };
      }
    );
  }

  static async deployLaunchpadContract(
    providers: LaunchpadContractProviders
  ): Promise<LaunchpadAPI> {
    const deployedContract = await deployContract<LaunchpadContract>(
      providers,
      {
        contract: LaunchpadContractInstance,
        initialPrivateState: await LaunchpadAPI.getPrivateState(providers),
        privateStateId: StateraLaunchpadPrivateStateId,
        args: [randomNonceBytes(32)],
      }
    );

    console.log("Deployment successful", {
      contractDeployed: {
        finalizedDeployTxData: deployedContract.deployTxData.public,
      },
    });

    return new LaunchpadAPI(providers, deployedContract);
  }

  static async joinLaunchpadContract(
    providers: LaunchpadContractProviders,
    contractAddress: string,
    logger?: Logger
  ): Promise<LaunchpadAPI> {
    logger?.info({
      joinContract: {
        contractAddress,
      },
    });
    const existingContract = await findDeployedContract<LaunchpadContract>(
      providers,
      {
        contract: LaunchpadContractInstance,
        contractAddress: contractAddress,
        privateStateId: StateraLaunchpadPrivateStateId,
        initialPrivateState: await LaunchpadAPI.getPrivateState(providers),
      }
    );

    logger?.trace("Found Contract...", {
      contractJoined: {
        finalizedDeployTxData: existingContract.deployTxData.public,
      },
    });
    return new LaunchpadAPI(providers, existingContract, logger);
  }

  public createSale(saleData: SaleData) {
    const txData = this.allReadyDeployedContract.callTx.createSale(
      saleData.start_price * saleData.scale_factor,
      saleData.total_amount * saleData.scale_factor,
      saleData.exchange_token,
      saleData.end_time,
      saleData.min * saleData.scale_factor,
      saleData.max * saleData.scale_factor,
      saleData.infoCID,
      saleData.price_slope,
      saleData.tge_allocation_percentage,
      saleData.vesting_duration,
      saleData.cliff_period,
      saleData.is_overflow,
      saleData.is_private,
      saleData.organiser,
      saleData.scale_factor
    );

    return txData;
  }

  public fundSale(sale_id: number, amount: number) {
    const txData = this.allReadyDeployedContract.callTx.fundSale(
      this.coin(amount),
      BigInt(sale_id)
    );
    return txData;
  }

  public refund(sale_id: number) {
    const txData = this.allReadyDeployedContract.callTx.refund(BigInt(sale_id));
    return txData;
  }

  public claimTokens(sale_id: number) {
    const txData = this.allReadyDeployedContract.callTx.claimTokens(
      BigInt(sale_id)
    );
    return txData;
  }

  public receiveFundsRaised(sale_id: number) {
    const txData = this.allReadyDeployedContract.callTx.receiveFundsRaised(
      BigInt(sale_id)
    );
    return txData;
  }

  public cancelSale(sale_id: number) {
    const txData = this.allReadyDeployedContract.callTx.cancelSale(
      BigInt(sale_id)
    );

    return txData;
  }

  private coin(amount: number): CoinInfo {
    return {
      color: encodeTokenType(nativeToken()),
      nonce: randomNonceBytes(32),
      value: BigInt(amount),
    };
  }

  // Used to get the private state from the wallets privateState Provider
  private static async getPrivateState(
    providers: LaunchpadContractProviders
  ): Promise<StateraLaunchpadPrivateState> {
    const existingPrivateState = await providers.privateStateProvider.get(
      StateraLaunchpadPrivateStateId
    );
    return (
      existingPrivateState ?? createLaunchpadPrivateState(randomNonceBytes(32))
    );
  }

  public createPublicKey(str: string): CoinPublicKey {
    const encoded = new TextEncoder().encode(str);
    const hexChars: string[] = [];

    for (let i = 0; i < 32; i++) {
      const byte =
        i < encoded.length
          ? encoded[i]
          : (str.charCodeAt(i % str.length) + i) % 256;
      hexChars.push(byte.toString(16).padStart(2, "0"));
    }

    return hexChars.join("") as CoinPublicKey;
  }

  public coinPubKeyToEncodedPubKey(str: CoinPublicKey): EncodedCoinPublicKey {
    return { bytes: encodeCoinPublicKey(str) };
  }

  public encodedPubKeyToCoinPubKey(
    encodePubKey: EncodedCoinPublicKey
  ): CoinPublicKey {
    return decodeCoinPublicKey(encodePubKey.bytes);
  }
}

export * as utils from "./utils.js";
export * from "./common-types.js";
