// src/agents/market-making-agent.js
const PricePredictionModel = require('../models/price-prediction');
const marketData = require('../services/market-data');

class MarketMakingAgent {
  constructor(coin = 'near', buyThresholdPercentage = 0.02, sellThresholdPercentage = 0.03) {
    this.coin = coin;
    this.buyThresholdPercentage = buyThresholdPercentage;
    this.sellThresholdPercentage = sellThresholdPercentage;
    this.lastPrediction = null;
    this.predictionModel = new PricePredictionModel();
  }

  async initialize() {
    // Train the model when agent is initialized
    console.log(`Initializing Market Making Agent for ${this.coin}...`);
    console.log(`Buy threshold: ${this.buyThresholdPercentage * 100}%, Sell threshold: ${this.sellThresholdPercentage * 100}%`);
    
    await this.predictionModel.trainModel(this.coin);
    console.log(`Market Making Agent initialized for ${this.coin}`);
  }

  async getTradeRecommendation() {
    try {
      console.log(`Generating trade recommendation for ${this.coin}...`);
      
      // Get current price
      const priceData = await marketData.getCurrentPrice([this.coin]);
      const currentPrice = priceData[this.coin].usd;
      console.log(`Current ${this.coin} price: $${currentPrice.toFixed(2)}`);
      
      // Predict future price
      const predictedPrice = await this.predictionModel.predict(this.coin);
      this.lastPrediction = predictedPrice;
      console.log(`Predicted ${this.coin} price: $${predictedPrice.toFixed(2)}`);
      
      // Calculate price change percentage
      const priceChangePercentage = (predictedPrice - currentPrice) / currentPrice;
      console.log(`Predicted price change: ${(priceChangePercentage * 100).toFixed(2)}%`);
      
      // Generate trading signals
      let action, confidence;
      
      if (priceChangePercentage >= this.sellThresholdPercentage) {
        // Price expected to rise by sell threshold or more - Sell signal
        action = 'SELL';
        confidence = Math.abs(priceChangePercentage) * 100;
        console.log(`SELL signal generated with ${confidence.toFixed(2)}% confidence`);
      } else if (priceChangePercentage <= -this.buyThresholdPercentage) {
        // Price expected to drop by buy threshold or more - Buy signal
        action = 'BUY';
        confidence = Math.abs(priceChangePercentage) * 100;
        console.log(`BUY signal generated with ${confidence.toFixed(2)}% confidence`);
      } else {
        // No significant price movement expected - Hold
        action = 'HOLD';
        confidence = 0;
        console.log('HOLD signal generated - no significant price movement expected');
      }
      
      return {
        action,
        coin: this.coin,
        currentPrice,
        predictedPrice,
        priceChangePercentage,
        confidence,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating trade recommendation:', error);
      throw error;
    }
  }
}

module.exports = MarketMakingAgent;