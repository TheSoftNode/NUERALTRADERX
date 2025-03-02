const express = require('express');
const path = require('path');
const MarketMakingAgent = require('./agents/market-making-agent');
const DCAAgent = require('./agents/dca-agent');
const marketData = require('./services/market-data');
require('dotenv').config();

// Initialize express app
const app = express();
app.use(express.json());

// Store active agents (in memory for now)
const agents = {
  marketMaking: {},
  dca: {}
};

// Middleware for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Serve static files with absolute path
app.use(express.static(path.join(__dirname, '../public')));

// Add a specific route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/test-api.html'));
});

// Route for server health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Market data endpoints
app.get('/api/market/price/:coin', async (req, res) => {
  try {
    const { coin = 'near' } = req.params;
    const { days } = req.query;

    const data = await marketData.getPriceData(coin, 'usd', days || 30);
    res.json(data);
  } catch (error) {
    console.error('Error fetching price data:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/market/current-price/:coin', async (req, res) => {
  try {
    const { coin = 'near' } = req.params;

    const data = await marketData.getCurrentPrice([coin]);
    res.json(data);
  } catch (error) {
    console.error('Error fetching current price:', error);
    res.status(500).json({ error: error.message });
  }
});

// Market Making Agent endpoints
app.post('/api/agents/market-making', async (req, res) => {
  try {
    const { coin = 'near', userId, buyThreshold, sellThreshold } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const agentId = `${userId}_${coin}`;
    const agent = new MarketMakingAgent(
      coin,
      buyThreshold || 0.02,
      sellThreshold || 0.03
    );

    await agent.initialize();
    agents.marketMaking[agentId] = agent;

    res.status(201).json({
      message: 'Market Making Agent created successfully',
      agentId,
      coin,
      buyThreshold: buyThreshold || 0.02,
      sellThreshold: sellThreshold || 0.03
    });
  } catch (error) {
    console.error('Error creating Market Making Agent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/market-making/:agentId/recommendation', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = agents.marketMaking[agentId];

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const recommendation = await agent.getTradeRecommendation();
    res.json(recommendation);
  } catch (error) {
    console.error('Error getting trade recommendation:', error);
    res.status(500).json({ error: error.message });
  }
});

// DCA Agent endpoints
app.post('/api/agents/dca', async (req, res) => {
  try {
    const { coin = 'near', userId, investmentAmount, frequency } = req.body;

    if (!userId || !investmentAmount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const agentId = `${userId}_${coin}`;
    const agent = new DCAAgent(coin, investmentAmount, frequency || 'daily');

    await agent.initialize();
    agents.dca[agentId] = agent;

    res.status(201).json({
      message: 'DCA Agent created successfully',
      agentId,
      coin,
      investmentAmount,
      frequency: frequency || 'daily'
    });
  } catch (error) {
    console.error('Error creating DCA Agent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/dca/:agentId/invest', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = agents.dca[agentId];

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const investment = await agent.simulateInvestment();
    res.json(investment);
  } catch (error) {
    console.error('Error simulating investment:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/dca/:agentId/performance', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = agents.dca[agentId];

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const performance = await agent.getPerformanceSummary();
    res.json(performance);
  } catch (error) {
    console.error('Error getting performance summary:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/dca/:agentId/history', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = agents.dca[agentId];

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const history = agent.getInvestmentHistory();
    res.json(history);
  } catch (error) {
    console.error('Error getting investment history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`NEAR AutoTrader AI backend server running on port ${PORT}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
});