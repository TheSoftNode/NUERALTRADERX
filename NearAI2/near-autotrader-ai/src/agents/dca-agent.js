// src/agents/dca-agent.js
const marketData = require('../services/market-data');

class DCAAgent {
  constructor(coin = 'near', investmentAmount, frequency = 'daily') {
    this.coin = coin;
    this.investmentAmount = investmentAmount;
    this.frequency = frequency;
    this.history = [];
  }

  async initialize() {
    console.log(`Initializing DCA Agent for ${this.coin}...`);
    console.log(`Investment amount: $${this.investmentAmount}, Frequency: ${this.frequency}`);
    console.log(`DCA Agent initialized for ${this.coin}`);
    
    return {
      coin: this.coin,
      investmentAmount: this.investmentAmount,
      frequency: this.frequency,
      status: 'active'
    };
  }

  async simulateInvestment(date = new Date()) {
    try {
      console.log(`Simulating ${this.frequency} investment of $${this.investmentAmount} in ${this.coin}...`);
      
      // Get current price
      const priceData = await marketData.getCurrentPrice([this.coin]);
      const currentPrice = priceData[this.coin].usd;
      console.log(`Current ${this.coin} price: $${currentPrice.toFixed(2)}`);
      
      // Calculate amount of coin purchased
      const coinAmount = this.investmentAmount / currentPrice;
      console.log(`Amount purchased: ${coinAmount.toFixed(8)} ${this.coin}`);
      
      // Record the investment
      const investment = {
        date: date.toISOString(),
        coin: this.coin,
        fiatAmount: this.investmentAmount,
        coinPrice: currentPrice,
        coinAmount,
        timestamp: Date.now()
      };
      
      this.history.push(investment);
      console.log(`Investment recorded. Total investments: ${this.history.length}`);
      
      return investment;
    } catch (error) {
      console.error('Error simulating investment:', error);
      throw error;
    }
  }

  async getPerformanceSummary() {
    try {
      console.log(`Generating performance summary for ${this.coin} DCA strategy...`);
      
      if (this.history.length === 0) {
        console.log('No investment history found.');
        return {
          coin: this.coin,
          totalInvested: 0,
          totalCoins: 0,
          averageBuyPrice: 0,
          currentValue: 0,
          profitLoss: 0,
          profitLossPercentage: 0,
          status: 'No investments'
        };
      }
      
      // Get current price
      const priceData = await marketData.getCurrentPrice([this.coin]);
      const currentPrice = priceData[this.coin].usd;
      console.log(`Current ${this.coin} price: $${currentPrice.toFixed(2)}`);
      
      // Calculate performance metrics
      const totalInvested = this.history.reduce((sum, item) => sum + item.fiatAmount, 0);
      const totalCoins = this.history.reduce((sum, item) => sum + item.coinAmount, 0);
      const averageBuyPrice = totalInvested / totalCoins;
      const currentValue = totalCoins * currentPrice;
      const profitLoss = currentValue - totalInvested;
      const profitLossPercentage = (profitLoss / totalInvested) * 100;
      
      console.log(`Total invested: $${totalInvested.toFixed(2)}`);
      console.log(`Total ${this.coin}: ${totalCoins.toFixed(8)}`);
      console.log(`Average buy price: $${averageBuyPrice.toFixed(2)}`);
      console.log(`Current value: $${currentValue.toFixed(2)}`);
      console.log(`Profit/Loss: $${profitLoss.toFixed(2)} (${profitLossPercentage.toFixed(2)}%)`);
      
      return {
        coin: this.coin,
        totalInvested,
        totalCoins,
        averageBuyPrice,
        currentPrice,
        currentValue,
        profitLoss,
        profitLossPercentage,
        numberOfInvestments: this.history.length,
        firstInvestmentDate: this.history[0].date,
        lastInvestmentDate: this.history[this.history.length - 1].date,
        status: profitLoss >= 0 ? 'Profitable' : 'Loss'
      };
    } catch (error) {
      console.error('Error calculating performance summary:', error);
      throw error;
    }
  }
  
  getInvestmentHistory() {
    return this.history;
  }
}

module.exports = DCAAgent;