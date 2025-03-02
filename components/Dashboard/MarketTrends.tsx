"use client";

import { useState } from 'react';
import {
    ArrowUp,
    ArrowDown,
    ChevronRight,
    RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarketAsset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    high24h: number;
    low24h: number;
}

// Mock market data
const marketData: MarketAsset[] = [
    {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 65432.21,
        change24h: 3.25,
        volume24h: 28435124567,
        marketCap: 1256478965412,
        high24h: 67890.45,
        low24h: 63210.98,
    },
    {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3456.78,
        change24h: -1.8,
        volume24h: 15467892345,
        marketCap: 415678923456,
        high24h: 3567.89,
        low24h: 3345.67,
    },
    {
        id: 'near',
        name: 'NEAR Protocol',
        symbol: 'NEAR',
        price: 5.24,
        change24h: 7.5,
        volume24h: 512345678,
        marketCap: 5467892345,
        high24h: 5.45,
        low24h: 4.89,
    },
    {
        id: 'sol',
        name: 'Solana',
        symbol: 'SOL',
        price: 123.45,
        change24h: 2.75,
        volume24h: 4567891234,
        marketCap: 45678912345,
        high24h: 126.78,
        low24h: 118.93,
    },
    {
        id: 'dot',
        name: 'Polkadot',
        symbol: 'DOT',
        price: 18.76,
        change24h: -0.9,
        volume24h: 1098765432,
        marketCap: 18765432198,
        high24h: 19.23,
        low24h: 18.45,
    },
    {
        id: 'avax',
        name: 'Avalanche',
        symbol: 'AVAX',
        price: 35.67,
        change24h: 5.2,
        volume24h: 2345678901,
        marketCap: 10987654321,
        high24h: 36.98,
        low24h: 33.21,
    }
];

const MarketTrends: React.FC = () => {
    const [timeFrame, setTimeFrame] = useState<string>('24h');

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: price > 100 ? 2 : price > 1 ? 2 : 4
        }).format(price);
    };

    const formatLargeNumber = (number: number): string => {
        if (number >= 1e12) return `$${(number / 1e12).toFixed(2)}T`;
        if (number >= 1e9) return `$${(number / 1e9).toFixed(2)}B`;
        if (number >= 1e6) return `$${(number / 1e6).toFixed(2)}M`;
        return `$${number.toLocaleString()}`;
    };

    return (
        <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle>Market Trends</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-gray-500">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                </Button>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all" className="mb-4">
                    <TabsList>
                        <TabsTrigger value="all">All Assets</TabsTrigger>
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                        <TabsTrigger value="losers">Top Losers</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Asset</th>
                                <th className="text-right p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                                <th className="text-right p-3 text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</th>
                                <th className="text-right p-3 text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Volume</th>
                                <th className="text-right p-3 text-sm font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Market Cap</th>
                                <th className="p-3 w-8"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {marketData.map((asset) => (
                                <tr
                                    key={asset.id}
                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <td className="p-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 dark:from-indigo-500 dark:to-indigo-700 flex items-center justify-center text-white mr-3 font-bold text-xs">
                                                {asset.symbol.substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{asset.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right font-medium text-gray-900 dark:text-white">
                                        {formatPrice(asset.price)}
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className={`flex items-center justify-end font-medium ${asset.change24h >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                            }`}>
                                            {asset.change24h >= 0 ? (
                                                <ArrowUp className="h-3.5 w-3.5 mr-1" />
                                            ) : (
                                                <ArrowDown className="h-3.5 w-3.5 mr-1" />
                                            )}
                                            {Math.abs(asset.change24h).toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="p-3 text-right text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                        {formatLargeNumber(asset.volume24h)}
                                    </td>
                                    <td className="p-3 text-right text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                                        {formatLargeNumber(asset.marketCap)}
                                    </td>
                                    <td className="p-3 w-8">
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default MarketTrends;