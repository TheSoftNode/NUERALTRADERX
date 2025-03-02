// src/wallets/near.ts
import { createContext } from 'react';

// near api js
import { providers, utils } from 'near-api-js';

// wallet selector
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';

// ethereum wallets
import { wagmiConfig, web3Modal } from './web3modal';
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

export type WalletOptions = {
    networkId?: string;
    createAccessKeyFor?: string;
};

export type ViewMethodParams = {
    contractId: string;
    method: string;
    args?: Record<string, any>;
};

export type CallMethodParams = ViewMethodParams & {
    gas?: string;
    deposit?: string;
};

export type TransactionParams = {
    transactions: any[];
};

export class Wallet {
    private selector: any;
    private networkId: string;
    private createAccessKeyFor?: string;

    /**
     * @constructor
     * @param {Object} options - the options for the wallet
     * @param {string} options.networkId - the network id to connect to
     * @param {string} options.createAccessKeyFor - the contract to create an access key for
     * @example
     * const wallet = new Wallet({ networkId: 'testnet', createAccessKeyFor: 'contractId' });
     * wallet.startUp((signedAccountId) => console.log(signedAccountId));
     */
    constructor({ networkId = 'testnet', createAccessKeyFor = undefined }: WalletOptions) {
        this.createAccessKeyFor = createAccessKeyFor;
        this.networkId = networkId;
    }

    /**
     * To be called when the website loads
     * @param {Function} accountChangeHook - a function that is called when the user signs in or out#
     * @returns {Promise<string>} - the accountId of the signed-in user 
     */
    startUp = async (accountChangeHook: (accountId: string) => void): Promise<string> => {
        this.selector = setupWalletSelector({
            network: this.networkId as any,
            modules: [
                setupMyNearWallet(),
                setupHereWallet() as any,
                setupLedger(),
                setupMeteorWallet(),
                setupSender(),
                setupBitteWallet(),
                setupEthereumWallets({ wagmiConfig: wagmiConfig as any, web3Modal: web3Modal as any, alwaysOnboardDuringSignIn: true }),
            ],
        });

        const walletSelector = await this.selector;
        const isSignedIn = walletSelector.isSignedIn();
        const accountId = isSignedIn ? walletSelector.store.getState().accounts[0].accountId : '';

        walletSelector.store.observable.subscribe(async (state: any) => {
            const signedAccount = state?.accounts.find((account: any) => account.active)?.accountId;
            accountChangeHook(signedAccount || '');
        });

        return accountId;
    };

    /**
     * Displays a modal to login the user
     */
    signIn = async (): Promise<void> => {
        const modal = setupModal(await this.selector, { contractId: this.createAccessKeyFor as any });
        modal.show();
    };

    /**
     * Logout the user
     */
    signOut = async (): Promise<void> => {
        const selectedWallet = await (await this.selector).wallet();
        selectedWallet.signOut();
    };

    /**
     * Makes a read-only call to a contract
     * @param {Object} options - the options for the call
     * @param {string} options.contractId - the contract's account id
     * @param {string} options.method - the method to call
     * @param {Object} options.args - the arguments to pass to the method
     * @returns {Promise<any>} - the result of the method call
     */
    viewMethod = async ({ contractId, method, args = {} }: ViewMethodParams): Promise<any> => {
        const url = `https://rpc.${this.networkId}.near.org`;
        const provider = new providers.JsonRpcProvider({ url });

        const res = await provider.query({
            request_type: 'call_function',
            account_id: contractId,
            method_name: method,
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
            finality: 'optimistic',
        }) as any;

        return JSON.parse(Buffer.from(res.result).toString());

    };

    /**
     * Makes a call to a contract
     * @param {Object} options - the options for the call
     * @param {string} options.contractId - the contract's account id
     * @param {string} options.method - the method to call
     * @param {Object} options.args - the arguments to pass to the method
     * @param {string} options.gas - the amount of gas to use
     * @param {string} options.deposit - the amount of yoctoNEAR to deposit
     * @returns {Promise<any>} - the resulting transaction
     */
    callMethod = async ({
        contractId,
        method,
        args = {},
        gas = THIRTY_TGAS,
        deposit = NO_DEPOSIT
    }: CallMethodParams): Promise<any> => {
        // Sign a transaction with the "FunctionCall" action
        const selectedWallet = await (await this.selector).wallet();
        const outcome = await selectedWallet.signAndSendTransaction({
            receiverId: contractId,
            actions: [
                {
                    type: 'FunctionCall',
                    params: {
                        methodName: method,
                        args,
                        gas,
                        deposit,
                    },
                },
            ],
        });

        return providers.getTransactionLastResult(outcome);
    };

    /**
     * Makes a call to a contract
     * @param {string} txhash - the transaction hash
     * @returns {Promise<any>} - the result of the transaction
     */
    getTransactionResult = async (txhash: string): Promise<any> => {
        const walletSelector = await this.selector;
        const { network } = walletSelector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

        // Retrieve transaction result from the network
        const transaction = await provider.txStatus(txhash, 'unnused');
        return providers.getTransactionLastResult(transaction);
    };

    /**
     * Gets the balance of an account
     * @param {string} accountId - the account id to get the balance of
     * @returns {Promise<number>} - the balance of the account
     *  
     */
    getBalance = async (accountId: string): Promise<number> => {
        const walletSelector = await this.selector;
        const { network } = walletSelector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

        // Retrieve account state from the network
        const account = await provider.query({
            request_type: 'view_account',
            account_id: accountId,
            finality: 'final',
        }) as any;
        // return amount on NEAR
        return account.amount ? Number(utils.format.formatNearAmount(account.amount)) : 0;
    };

    /**
     * Signs and sends transactions
     * @param {Object[]} transactions - the transactions to sign and send
     * @returns {Promise<any[]>} - the resulting transactions
     * 
     */
    signAndSendTransactions = async ({ transactions }: TransactionParams): Promise<any[]> => {
        const selectedWallet = await (await this.selector).wallet();
        return selectedWallet.signAndSendTransactions({ transactions });
    };

    /**
     * 
     * @param {string} accountId
     * @returns {Promise<any[]>} - the access keys for the account
     */
    getAccessKeys = async (accountId: string): Promise<any[]> => {
        const walletSelector = await this.selector;
        const { network } = walletSelector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

        // Retrieve account state from the network
        const keys = await provider.query({
            request_type: 'view_access_key_list',
            account_id: accountId,
            finality: 'final',
        }) as any;
        return keys.keys;
    };
}

/**
 * @typedef NearContext
 * @property {Wallet} wallet - Current wallet
 * @property {string} signedAccountId - The AccountId of the signed user
 */
export interface NearContextType {
    wallet: Wallet | undefined;
    signedAccountId: string;
    nearBalance: number | null;
}

export const NearContext = createContext<NearContextType>({
    wallet: undefined,
    signedAccountId: '',
    nearBalance: null,
});