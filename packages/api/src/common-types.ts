import {
  Contract,
  Witnesses,
  StateraLaunchpadPrivateState,
  FundingInfo,
  SaleInfo,
  QualifiedCoinInfo,
} from "@repo/launchpad-contract";
import { MidnightProviders } from "@midnight-ntwrk/midnight-js-types";
import { type FoundContract } from "@midnight-ntwrk/midnight-js-contracts";
import { EncodedCoinPublicKey } from "@midnight-ntwrk/compact-runtime";

export const contractAddress =
  "02002355b40f3a15136ed0eed0a977ae859d1c94f2d6975f1a8294ebed2525d4d2ff";
export const StateraLaunchpadPrivateStateId = "StateraLaunchpadPrivateState";
export type StateraLaunchpadPrivateStateId =
  typeof StateraLaunchpadPrivateStateId;
export type LaunchpadContract = Contract<
  StateraLaunchpadPrivateState,
  Witnesses<StateraLaunchpadPrivateState>
>;
export type TokenCircuitKeys = Exclude<
  keyof LaunchpadContract["impureCircuits"],
  number | symbol
>;

export type LaunchpadContractProviders = MidnightProviders<
  TokenCircuitKeys,
  StateraLaunchpadPrivateStateId,
  StateraLaunchpadPrivateState
>;

export type DeployedHydraStakeOnchainContract =
  FoundContract<LaunchpadContract>;

export interface SaleData {
  start_price: bigint;
  total_amount: bigint;
  exchange_token: Uint8Array;
  end_time: bigint;
  min: bigint;
  max: bigint;
  infoCID: Uint8Array;
  price_slope: bigint;
  tge_allocation_percentage: bigint;
  vesting_duration: bigint;
  cliff_period: bigint;
  is_overflow: boolean;
  is_private: boolean;
  organiser: EncodedCoinPublicKey;
  scale_factor: bigint;
}

type SaleType = ["Public", "Private"];
type SalePhase = ["Live", "Cancelled", "Ended"];
type Model = ["Fixed", "Overflow"];

export type DerivedLaunchpadContractState = {
  TVL: QualifiedCoinInfo;
  TokenSold: bigint;
  raisedTokenPools: DTokenPool;
  superAdmin: Uint8Array;
  admins: Uint8Array[];
  allowedUser: Uint8Array[];
  contractSalesInfo: DSaleInfos;
  fundingInfo: DFundingInfo;
};

export type DTokenPool = Array<{ id: bigint; pool: QualifiedCoinInfo }>;
export type DFundingInfo = Array<{
  publicKey: Uint8Array;
  privateStateCommit: FundingInfo;
}>;
export type DSaleInfos = Array<{
  id: bigint;
  saleInfo: SaleInfo;
}>;
