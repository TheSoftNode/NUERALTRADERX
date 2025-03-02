'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { NearContext, Wallet } from './near';
import { AutoTraderContract, NetworkId } from './config';

interface NearProviderProps {
    children: ReactNode;
}

export function NearProvider({ children }: NearProviderProps) {
    const [signedAccountId, setSignedAccountId] = useState<string>('');
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
    const [nearBalance, setNearBalance] = useState<number | null>(null);

    useEffect(() => {
        const walletInstance = new Wallet({
            networkId: NetworkId,
            createAccessKeyFor: AutoTraderContract
        });

        setWallet(walletInstance);

        const initialize = async () => {
            await walletInstance.startUp(setSignedAccountId);
        };

        initialize();
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            if (wallet && signedAccountId) {
                try {
                    const balance = await wallet.getBalance(signedAccountId);
                    setNearBalance(balance);
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                    setNearBalance(null);
                }
            } else {
                setNearBalance(null);
            }
        };

        fetchBalance();
    }, [wallet, signedAccountId]);

    return (
        <NearContext.Provider value={{ wallet, signedAccountId, nearBalance }}>
            {children}
        </NearContext.Provider>
    );
}