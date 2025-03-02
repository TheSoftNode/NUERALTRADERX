const DCAAgent = require('./agents/dca-agent');

async function testDCAAgent() {
  try {
    console.log('Testing DCA Agent...');

    // Create a DCA agent for NEAR
    // $100 investment on a daily basis
    const agent = new DCAAgent('near', 100, 'daily');

    // Initialize the agent
    await agent.initialize();

    // Simulate a few investments with different dates
    console.log('\nSimulating multiple investments...');

    // Today's investment
    await agent.simulateInvestment(new Date());

    // Yesterday's investment
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await agent.simulateInvestment(yesterday);

    // Investment from 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    await agent.simulateInvestment(twoDaysAgo);

    // Get performance summary
    console.log('\nGenerating performance summary...');
    const summary = await agent.getPerformanceSummary();

    // Display summary
    console.log('\nDCA Strategy Performance Summary:');
    console.log('================================');
    console.log(`Coin: ${summary.coin}`);
    console.log(`Total Invested: $${summary.totalInvested.toFixed(2)}`);
    console.log(`Total Coins: ${summary.totalCoins.toFixed(8)} ${summary.coin}`);
    console.log(`Average Buy Price: $${summary.averageBuyPrice.toFixed(2)}`);
    console.log(`Current Price: $${summary.currentPrice.toFixed(2)}`);
    console.log(`Current Portfolio Value: $${summary.currentValue.toFixed(2)}`);
    console.log(`Profit/Loss: $${summary.profitLoss.toFixed(2)} (${summary.profitLossPercentage.toFixed(2)}%)`);
    console.log(`Number of Investments: ${summary.numberOfInvestments}`);
    console.log(`First Investment: ${summary.firstInvestmentDate}`);
    console.log(`Last Investment: ${summary.lastInvestmentDate}`);
    console.log(`Status: ${summary.status}`);

    console.log('\nTest completed successfully.');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

testDCAAgent();