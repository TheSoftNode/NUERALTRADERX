# NEURAL-TRADEX

A decentralized trading platform built on the NEAR blockchain with AI-powered trading strategies.

## Overview

Neural-TRADEX is an AI automated trading platform that leverages artificial intelligence to analyze cryptocurrency markets and execute trading strategies on the NEAR blockchain. The platform offers two primary trading strategies:

1. **Market Making Agent** - Uses AI price predictions to buy low and sell high
2. **Dollar-Cost Averaging (DCA) Agent** - Automates regular investments at set intervals

## Features

- AI price prediction models using TensorFlow.js
- Real-time market data via CoinGecko API
- Automated trading strategy execution
- NEAR blockchain integration
- RESTful API for frontend integration
- Interactive testing interface

## Architecture

The system consists of several key components:

- **Market Data Service** - Fetches cryptocurrency prices and historical data
- **AI Models** - Makes price predictions using machine learning
- **Trading Agents** - Implements trading strategies based on market data and AI predictions
- **NEAR Integration** - Connects with the NEAR blockchain for on-chain transactions
- **API Layer** - Exposes functionality to the frontend via REST endpoints

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/near-autotrader.git
cd near-autotrader

# Install dependencies
npm init -y
npm install near-cli -g
npm install axios express dotenv
npm install @tensorflow/tfjs
npm install near-api-js@1.1.0
npm install @tensorflow/tfjs-node
```

## Configuration

Create a `.env` file in the root directory with the following settings:

```
NEAR_NETWORK=testnet
CONTRACT_NAME=your-contract-name.testnet
PORT=3001
```

## Running the Application

```bash
# Start the server
node src/index.js

# Test the market data service
node src/test-market-data.js

# Test the AI prediction model
node src/test-model.js

# Test the Market Making Agent
node src/test-market-making-agent.js

# Test the DCA Agent
node src/test-dca-agent.js
```

After starting the server, visit `http://localhost:3001/` to access the test interface.

## API Endpoints

### Market Data
- `GET /api/market/price/:coin` - Get historical price data
- `GET /api/market/current-price/:coin` - Get current price

### Market Making Agent
- `POST /api/agents/market-making` - Create a Market Making Agent
- `GET /api/agents/market-making/:agentId/recommendation` - Get trading recommendation

### DCA Agent
- `POST /api/agents/dca` - Create a DCA Agent
- `POST /api/agents/dca/:agentId/invest` - Simulate investment
- `GET /api/agents/dca/:agentId/performance` - Get performance summary
- `GET /api/agents/dca/:agentId/history` - Get investment history

## Smart Contract Integration

For complete functionality, deploy a NEAR smart contract that implements the following methods:

### View Methods
- `getAgentConfig` - Get agent configuration
- `getUserTransactions` - Get transaction history

### Change Methods
- `createAgent` - Create a new trading agent
- `executeTransaction` - Execute a trade
- `updateAgentConfig` - Update agent parameters

## License

[MIT License](LICENSE)

## Acknowledgements

- NEAR Protocol
- TensorFlow.js
- CoinGecko API