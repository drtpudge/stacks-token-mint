import { Cl } from "@stacks/transactions";
import { describe, it, expect, beforeEach } from "vitest";

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;

// Helper to mint tokens to a user
function mintTokens(recipient: string, amount: number) {
  return simnet.callPublicFn(
    "dummy-token", // replace with your contract name
    "mint",
    [Cl.principal(recipient), Cl.uint(amount)],
    alice
  );
}

// Helper to get a user's balance
function getBalance(user: string) {
  return simnet.callReadOnlyFn(
    "dummy-token",
    "get-balance",
    [Cl.principal(user)],
    user
  );
}

// Helper to get total supply
function getTotalSupply() {
  return simnet.callReadOnlyFn(
    "dummy-token",
    "get-total-supply",
    [],
    alice
  );
}

describe("Dummy Token Contract Tests", () => {
  beforeEach(() => {
    // Reset simnet state if needed
  });

  it("should mint tokens correctly", () => {
    const { result } = mintTokens(alice, 1000);
    expect(result).toBeOk(true);

    const balance = getBalance(alice);
    expect(balance).toBe(Cl.uint(1000));

    const totalSupply = getTotalSupply();
    expect(totalSupply).toBe(Cl.uint(1000));
  });

  it("should allow multiple mints and update balances", () => {
    mintTokens(alice, 500);
    mintTokens(bob, 200);

    const aliceBalance = getBalance(alice);
    const bobBalance = getBalance(bob);
    const totalSupply = getTotalSupply();

    expect(aliceBalance).toBe(Cl.uint(500));
    expect(bobBalance).toBe(Cl.uint(200));
    expect(totalSupply).toBe(Cl.uint(700));
  });

  it("dummy functions should return expected default values", () => {
    for (let i = 1; i <= 3; i++) {
      const func = simnet.callPublicFn("dummy-token", `dummy-func-${i}`, [], alice);
      expect(func.result).toBeOk(Cl.uint(0));
    }

    for (let i = 1; i <= 2; i++) {
      const read = simnet.callReadOnlyFn("dummy-token", `dummy-read-${i}`, [], alice);
      expect(read).toBe(Cl.uint(0));
    }
  });
});
