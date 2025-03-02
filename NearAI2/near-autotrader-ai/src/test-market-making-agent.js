const MarketMakingAgent = require('./agents/market-making-agent');

async function testMarketMakingAgent() {
  try {
    console.log('Testing Market Making Agent...');

    // Create an agent for NEAR with custom thresholds
    // Buy if expected to drop by 0.5%, sell if expected to rise by 1%
    const agent = new MarketMakingAgent('near', 0.005, 0.01);

    // Initialize the agent (trains the model)
    await agent.initialize();

    // Get trading recommendation
    console.log('\nGenerating trading recommendation...');
    const recommendation = await agent.getTradeRecommendation();

    // Display recommendation
    console.log('\nTrading Recommendation Summary:');
    console.log('==============================');
    console.log(`Action: ${recommendation.action}`);
    console.log(`Coin: ${recommendation.coin}`);
    console.log(`Current Price: $${recommendation.currentPrice.toFixed(2)}`);
    console.log(`Predicted Price: $${recommendation.predictedPrice.toFixed(2)}`);
    console.log(`Expected Change: ${(recommendation.priceChangePercentage * 100).toFixed(2)}%`);
    if (recommendation.confidence) {
      console.log(`Confidence: ${recommendation.confidence.toFixed(2)}%`);
    }
    console.log(`Timestamp: ${recommendation.timestamp}`);

    console.log('\nTest completed successfully.');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

testMarketMakingAgent();