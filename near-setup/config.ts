export const NetworkId = 'testnet';

export const contractPerNetwork = {
    mainnet: 'hello.near-examples.near',
    testnet: 'hello.near-examples.testnet',
};

export const AutoTraderContract = contractPerNetwork[NetworkId as keyof typeof contractPerNetwork];

// Chains for EVM Wallets 
export const evmWalletChains = {
    mainnet: {
        chainId: 397,
        name: "Near Mainnet",
        explorer: "https://eth-explorer.near.org",
        rpc: "https://eth-rpc.mainnet.near.org",
    },
    testnet: {
        chainId: 398,
        name: "Near Testnet",
        explorer: "https://eth-explorer-testnet.near.org",
        rpc: "https://eth-rpc.testnet.near.org",
    },
};

export const EVMWalletChain = evmWalletChains[NetworkId as keyof typeof evmWalletChains];