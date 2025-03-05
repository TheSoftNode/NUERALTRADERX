# Neural-TRADEX Trading Platform
Neural-TRADEX is an AI automated trading platform that leverages artificial intelligence to analyze cryptocurrency markets and execute trading strategies on the NEAR blockchain. The platform offers two primary trading strategies:

Market Making Agent - Uses AI price predictions to buy low and sell high
Dollar-Cost Averaging (DCA) Agent - Automates regular investments at set intervals


## Market Making Agent

The Market Making Agent is one of Neural-TRADEX's core AI-powered trading strategies that leverages advanced TensorFlow.js models to execute profitable trades on the NEAR blockchain.

### How the Market Making Agent Works

The Market Making Agent employs a sophisticated price prediction model to identify potential market inefficiencies and execute buy/sell orders accordingly. Here's how it functions:

1. **Price Prediction**: The agent continuously analyzes market data using TensorFlow.js models trained on historical cryptocurrency price patterns. It identifies potential short-term price movements by examining factors like:
   - Recent price action and volatility
   - Trading volume patterns
   - Market sentiment indicators
   - Technical analysis signals (moving averages, RSI, MACD)

2. **Spread Management**: The agent places strategic buy and sell orders to profit from the spread between bid and ask prices. When the AI predicts a price is likely to rise, it places buy orders slightly below market price. When it predicts a decline, it places sell orders slightly above market price.

3. **Risk Management**: The agent includes built-in risk controls including:
   - Position size limits based on account balance
   - Stop-loss thresholds to limit downside exposure
   - Profit-taking parameters to lock in gains
   - Volatility adjustments to reduce activity during unstable markets

4. **Parameter Customization**: Users can configure:
   - Risk tolerance (1-10 scale)
   - Trading pair selection
   - Budget allocation
   - Rebalancing frequency
   - Minimum profit thresholds

### Market Making Agent API Integration

The platform provides several API endpoints to interact with the Market Making Agent:

```javascript
// Example: Creating a new Market Making Agent
const response = await fetch('/api/agents/market-making', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    coinPair: 'NEAR/USDT',
    budget: 1000,
    riskLevel: 5,
    minSpread: 0.005
  })
});

// Example: Getting a trading recommendation
const recommendation = await fetch(
  `/api/agents/market-making/${agentId}/recommendation`
);
```

## Dollar-Cost Averaging (DCA) Agent

The DCA Agent provides a more conservative, long-term investment approach by automating regular cryptocurrency purchases regardless of market conditions.

### How the DCA Agent Works

The DCA strategy is designed to reduce the impact of volatility on cryptocurrency investments:

1. **Scheduled Investments**: The agent executes regular purchases at predetermined intervals (daily, weekly, monthly) with a fixed investment amount. This approach ensures buying occurs at various price points throughout market cycles.

2. **AI Enhancements**: Unlike traditional DCA strategies, Neural-TRADEX's DCA Agent incorporates AI insights to optimize execution:
   - Intraday timing optimization (finding the best time within the scheduled day to execute)
   - Slight adjustments to investment amounts based on extreme market conditions
   - Detection of unusual market events that might warrant pausing temporarily

3. **Performance Tracking**: The agent maintains detailed records of all purchases, average cost basis, current value, and return metrics to help users understand their investment performance.

4. **Configuration Options**: Users can customize:
   - Investment amount per period
   - Investment frequency (hourly, daily, weekly, monthly)
   - Target cryptocurrency or basket of cryptocurrencies
   - Optional maximum price thresholds



## Comparing the Agents

| Feature | Market Making Agent | DCA Agent |
|---------|---------------------|-----------|
| **Strategy Type** | Active, short-term trading | Passive, long-term investing |
| **AI Utilization** | High (price prediction, pattern recognition) | Medium (timing optimization) |
| **Risk Level** | Moderate to high (configurable) | Lower (long-term focused) |
| **Time Commitment** | Low (automated, but requires occasional review) | Very low (fully automated) |
| **Optimal For** | Experienced traders, volatile markets | Beginners, long-term investors |
| **Profit Source** | Price movements, market inefficiencies | Asset appreciation over time |
| **NEAR Integration** | On-chain execution of multiple trades | Simple scheduled purchases |



Both agents leverage the NEAR blockchain for secure, transparent execution of trades, with all transactions being recorded on-chain for verification and audit purposes.



A [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
