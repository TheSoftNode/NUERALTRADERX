// src/models/price-prediction.js
const tf = require('@tensorflow/tfjs');
const marketData = require('../services/market-data');

class PricePredictionModel {
  constructor() {
    this.model = null;
    this.normParams = null;
  }

  // Prepare data for training
  preprocessData(data) {
    const prices = data.prices.map(item => item[1]);
    
    // Create sequences: use 14 days to predict the next day
    const sequenceLength = 14;
    const xs = [];
    const ys = [];
    
    for (let i = 0; i < prices.length - sequenceLength; i++) {
      const sequence = prices.slice(i, i + sequenceLength);
      const target = prices[i + sequenceLength];
      xs.push(sequence);
      ys.push(target);
    }
    
    // Convert to tensors
    const inputTensor = tf.tensor2d(xs, [xs.length, sequenceLength]);
    const outputTensor = tf.tensor1d(ys);
    
    // Normalize data
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const outputMax = outputTensor.max();
    const outputMin = outputTensor.min();
    
    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedOutputs = outputTensor.sub(outputMin).div(outputMax.sub(outputMin));
    
    return {
      inputs: normalizedInputs,
      outputs: normalizedOutputs,
      inputMax,
      inputMin,
      outputMax,
      outputMin
    };
  }

  // Create and train the model
  async trainModel(coin = 'near', days = 90) {
    try {
      console.log(`Training price prediction model for ${coin} using ${days} days of data...`);
      
      // Fetch historical price data
      const historicalData = await marketData.getPriceData(coin, 'usd', days);
      console.log(`Received ${historicalData.prices.length} data points for training`);
      
      // Preprocess data
      const { inputs, outputs, inputMax, inputMin, outputMax, outputMin } = 
        this.preprocessData(historicalData);
      
      // Build model
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({
        units: 32,
        inputShape: [inputs.shape[1]],
        activation: 'relu'
      }));
      this.model.add(tf.layers.dense({
        units: 16,
        activation: 'relu'
      }));
      this.model.add(tf.layers.dense({
        units: 1
      }));
      
      // Compile model
      this.model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
      });
      
      // Train model
      console.log('Starting model training...');
      const history = await this.model.fit(inputs, outputs, {
        batchSize: 32,
        epochs: 100,
        shuffle: true,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (epoch % 10 === 0) {
              console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(6)}`);
            }
          }
        }
      });
      
      // Save normalization parameters
      this.normParams = {
        inputMax: inputMax.dataSync()[0],
        inputMin: inputMin.dataSync()[0],
        outputMax: outputMax.dataSync()[0],
        outputMin: outputMin.dataSync()[0]
      };
      
      console.log('Model trained successfully!');
      console.log('Final loss:', history.history.loss[history.history.loss.length - 1].toFixed(6));
      
      return this.model;
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }

  // Make price predictions
  async predict(coin = 'near', days = 14) {
    try {
      // Ensure model is trained
      if (!this.model || !this.normParams) {
        console.log('Model not trained yet, training now...');
        await this.trainModel(coin);
      }
      
      // Get recent price data for prediction
      console.log(`Fetching recent price data for ${coin} (${days} days) for prediction...`);
      const recentData = await marketData.getPriceData(coin, 'usd', days);
      const prices = recentData.prices.map(item => item[1]);
      
      // Prepare input sequence (use the most recent 14 days)
      const sequence = prices.slice(prices.length - 14);
      console.log('Using sequence of recent prices:', sequence);
      
      // Create and normalize tensor
      const inputTensor = tf.tensor2d([sequence], [1, sequence.length]);
      const normalizedInput = inputTensor
        .sub(this.normParams.inputMin)
        .div(this.normParams.inputMax - this.normParams.inputMin);
      
      // Make prediction
      console.log('Making prediction...');
      const normalizedPrediction = this.model.predict(normalizedInput);
      
      // Denormalize
      const prediction = normalizedPrediction
        .mul(this.normParams.outputMax - this.normParams.outputMin)
        .add(this.normParams.outputMin);
      
      const predictedPrice = prediction.dataSync()[0];
      console.log(`Predicted price: $${predictedPrice.toFixed(2)}`);
      
      return predictedPrice;
    } catch (error) {
      console.error('Error making prediction:', error);
      throw error;
    }
  }
}

module.exports = PricePredictionModel;