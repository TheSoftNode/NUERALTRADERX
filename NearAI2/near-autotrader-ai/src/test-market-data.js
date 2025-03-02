const marketData = require('./services/market-data');

async function testMarketData() {
  try {
    console.log('Starting market data test...');

    // Test getting current price
    console.log('\nFetching current price for NEAR...');
    const currentPrice = await marketData.getCurrentPrice(['near']);
    console.log('Current NEAR price:', currentPrice);

    // Test getting historical data
    console.log('\nFetching 7-day historical data for NEAR...');
    const historicalData = await marketData.getPriceData('near', 'usd', 7);
    console.log('Number of price points:', historicalData.prices?.length || 'not available');
    if (historicalData.prices && historicalData.prices.length > 0) {
      console.log('Sample price point:', historicalData.prices[0]);
    }
  } catch (error) {
    console.error('Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    console.log('\nTest completed.');
  }
}

console.log('About to run market data test...');
testMarketData();