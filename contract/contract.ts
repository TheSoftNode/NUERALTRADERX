import { NearBindgen, near, LookupMap } from "near-sdk-js";

@NearBindgen({})
class NeuralTradeX {
  strategies: LookupMap<string>;
  balances: LookupMap<string>;
  tradeHistory: LookupMap<string>;
  tradeIndex: LookupMap<string>;

  constructor() {
    this.strategies = new LookupMap("strategies");
    this.balances = new LookupMap("balances");
    this.tradeHistory = new LookupMap("tradeHistory");
    this.tradeIndex = new LookupMap("tradeIndex");
  }

  saveStrategy({ user, strategy }: { user: string; strategy: string }): string {
    this.strategies.set(user, strategy);
    return "Strategy saved successfully";
  }

  getStrategy({ user }: { user: string }): string | null {
    return this.strategies.get(user) || null;
  }

  deposit(): string {
    const user = near.predecessorAccountId();
    const amount = near.attachedDeposit().toString();

    let currentBalance = this.balances.get(user) || "0";
    const newBalance = (BigInt(currentBalance) + BigInt(amount)).toString();
    this.balances.set(user, newBalance);

    return newBalance;
  }

  getBalance({ user }: { user: string }): string {
    return this.balances.get(user) || "0";
  }

  executeTrade({
    user,
    tradeAction,
    amount,
  }: {
    user: string;
    tradeAction: string;
    amount: string;
  }): string {
    let balance = this.balances.get(user) || "0";

    if (BigInt(balance) < BigInt(amount)) {
      return "Insufficient balance!";
    }

    // Deduct balance
    const newBalance = (BigInt(balance) - BigInt(amount)).toString();
    this.balances.set(user, newBalance);

    // Store Trade History
    const timestamp = near.blockTimestamp().toString();
    const trade = `${tradeAction}, ${amount}, ${timestamp}`;
    let index = this.tradeIndex.get(user) || "0";

    this.tradeHistory.set(`${user}_${index}`, trade);
    this.tradeIndex.set(user, (BigInt(index) + BigInt(1)).toString());

    return `Trade executed: ${tradeAction} with ${amount} yoctoNEAR`;
  }

  getTradeHistory({ user }: { user: string }): string[] {
    let index = this.tradeIndex.get(user) || "0";
    let trades = [];

    for (let i = 0; i < Number(index); i++) {
      const trade = this.tradeHistory.get(`${user}_${i}`);
      if (trade) {
        trades.push(trade);
      }
    }

    return trades;
  }
}
export { NeuralTradeX };
