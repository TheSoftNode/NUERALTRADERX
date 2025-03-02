'use client';

import { useContext, useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Loader2,
    ChevronDown,
    LogOut,
    Wallet,
    User,
    ExternalLink,
    Copy
} from 'lucide-react';
import { NearContext } from './near';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletButtonProps {
    className?: string;
}

export default function WalletButton({ className = '' }: WalletButtonProps) {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure hydration matching
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatAccountId = (accountId: string): string => {
        if (!accountId) return '';
        if (accountId.length <= 12) return accountId;
        return `${accountId.slice(0, 6)}...${accountId.slice(-6)}`;
    };

    const handleConnect = async () => {
        if (!wallet) return;

        setIsLoading(true);
        try {
            await wallet.signIn();
        } catch (error) {
            console.error('Wallet connection failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (!wallet) return;

        setIsLoading(true);
        setIsDropdownOpen(false);
        try {
            await wallet.signOut();
        } catch (error) {
            console.error('Wallet disconnection failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!signedAccountId) return;

        try {
            await navigator.clipboard.writeText(signedAccountId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const viewInExplorer = () => {
        if (!signedAccountId) return;

        const networkId = 'testnet'; // or dynamically get from wallet config
        const explorerUrl = `https://explorer.${networkId}.near.org/accounts/${signedAccountId}`;
        window.open(explorerUrl, '_blank', 'noopener,noreferrer');
        setIsDropdownOpen(false);
    };

    // Button gradient background based on connection state
    const getButtonClasses = () => {
        if (!mounted) return '';

        const baseClasses = "relative font-medium flex items-center justify-center transition-all duration-200";

        if (signedAccountId) {
            return `${baseClasses} ${className} bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-600 hover:to-cyan-700 text-white`;
        } else {
            return `${baseClasses} ${className} bg-purple-600 hover:bg-purple-700 text-white`;
        }
    };

    if (!mounted) {
        return null;
    }

    // Connected wallet dropdown
    if (signedAccountId) {
        return (
            <div className="relative" ref={dropdownRef}>
                <Button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isLoading}
                    className={`${getButtonClasses()} px-4 py-2 h-10`}
                    aria-expanded={isDropdownOpen}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <Wallet className="mr-2 h-4 w-4" />
                            <span className="mr-1">{formatAccountId(signedAccountId)}</span>
                            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </>
                    )}
                </Button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute right-0 mt-2 w-72 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-50"
                        >
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full">
                                        <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Connected as</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {signedAccountId}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-2">
                                <button
                                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                                    onClick={copyToClipboard}
                                >
                                    <Copy className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                    {isCopied ? 'Copied!' : 'Copy Address'}
                                </button>

                                <button
                                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                                    onClick={viewInExplorer}
                                >
                                    <ExternalLink className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                    View in Explorer
                                </button>

                                <button
                                    className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                                    onClick={handleDisconnect}
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Disconnect Wallet
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Not connected - simple connect button
    return (
        <Button
            onClick={handleConnect}
            disabled={!wallet || isLoading}
            className={`${getButtonClasses()} px-4 py-2 h-10`}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Connecting...</span>
                </>
            ) : (
                <>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Connect Wallet</span>
                </>
            )}
        </Button>
    );
}