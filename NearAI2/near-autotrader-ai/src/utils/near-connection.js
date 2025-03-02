// src/utils/near-connection.js
const { connect, keyStores, WalletConnection } = require('near-api-js');
require('dotenv').config();

const connectToNEAR = async () => {
  const config = {
    networkId: process.env.NEAR_NETWORK || 'testnet',
    keyStore: new keyStores.InMemoryKeyStore(),
    nodeUrl: `https://rpc.${process.env.NEAR_NETWORK || 'testnet'}.near.org`,
    walletUrl: `https://wallet.${process.env.NEAR_NETWORK || 'testnet'}.near.org`,
    helperUrl: `https://helper.${process.env.NEAR_NETWORK || 'testnet'}.near.org`,
    explorerUrl: `https://explorer.${process.env.NEAR_NETWORK || 'testnet'}.near.org`,
  };

  const near = await connect(config);
  return near;
};

module.exports = { connectToNEAR };