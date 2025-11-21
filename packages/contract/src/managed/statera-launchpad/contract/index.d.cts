import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type SaleInfo = { target: bigint;
                         startTime: bigint;
                         endTime: bigint;
                         totalTokenAmount: bigint;
                         totalTokenSold: bigint;
                         saleInfoCID: Uint8Array;
                         amountRaised: bigint;
                         acceptableExchangeToken: Uint8Array;
                         hasEnded: boolean;
                         min: bigint;
                         max: bigint;
                         participant: bigint;
                         organizer: Uint8Array;
                         hasWithdrawn: boolean;
                         exchangeRatio: bigint;
                         saleType: Sale;
                         slope: bigint
                       };

export enum Sale { fixed = 0, batch = 1, Overflow = 2, whiteList = 3 }

export type Witnesses<T> = {
  local_secret_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  generate_sale_id(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
}

export type ImpureCircuits<T> = {
  createFixedSale(context: __compactRuntime.CircuitContext<T>,
                  start_price_0: bigint,
                  total_amount_0: bigint,
                  total_amount_sold_0: bigint,
                  exchange_token_0: Uint8Array,
                  current_time_0: bigint,
                  end_time_0: bigint,
                  min_0: bigint,
                  max_0: bigint,
                  infoCID_0: Uint8Array,
                  price_slope_0: bigint): __compactRuntime.CircuitResults<T, []>;
  createWhiteListSale(context: __compactRuntime.CircuitContext<T>,
                      start_price_0: bigint,
                      total_amount_0: bigint,
                      total_amount_sold_0: bigint,
                      exchange_token_0: Uint8Array,
                      current_time_0: bigint,
                      end_time_0: bigint,
                      min_0: bigint,
                      max_0: bigint,
                      infoCID_0: Uint8Array,
                      price_slope_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  createFixedSale(context: __compactRuntime.CircuitContext<T>,
                  start_price_0: bigint,
                  total_amount_0: bigint,
                  total_amount_sold_0: bigint,
                  exchange_token_0: Uint8Array,
                  current_time_0: bigint,
                  end_time_0: bigint,
                  min_0: bigint,
                  max_0: bigint,
                  infoCID_0: Uint8Array,
                  price_slope_0: bigint): __compactRuntime.CircuitResults<T, []>;
  createWhiteListSale(context: __compactRuntime.CircuitContext<T>,
                      start_price_0: bigint,
                      total_amount_0: bigint,
                      total_amount_sold_0: bigint,
                      exchange_token_0: Uint8Array,
                      current_time_0: bigint,
                      end_time_0: bigint,
                      min_0: bigint,
                      max_0: bigint,
                      infoCID_0: Uint8Array,
                      price_slope_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly TVL: { nonce: Uint8Array,
                  color: Uint8Array,
                  value: bigint,
                  mt_index: bigint
                };
  readonly raisedTokenPool: { nonce: Uint8Array,
                              color: Uint8Array,
                              value: bigint,
                              mt_index: bigint
                            };
  readonly superAdmin: Uint8Array;
  contractSalesInfo: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): SaleInfo;
    [Symbol.iterator](): Iterator<[Uint8Array, SaleInfo]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               coinPubKey_0: Uint8Array,
               initialNonce_0: Uint8Array): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
