import { describe, it, expect } from "vitest";
import { LaunchpadSimulator } from "./launchpad-simulator.js";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { randomBytes } from "crypto";
import { daysToMilliseconds } from "./utils.js";
import { encodeTokenType } from "@midnight-ntwrk/ledger";

// Set network mode to undeployed (other options -- testnet, mainnet)
setNetworkId(NetworkId.Undeployed);

// instantiate the Simulator class
const simulator = new LaunchpadSimulator({
  secretKey: randomBytes(32),
  saleMetadata: [],
});

// only super admin can create token sale for organizers
const superAdmin = simulator.createPublicKey("super-admin");
// authourized users
const alice = simulator.createPublicKey("alice");
const james = simulator.createPublicKey("james");
const vera = simulator.createPublicKey("vera");
// unauthourized users
const peter = simulator.createPublicKey("peter"); // pteter is the sale organizer
const mary = simulator.createPublicKey("mary");

// should add users --  vera, and vera to the allowed list
describe("Contract test for adding users to allowed list", () => {
  it("should add users to allowed list for private token sales", () => {
    [alice, james, vera].forEach((pubKey) => {
      simulator.joinAllowedList(pubKey);
      expect(
        simulator
          .getLedger()
          .allowedUser.member(simulator.coinPubKeyToEncodedPubKey(pubKey).bytes)
      ).toBe(true);
    });

    expect(simulator.getLedger().allowedUser.size()).toBe(3n);

    [mary, peter].forEach((pubKey) => {
      expect(
        simulator
          .getLedger()
          .allowedUser.member(simulator.coinPubKeyToEncodedPubKey(pubKey).bytes)
      ).toBe(false);
    });
  });
});

describe("Contract test for receiving minted tokens from another contract", () => {
  // when a token sale is deployed, the token to be sold is received from another contract through midnight.js api - this demo the action
  it("should add tokens to TVL", () => {
    simulator.receiveToken(20000);
    expect(simulator.getLedger().TVL.value).toBe(20000n);
  });
});

describe("Contract test for sale creation", () => {
  it("should create new sale", () => {
    // Super admin create sale with token collected`
    expect(simulator.getLedger().contractSalesInfo.size()).toBe(0n);
    expect(simulator.getLedger().TokenSold).toBe(0n);

    simulator.createTokenSale(
      10n, // start price
      5000n, // The total amount of token to be sold in this particular sale
      encodeTokenType(simulator.coinType), // The token color of the exchange token - token to be receive
      daysToMilliseconds(1) + BigInt(Date.now()), // The time which a sale ends
      10n, // Min amount of token a user can buy
      1000n, // Max amount of token a user can buy
      randomBytes(32), // CID that points to other informatin about sale on ipfs
      1n, // influences the price, if it is a dynamic price sale
      false, // is sale private?
      10n, // the period whcih the token will be completely locked
      daysToMilliseconds(2) + BigInt(Date.now()), // tge period
      100n, // the percentage that should be withdrawn at TGE
      daysToMilliseconds(0) // vesting period
    );

    expect(simulator.getLedger().contractSalesInfo.size()).toBe(1n);
    expect(simulator.getLedger().TokenSold).toBe(5000n);

    simulator.createTokenSale(
      10n, // start price
      5000n, // The total amount of token to be sold in this particular sale
      encodeTokenType(simulator.coinType), // The token color of the exchange token - token to be receive
      daysToMilliseconds(1) + BigInt(Date.now()), // The time which a sale ends
      10n, // Min amount of token a user can buy
      1000n, // Max amount of token a user can buy
      randomBytes(32), // CID that points to other informatin about sale on ipfs
      0n, // influences the price, if it is a dynamic price sale
      true, // is sale private?
      10n, // the period whcih the token will be completely locked
      daysToMilliseconds(2) + BigInt(Date.now()), // tge period
      10n, // the percentage that should be withdrawn at TGE
      daysToMilliseconds(4) // vesting period
    );

    expect(simulator.getLedger().contractSalesInfo.size()).toBe(2n);
    expect(simulator.getLedger().TokenSold).toBe(10000n);
  });
});

describe("Contract test for funding sales", () => {
  it("should allow any users buy from public token sales", () => {
    // should allow anybody participate in the sale as it is public
    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(james);
    // participate in sale one as it is a public sale
    simulator.fundSale(simulator.coin(1000), 1n);
    expect(
      simulator.getLedger().contractSalesInfo.lookup(1n).amountRaised
    ).toBe(1000n);
    // should be 50 - since token price starts at 10 (exchange ratio) and the price is not dynamic (slope = 1n)
    expect(
      simulator.getLedger().contractSalesInfo.lookup(1n).totalTokenSold
    ).toBe(100n);
    expect(
      simulator.getLedger().contractSalesInfo.lookup(1n).participants
    ).toBe(1n);
    // would checks james's private state to validate private state storage action
    // expect should be 1 since james just perform his first sale
    expect(simulator.getPrivateState().saleMetadata.length).toBe(1);
    // expect should be 500 - since that was what james contributed to the sale
    expect(simulator.getPrivateState().saleMetadata[0].contribution).toBe(
      1000n
    );
    // expect should be 50 - since that was what james allocation based on the alloction formula (contribution / ratio)
    expect(simulator.getPrivateState().saleMetadata[0].totalAllocation).toBe(
      100n
    );
  });

  it("should allow users buy from private token sales", () => {
    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(alice);
    // fund private sale
    simulator.fundSale(simulator.coin(1000), 2n);
    expect(
      simulator.getLedger().contractSalesInfo.lookup(2n).amountRaised
    ).toBe(1000n);
    // should be 50 - since token price starts at 10 and the price is not dynamic (slope = 0n)
    expect(
      simulator.getLedger().contractSalesInfo.lookup(2n).totalTokenSold
    ).toBe(100n);

    expect(simulator.getPrivateState().saleMetadata.length).toBe(2);

    // should not allow mary because the public key is not included in the allowed list
    expect(() => {
      simulator.baseContext.currentZswapLocalState.coinPublicKey =
        simulator.coinPubKeyToEncodedPubKey(mary);
      // fund private sale
      simulator.fundSale(simulator.coin(1000), 2n);
    }).throw("You are not eligible for this sale");

    expect(
      simulator.getLedger().contractSalesInfo.lookup(2n).amountRaised
    ).toBe(1000n);
    expect(
      simulator.getLedger().contractSalesInfo.lookup(2n).totalTokenSold
    ).toBe(100n);
  });
});

describe("Contract test for refund", () => {
  it("should allow participant to initiate a refund", () => {
    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(mary);

    // should refund vera 50n of her total contribution.
    simulator.refund(2n, 400n);
    expect(simulator.getPrivateState().saleMetadata[1].contribution).toBe(600n);

    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(james);

    simulator.refund(2n, 250n);
    expect(simulator.getPrivateState().saleMetadata[1].contribution).toBe(350n);

    // simulator.refund(2n, 350n);
    // expect(simulator.getPrivateState().saleMetadata[1]).toBe(undefined);

    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(vera);

    simulator.refund(1n, 150n);
    expect(simulator.getPrivateState().saleMetadata[0].contribution).toBe(850n);
    expect(simulator.getLedger().raisedTokenPool.value).toBe(1200n);
  });
});

// describe("Contract test for claiming tokens", () => {
//   it("should allow participants to their allocated tokens", () => {});
// });

describe("Contract for test claiming contributed tokens by organiser", () => {
  it("should allow organizer to claim tokens", () => {
    // should be 2000 - as total raised for sale with id 1 is 1500 (3500n -2000n)
    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(peter);

    simulator.receiveFundsByOrganizer(2);
    expect(simulator.getLedger().raisedTokenPool.value).toBe(850n);

    expect(() => {
      simulator.baseContext.currentZswapLocalState.coinPublicKey =
        simulator.coinPubKeyToEncodedPubKey(peter);
      simulator.receiveFundsByOrganizer(2);
    }).throw("Funds has been withdrawn from this sale");

    expect(() => {
      simulator.baseContext.currentZswapLocalState.coinPublicKey =
        simulator.coinPubKeyToEncodedPubKey(alice);
      simulator.receiveFundsByOrganizer(1);
    }).throw("You are not the organizer");

    simulator.baseContext.currentZswapLocalState.coinPublicKey =
      simulator.coinPubKeyToEncodedPubKey(peter);
    simulator.receiveFundsByOrganizer(1);
    expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);

    // expect(() => {
    // }).toThrow("You are not the organizer");
    // expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    // // peter is the organiser - he alone should be able to withdraw funds contributed
    // simulator.baseContext.currentZswapLocalState.coinPublicKey =
    //   simulator.coinPubKeyToEncodedPubKey(peter);
    // // should be 2000 - as total raised for sale with id 1 is 1500 (3450n -2000n)
    // expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    // simulator.receiveFundsByOrganizer(1);
    // expect(simulator.getLedger().raisedTokenPool.value).toBe(1950n);
    // // should be 0 - as total raised for sale with id 1 is 1500 (3450n -1950n)
    // simulator.receiveFundsByOrganizer(2);
    // expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    // // should throw an error saying funds has been withdrawn already
    // expect(() => {
    //   expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    //   simulator.receiveFundsByOrganizer(1);
    //   expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    // }).throw(/Funds has been withdrawn from this sale/);
    // expect(() => {
    //   expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    //   simulator.receiveFundsByOrganizer(2);
    //   expect(simulator.getLedger().raisedTokenPool.value).toBe(0n);
    // }).throw(/Funds has been withdrawn from this sale/);
  });
});

/**
 * @BUGS
 * Participant will always remain as 1n since the private is shared and can't be distinct for each user
 * During refund, allocation should be calculated based on previous price at the time it was bought
 * When a user wants to buy again, allocation for the new buy should be calculated seperately and added to the previous allocation in the private state
 */
