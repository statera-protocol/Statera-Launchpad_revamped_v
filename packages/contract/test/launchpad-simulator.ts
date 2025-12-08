import {
  type CircuitContext,
  QueryContext,
  sampleContractAddress,
  constructorContext,
  type CoinPublicKey,
  EncodedCoinPublicKey,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Ledger,
  ledger,
  CoinInfo,
  Witnesses,
} from "../src/managed/statera-launchpad/contract/index.cjs";
import {
  type StateraLaunchpadPrivateState,
  witnesses,
} from "../src/witnesses.js";
import { toHex, fromHex, isHex } from "@midnight-ntwrk/midnight-js-utils";
import { sampleTokenType } from "@midnight-ntwrk/zswap";
import {
  createCoinInfo,
  decodeCoinPublicKey,
  encodeCoinInfo,
  encodeCoinPublicKey,
} from "@midnight-ntwrk/ledger";
import { TextEncoder } from "util";
import { randomBytes } from "./utils.js";

export class LaunchpadSimulator {
  readonly contract: Contract<StateraLaunchpadPrivateState>;
  public baseContext: CircuitContext<StateraLaunchpadPrivateState>;
  public witnesses: Witnesses<StateraLaunchpadPrivateState>;

  constructor(privateState: StateraLaunchpadPrivateState) {
    this.contract = new Contract<StateraLaunchpadPrivateState>(witnesses);
    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState,
    } = this.contract.initialState(
      constructorContext(privateState, this.createPublicKey("super-admin")),
      this.coinPubKeyToEncodedPubKey(this.createPublicKey("peter")),
      randomBytes(32)
    );
    const {
      local_secret_key,
      get_current_time,
      calculate_total_allocation,
      update_user_private_state,
      confirm_sale_in_private_state,
      get_user_private_state_hash,
      remove_sale_from_private_state,
      calculate_vest_claim_percentage_per_day,
      calculate_total_vest_claim,
      calculate_claim_amount,
    } = this.contract.witnesses;

    this.baseContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(
        currentContractState.data,
        sampleContractAddress()
      ),
    };

    this.witnesses = {
      local_secret_key,
      get_current_time,
      calculate_total_allocation,
      update_user_private_state,
      confirm_sale_in_private_state,
      get_user_private_state_hash,
      remove_sale_from_private_state,
      calculate_vest_claim_percentage_per_day,
      calculate_total_vest_claim,
      calculate_claim_amount,
    };
  }

  public getLedger(): Ledger {
    return ledger(this.baseContext.transactionContext.state);
  }

  public getPrivateState(): StateraLaunchpadPrivateState {
    return this.baseContext.currentPrivateState;
  }

  public coin(amount: number): CoinInfo {
    return encodeCoinInfo(createCoinInfo(this.coinType, BigInt(amount)));
  }

  public coinType = sampleTokenType();

  public createToken(amount: bigint): void {
    const result = this.contract.impureCircuits.createYourToken(
      this.baseContext,
      randomBytes(32),
      amount
    );
    this.baseContext = result.context;
  }

  public joinAllowedList(userId: CoinPublicKey): void {
    const result = this.contract.impureCircuits.joinAllowedList(
      this.baseContext,
      this.coinPubKeyToEncodedPubKey(userId).bytes
    );
    this.baseContext = result.context;
  }

  public createTokenSale(
    start_price: bigint,
    total_amount: bigint,
    exchange_token: Uint8Array,
    end_time: bigint,
    min: bigint,
    max: bigint,
    infoCID: Uint8Array,
    price_slope: bigint,
    isPrivate: boolean,
    cliff_period: bigint,
    tge_period: bigint,
    tge_allocation_percentage: bigint,
    vesting_duration: bigint
  ): void {
    const saleData = [
      start_price,
      total_amount,
      exchange_token,
      end_time,
      min,
      max,
      infoCID,
      price_slope,
      isPrivate,
      cliff_period,
      tge_period,
      tge_allocation_percentage,
      vesting_duration,
    ] as const;

    const result = this.contract.impureCircuits.createSale(
      this.baseContext,
      ...saleData
    );
    this.baseContext = result.context;
  }

  public receiveToken(amount: number): void {
    const result = this.contract.impureCircuits.receiveSaleToken(
      this.baseContext,
      this.coin(amount)
    );
    this.baseContext = result.context;
  }

  public receiveFundsByOrganizer(saleId: number): void {
    const result = this.contract.impureCircuits.receiveFundsRaised(
      this.baseContext,
      BigInt(saleId)
    );
    this.baseContext = result.context;
  }

  public fundSale(coin: CoinInfo, sale_id: bigint): void {
    const result = this.contract.impureCircuits.fundSale(
      this.baseContext,
      coin,
      sale_id
    );
    this.baseContext = result.context;
  }

  public refund(sale_id: bigint, refundAmount: bigint): void {
    const result = this.contract.impureCircuits.refund(
      this.baseContext,
      sale_id,
      refundAmount
    );
    this.baseContext = result.context;
  }

  public claimTokens(sale_id: bigint): void {
    const result = this.contract.impureCircuits.claimTokens(
      this.baseContext,
      sale_id
    );
    this.baseContext = result.context;
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
