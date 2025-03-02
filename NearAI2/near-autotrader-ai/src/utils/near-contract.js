// src/utils/near-contract.js
const { Contract } = require('near-api-js');
const { connectToNEAR } = require('./near-connection');

class NEARContractService {
  constructor(contractId) {
    this.contractId = contractId;
    this.contract = null;
  }

  async initialize(accountId) {
    try {
      console.log(`Initializing NEAR contract: ${this.contractId} for account: ${accountId}`);
      const near = await connectToNEAR();
      const account = await near.account(accountId);
      
      this.contract = new Contract(account, this.contractId, {
        viewMethods: ['getAgentConfig', 'getUserTransactions'],
        changeMethods: ['createAgent', 'executeTransaction', 'updateAgentConfig']
      });
      
      console.log('Contract initialized successfully');
      return this.contract;
    } catch (error) {
      console.error('Error initializing NEAR contract:', error);
      throw error;
    }
  }

  async createAgent(userId, agentType, coin, config) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      
      console.log(`Creating ${agentType} agent for user ${userId} for ${coin}`);
      return await this.contract.createAgent({
        userId,
        agentType,
        coin,
        config: JSON.stringify(config)
      });
    } catch (error) {
      console.error('Error creating agent on NEAR:', error);
      throw error;
    }
  }

  async executeTransaction(userId, agentId, action, amount) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      
      console.log(`Executing ${action} transaction for user ${userId}, agent ${agentId}, amount ${amount}`);
      return await this.contract.executeTransaction({
        userId,
        agentId,
        action,
        amount: amount.toString()
      });
    } catch (error) {
      console.error('Error executing transaction on NEAR:', error);
      throw error;
    }
  }

  async getAgentConfig(userId, agentId) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      
      console.log(`Getting agent config for user ${userId}, agent ${agentId}`);
      const config = await this.contract.getAgentConfig({ userId, agentId });
      return JSON.parse(config);
    } catch (error) {
      console.error('Error getting agent config from NEAR:', error);
      throw error;
    }
  }
}

module.exports = NEARContractService;