const PricePredictionModel = require('./models/price-prediction');
const marketData = require('./services/market-data');

async function testModel() {
  try {
    console.log('Starting model test...');

    // Create an instance of the model
    const pricePredictionModel = new PricePredictionModel();

    // Train the model
    await pricePredictionModel.trainModel('near', 60);

    // Make a prediction
    const predictedPrice = await pricePredictionModel.predict('near');

    // Get current price for comparison
    const currentPriceData = await marketData.getCurrentPrice(['near']);
    const currentPrice = currentPriceData.near.usd;

    console.log('\nPrediction Summary:');
    console.log('----------------');
    console.log(`Current NEAR Price: $${currentPrice.toFixed(2)}`);
    console.log(`Predicted NEAR Price: $${predictedPrice.toFixed(2)}`);
    console.log(`Difference: $${(predictedPrice - currentPrice).toFixed(2)}`);
    console.log(`Percentage Change: ${((predictedPrice - currentPrice) / currentPrice * 100).toFixed(2)}%`);

    if (predictedPrice > currentPrice) {
      console.log('\nRecommendation: BUY - Price expected to increase');
    } else if (predictedPrice < currentPrice) {
      console.log('\nRecommendation: SELL - Price expected to decrease');
    } else {
      console.log('\nRecommendation: HOLD - No significant price change expected');
    }

    console.log('\nTest completed successfully.');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

testModel();