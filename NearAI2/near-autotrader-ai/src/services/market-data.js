const axios = require('axios');

class MarketDataService {
  constructor() {
    this.baseUrl = 'https://api.coingecko.com/api/v3';
    console.log('MarketDataService initialized with base URL:', this.baseUrl);
  }

  async getPriceData(coin = 'near', currency = 'usd', days = 30) {
    try {
      console.log(`Attempting to fetch price data for ${coin} in ${currency} for ${days} days...`);
      const url = `${this.baseUrl}/coins/${coin}/market_chart`;
      console.log('Request URL:', url);

      const response = await axios.get(url, {
        params: {
          vs_currency: currency,
          days: days
        }
      });

      console.log('Response received with status:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error fetching price data:');
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      throw error;
    }
  }

  async getCurrentPrice(coins = ['near'], currency = 'usd') {
    try {
      console.log(`Attempting to fetch current price for [${coins.join(', ')}] in ${currency}...`);
      const url = `${this.baseUrl}/simple/price`;
      console.log('Request URL:', url);

      const response = await axios.get(url, {
        params: {
          ids: coins.join(','),
          vs_currencies: currency
        }
      });

      console.log('Response received with status:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error fetching current price:');
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      throw error;
    }
  }
}

module.exports = new MarketDataService();