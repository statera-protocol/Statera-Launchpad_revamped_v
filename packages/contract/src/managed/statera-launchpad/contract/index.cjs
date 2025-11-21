'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var Sale;
(function (Sale) {
  Sale[Sale['fixed'] = 0] = 'fixed';
  Sale[Sale['batch'] = 1] = 'batch';
  Sale[Sale['Overflow'] = 2] = 'Overflow';
  Sale[Sale['whiteList'] = 3] = 'whiteList';
})(Sale = exports.Sale || (exports.Sale = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _QualifiedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_1.fromValue(value_0),
      mt_index: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_1.toValue(value_0.value).concat(_descriptor_2.toValue(value_0.mt_index))));
  }
}

const _descriptor_3 = new _QualifiedCoinInfo_0();

const _descriptor_4 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(3, 1);

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _SaleInfo_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment()))))))))))))))));
  }
  fromValue(value_0) {
    return {
      target: _descriptor_2.fromValue(value_0),
      startTime: _descriptor_2.fromValue(value_0),
      endTime: _descriptor_2.fromValue(value_0),
      totalTokenAmount: _descriptor_1.fromValue(value_0),
      totalTokenSold: _descriptor_2.fromValue(value_0),
      saleInfoCID: _descriptor_0.fromValue(value_0),
      amountRaised: _descriptor_2.fromValue(value_0),
      acceptableExchangeToken: _descriptor_0.fromValue(value_0),
      hasEnded: _descriptor_4.fromValue(value_0),
      min: _descriptor_2.fromValue(value_0),
      max: _descriptor_2.fromValue(value_0),
      participant: _descriptor_5.fromValue(value_0),
      organizer: _descriptor_0.fromValue(value_0),
      hasWithdrawn: _descriptor_4.fromValue(value_0),
      exchangeRatio: _descriptor_2.fromValue(value_0),
      saleType: _descriptor_6.fromValue(value_0),
      slope: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.target).concat(_descriptor_2.toValue(value_0.startTime).concat(_descriptor_2.toValue(value_0.endTime).concat(_descriptor_1.toValue(value_0.totalTokenAmount).concat(_descriptor_2.toValue(value_0.totalTokenSold).concat(_descriptor_0.toValue(value_0.saleInfoCID).concat(_descriptor_2.toValue(value_0.amountRaised).concat(_descriptor_0.toValue(value_0.acceptableExchangeToken).concat(_descriptor_4.toValue(value_0.hasEnded).concat(_descriptor_2.toValue(value_0.min).concat(_descriptor_2.toValue(value_0.max).concat(_descriptor_5.toValue(value_0.participant).concat(_descriptor_0.toValue(value_0.organizer).concat(_descriptor_4.toValue(value_0.hasWithdrawn).concat(_descriptor_2.toValue(value_0.exchangeRatio).concat(_descriptor_6.toValue(value_0.saleType).concat(_descriptor_7.toValue(value_0.slope)))))))))))))))));
  }
}

const _descriptor_8 = new _SaleInfo_0();

const _descriptor_9 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.local_secret_key) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_secret_key');
    }
    if (typeof(witnesses_0.generate_sale_id) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named generate_sale_id');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      createFixedSale: (...args_1) => {
        if (args_1.length !== 11) {
          throw new __compactRuntime.CompactError(`createFixedSale: expected 11 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const start_price_0 = args_1[1];
        const total_amount_0 = args_1[2];
        const total_amount_sold_0 = args_1[3];
        const exchange_token_0 = args_1[4];
        const current_time_0 = args_1[5];
        const end_time_0 = args_1[6];
        const min_0 = args_1[7];
        const max_0 = args_1[8];
        const infoCID_0 = args_1[9];
        const price_slope_0 = args_1[10];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 1 (as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(start_price_0) === 'bigint' && start_price_0 >= 0n && start_price_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      start_price_0)
        }
        if (!(typeof(total_amount_0) === 'bigint' && total_amount_0 >= 0n && total_amount_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      total_amount_0)
        }
        if (!(typeof(total_amount_sold_0) === 'bigint' && total_amount_sold_0 >= 0n && total_amount_sold_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      total_amount_sold_0)
        }
        if (!(exchange_token_0.buffer instanceof ArrayBuffer && exchange_token_0.BYTES_PER_ELEMENT === 1 && exchange_token_0.length === 32)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Bytes<32>',
                                      exchange_token_0)
        }
        if (!(typeof(current_time_0) === 'bigint' && current_time_0 >= 0n && current_time_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      current_time_0)
        }
        if (!(typeof(end_time_0) === 'bigint' && end_time_0 >= 0n && end_time_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      end_time_0)
        }
        if (!(typeof(min_0) === 'bigint' && min_0 >= 0n && min_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      min_0)
        }
        if (!(typeof(max_0) === 'bigint' && max_0 >= 0n && max_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..18446744073709551615>',
                                      max_0)
        }
        if (!(infoCID_0.buffer instanceof ArrayBuffer && infoCID_0.BYTES_PER_ELEMENT === 1 && infoCID_0.length === 32)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Bytes<32>',
                                      infoCID_0)
        }
        if (!(typeof(price_slope_0) === 'bigint' && price_slope_0 >= 0n && price_slope_0 <= 4294967295n)) {
          __compactRuntime.type_error('createFixedSale',
                                      'argument 10 (argument 11 as invoked from Typescript)',
                                      'FixedSale.compact line 10 char 5',
                                      'Uint<0..4294967295>',
                                      price_slope_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(start_price_0).concat(_descriptor_2.toValue(total_amount_0).concat(_descriptor_2.toValue(total_amount_sold_0).concat(_descriptor_0.toValue(exchange_token_0).concat(_descriptor_2.toValue(current_time_0).concat(_descriptor_2.toValue(end_time_0).concat(_descriptor_2.toValue(min_0).concat(_descriptor_2.toValue(max_0).concat(_descriptor_0.toValue(infoCID_0).concat(_descriptor_7.toValue(price_slope_0)))))))))),
            alignment: _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment())))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createFixedSale_0(context,
                                                 partialProofData,
                                                 start_price_0,
                                                 total_amount_0,
                                                 total_amount_sold_0,
                                                 exchange_token_0,
                                                 current_time_0,
                                                 end_time_0,
                                                 min_0,
                                                 max_0,
                                                 infoCID_0,
                                                 price_slope_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      createWhiteListSale: (...args_1) => {
        if (args_1.length !== 11) {
          throw new __compactRuntime.CompactError(`createWhiteListSale: expected 11 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const start_price_0 = args_1[1];
        const total_amount_0 = args_1[2];
        const total_amount_sold_0 = args_1[3];
        const exchange_token_0 = args_1[4];
        const current_time_0 = args_1[5];
        const end_time_0 = args_1[6];
        const min_0 = args_1[7];
        const max_0 = args_1[8];
        const infoCID_0 = args_1[9];
        const price_slope_0 = args_1[10];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 1 (as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(start_price_0) === 'bigint' && start_price_0 >= 0n && start_price_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      start_price_0)
        }
        if (!(typeof(total_amount_0) === 'bigint' && total_amount_0 >= 0n && total_amount_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      total_amount_0)
        }
        if (!(typeof(total_amount_sold_0) === 'bigint' && total_amount_sold_0 >= 0n && total_amount_sold_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      total_amount_sold_0)
        }
        if (!(exchange_token_0.buffer instanceof ArrayBuffer && exchange_token_0.BYTES_PER_ELEMENT === 1 && exchange_token_0.length === 32)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Bytes<32>',
                                      exchange_token_0)
        }
        if (!(typeof(current_time_0) === 'bigint' && current_time_0 >= 0n && current_time_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      current_time_0)
        }
        if (!(typeof(end_time_0) === 'bigint' && end_time_0 >= 0n && end_time_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      end_time_0)
        }
        if (!(typeof(min_0) === 'bigint' && min_0 >= 0n && min_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      min_0)
        }
        if (!(typeof(max_0) === 'bigint' && max_0 >= 0n && max_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..18446744073709551615>',
                                      max_0)
        }
        if (!(infoCID_0.buffer instanceof ArrayBuffer && infoCID_0.BYTES_PER_ELEMENT === 1 && infoCID_0.length === 32)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Bytes<32>',
                                      infoCID_0)
        }
        if (!(typeof(price_slope_0) === 'bigint' && price_slope_0 >= 0n && price_slope_0 <= 4294967295n)) {
          __compactRuntime.type_error('createWhiteListSale',
                                      'argument 10 (argument 11 as invoked from Typescript)',
                                      'WhiteListSale.compact line 8 char 5',
                                      'Uint<0..4294967295>',
                                      price_slope_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(start_price_0).concat(_descriptor_2.toValue(total_amount_0).concat(_descriptor_2.toValue(total_amount_sold_0).concat(_descriptor_0.toValue(exchange_token_0).concat(_descriptor_2.toValue(current_time_0).concat(_descriptor_2.toValue(end_time_0).concat(_descriptor_2.toValue(min_0).concat(_descriptor_2.toValue(max_0).concat(_descriptor_0.toValue(infoCID_0).concat(_descriptor_7.toValue(price_slope_0)))))))))),
            alignment: _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment())))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createWhiteListSale_0(context,
                                                     partialProofData,
                                                     start_price_0,
                                                     total_amount_0,
                                                     total_amount_sold_0,
                                                     exchange_token_0,
                                                     current_time_0,
                                                     end_time_0,
                                                     min_0,
                                                     max_0,
                                                     infoCID_0,
                                                     price_slope_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      createFixedSale: this.circuits.createFixedSale,
      createWhiteListSale: this.circuits.createWhiteListSale
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const coinPubKey_0 = args_0[1];
    const initialNonce_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(coinPubKey_0.buffer instanceof ArrayBuffer && coinPubKey_0.BYTES_PER_ELEMENT === 1 && coinPubKey_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 1 (argument 2 as invoked from Typescript)',
                                  'main.compact line 19 char 1',
                                  'Bytes<32>',
                                  coinPubKey_0)
    }
    if (!(initialNonce_0.buffer instanceof ArrayBuffer && initialNonce_0.BYTES_PER_ELEMENT === 1 && initialNonce_0.length === 32)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 2 (argument 3 as invoked from Typescript)',
                                  'main.compact line 19 char 1',
                                  'Bytes<32>',
                                  initialNonce_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('createFixedSale', new __compactRuntime.ContractOperation());
    state_0.setOperation('createWhiteListSale', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(1n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(3n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(4n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(5n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(6n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(7n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(7n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(initialNonce_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(6n),
                                                alignment: _descriptor_11.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_5.toValue(tmp_0),
                                              alignment: _descriptor_5.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(2n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(coinPubKey_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_9, value_0);
    return result_0;
  }
  _local_secret_key_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.local_secret_key(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('local_secret_key',
                                  'return value',
                                  'VariablesAndTypes.compact line 40 char 5',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _generate_sale_id_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.generate_sale_id(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('generate_sale_id',
                                  'return value',
                                  'VariablesAndTypes.compact line 41 char 5',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _public_key_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([115, 116, 97, 116, 101, 114, 97, 45, 108, 97, 117, 110, 99, 104, 112, 97, 100, 58, 117, 115, 101, 114, 45, 112, 107, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _createFixedSale_0(context,
                     partialProofData,
                     start_price_0,
                     total_amount_0,
                     total_amount_sold_0,
                     exchange_token_0,
                     current_time_0,
                     end_time_0,
                     min_0,
                     max_0,
                     infoCID_0,
                     price_slope_0)
  {
    __compactRuntime.assert(start_price_0 > 0n,
                            'Sale ratio must be greater than 0!');
    __compactRuntime.assert(total_amount_0 > 0n
                            &&
                            total_amount_0
                            <=
                            _descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value).value,
                            'Sale amount must be greater than 0!');
    const organizer_0 = this._public_key_0(this._local_secret_key_0(context,
                                                                    partialProofData));
    const saleId_0 = this._generate_sale_id_0(context, partialProofData);
    const tmp_0 = { target:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('FixedSale.compact line 32 char 21: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(total_amount_0 * start_price_0),
                    startTime: current_time_0,
                    endTime: end_time_0,
                    totalTokenAmount: total_amount_0,
                    totalTokenSold: total_amount_sold_0,
                    saleInfoCID: infoCID_0,
                    amountRaised: 0n,
                    acceptableExchangeToken: exchange_token_0,
                    hasEnded: false,
                    min: min_0,
                    max: max_0,
                    participant: 0n,
                    organizer: new Uint8Array(32),
                    hasWithdrawn: false,
                    exchangeRatio: start_price_0,
                    saleType: 0,
                    slope: price_slope_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(5n),
                                                alignment: _descriptor_11.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(saleId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _createWhiteListSale_0(context,
                         partialProofData,
                         start_price_0,
                         total_amount_0,
                         total_amount_sold_0,
                         exchange_token_0,
                         current_time_0,
                         end_time_0,
                         min_0,
                         max_0,
                         infoCID_0,
                         price_slope_0)
  {
    __compactRuntime.assert(start_price_0 > 0n,
                            'Sale ratio must be greater than 0!');
    __compactRuntime.assert(total_amount_0 > 0n
                            &&
                            total_amount_0
                            <=
                            _descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_11.toValue(0n),
                                                                                                alignment: _descriptor_11.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value).value,
                            'Sale amount must be greater than 0!');
    const organizer_0 = this._public_key_0(this._local_secret_key_0(context,
                                                                    partialProofData));
    const saleId_0 = this._generate_sale_id_0(context, partialProofData);
    const tmp_0 = { target:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('WhiteListSale.compact line 31 char 21: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(total_amount_0 * start_price_0),
                    startTime: current_time_0,
                    endTime: end_time_0,
                    totalTokenAmount: total_amount_0,
                    totalTokenSold: total_amount_sold_0,
                    saleInfoCID: infoCID_0,
                    amountRaised: 0n,
                    acceptableExchangeToken: exchange_token_0,
                    hasEnded: false,
                    min: min_0,
                    max: max_0,
                    participant: 0n,
                    organizer: new Uint8Array(32),
                    hasWithdrawn: false,
                    exchangeRatio: start_price_0,
                    saleType: 3,
                    slope: price_slope_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_11.toValue(5n),
                                                alignment: _descriptor_11.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(saleId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get TVL() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(0n),
                                                                                 alignment: _descriptor_11.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get raisedTokenPool() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(1n),
                                                                                 alignment: _descriptor_11.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get superAdmin() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_11.toValue(3n),
                                                                                 alignment: _descriptor_11.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    contractSalesInfo: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'VariablesAndTypes.compact line 13 char 5',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'VariablesAndTypes.compact line 13 char 5',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_11.toValue(5n),
                                                                                   alignment: _descriptor_11.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  local_secret_key: (...args) => undefined,
  generate_sale_id: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
