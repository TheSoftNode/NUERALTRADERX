"use client";

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    TrendingUp,
    RefreshCw,
    Clock,
    Plus,
    Wallet,
    Brain
} from 'lucide-react';
import { NearContext } from '@/near-setup/near';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletButton from '@/near-setup/WalletButton';
import AgentCard from './AgentCard';
import MarketTrends from './MarketTrends';
import CreateAgentModal from './CreateAgentModal';
import PerformanceChart from './PerformanceChart';


// Define types
interface Balance {
    base?: number;
    quote: number;
}

interface Profit {
    daily?: number;
    weekly?: number;
    monthly?: number;
    total?: number;
}

interface ProfitPercent {
    daily?: number;
    weekly?: number;
    monthly?: number;
    total?: number;
}

interface Trades {
    daily: number;
    total: number;
}

interface MarketMakingSettings {
    spreadPercentage: number;
    maxOrderSize: number;
    rebalanceThreshold: number;
}

interface DCASettings {
    frequency: string;
    amount: number;
    day: string;
}

interface BaseAgent {
    id: string;
    name: string;
    type: 'market-making' | 'dca' | 'neural';
    status: 'active' | 'paused' | 'error';
    pair: string;
    balance: Balance;
    profit: Profit;
    profitPercent: ProfitPercent;
    created: string;
}

interface MarketMakingAgent extends BaseAgent {
    type: 'market-making';
    settings: MarketMakingSettings;
    activeOrders: number;
    trades: Trades;
}

interface DCAAgent extends BaseAgent {
    type: 'dca';
    settings: DCASettings;
    totalInvested: number;
    currentValue: number;
    nextExecution: string;
    executionsCompleted: number;
}

type Agent = MarketMakingAgent | DCAAgent;

interface PerformanceDataPoint {
    date: string;
    value: number;
}

const Dashboard: React.FC = () => {
    const { signedAccountId, nearBalance } = useContext(NearContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [agentType, setAgentType] = useState<'market-making' | 'dca'>('market-making');

    // Mock data for demonstration
    const mockAgents: Agent[] = [
        {
            id: 'mm-agent-1',
            name: 'BTC-USDT Market Maker',
            type: 'market-making',
            status: 'active',
            pair: 'BTC/USDT',
            balance: { base: 0.125, quote: 2650 },
            profit: { daily: 2.5, weekly: 9.75, monthly: 42.5 },
            profitPercent: { daily: 0.8, weekly: 3.2, monthly: 14.1 },
            created: '2025-02-15',
            settings: {
                spreadPercentage: 0.5,
                maxOrderSize: 0.01,
                rebalanceThreshold: 10
            },
            activeOrders: 4,
            trades: { daily: 28, total: 1458 }
        },
        {
            id: 'dca-agent-1',
            name: 'ETH Weekly DCA',
            type: 'dca',
            status: 'active',
            pair: 'ETH/USDT',
            balance: { quote: 845 },
            totalInvested: 3200,
            currentValue: 3845,
            profit: { total: 645 },
            profitPercent: { total: 20.1 },
            created: '2025-01-22',
            settings: {
                frequency: 'weekly',
                amount: 200,
                day: 'Monday'
            },
            nextExecution: '2025-03-04',
            executionsCompleted: 16
        },
        {
            id: 'mm-agent-2',
            name: 'NEAR-USDT Market Maker',
            type: 'market-making',
            status: 'paused',
            pair: 'NEAR/USDT',
            balance: { base: 425, quote: 1850 },
            profit: { daily: 0, weekly: 12.4, monthly: 58.2 },
            profitPercent: { daily: 0, weekly: 2.8, monthly: 12.2 },
            created: '2025-01-30',
            settings: {
                spreadPercentage: 0.8,
                maxOrderSize: 10,
                rebalanceThreshold: 5
            },
            activeOrders: 0,
            trades: { daily: 0, total: 845 }
        }
    ];

    // Mock performance data
    const mockPerformanceData: PerformanceDataPoint[] = [
        { date: '2025-01-01', value: 10000 },
        { date: '2025-01-15', value: 10250 },
        { date: '2025-02-01', value: 10640 },
        { date: '2025-02-15', value: 10940 },
        { date: '2025-03-01', value: 11280 }
    ];

    useEffect(() => {
        // Simulate loading data
        const loadData = async () => {
            setIsLoading(true);
            // In a real app, fetch data from your smart contract here
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAgents(mockAgents);
            setPerformanceData(mockPerformanceData);
            setIsLoading(false);
        };

        if (signedAccountId) {
            loadData();
        }
    }, [signedAccountId]);

    const openCreateModal = (type: 'market-making' | 'dca') => {
        setAgentType(type);
        setIsCreateModalOpen(true);
    };

    const handleCreateAgent = (agentData: any) => {
        // In a real app, call smart contract to create agent
        // For now, just update the UI
        const newAgent = {
            id: `${agentData.type}-agent-${agents.length + 1}`,
            status: 'active' as const,
            created: new Date().toISOString().split('T')[0],
            ...agentData
        };

        setAgents([...agents, newAgent]);
        setIsCreateModalOpen(false);
    };

    if (!signedAccountId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
                <div className="w-full max-w-md text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8 flex justify-center">
                            <div className="p-4 rounded-full bg-gradient-to-b from-indigo-500/10 to-teal-500/10 border border-indigo-200/20">
                                <Wallet className="h-12 w-12 text-indigo-500" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Connect Your Wallet</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Please connect your NEAR wallet to access your trading dashboard and start creating automated trading agents.
                        </p>
                        <WalletButton className="w-full" />
                    </motion.div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <div className="w-20 h-20 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
            {/* Dashboard Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Welcome back, <span className="font-medium">{signedAccountId}</span>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button variant="outline" size="sm" className="flex items-center">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                        <Button size="sm" className="flex items-center bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Agent
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Portfolio Overview Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <Card className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30 border-indigo-100 dark:border-indigo-900/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${nearBalance !== null ? (nearBalance * 5.24).toFixed(2) : '0.00'}
                            {/* ${nearBalance ? (parseFloat(nearBalance) * 5.24).toFixed(2) : '0.00'} */}
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                            <span className="text-green-600 dark:text-green-400 flex items-center">
                                +4.5%
                                <TrendingUp className="ml-1 h-3 w-3" />
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 ml-2">this week</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {agents.filter(a => a.status === 'active').length}
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                {agents.length} total agents
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">$124.75</div>
                        <div className="flex items-center mt-1 text-sm">
                            <span className="text-green-600 dark:text-green-400 flex items-center">
                                +12.8%
                                <TrendingUp className="ml-1 h-3 w-3" />
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 ml-2">this month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Next DCA Execution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">Mar 4</div>
                        <div className="flex items-center mt-1 text-sm">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                in 2 days
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
            >
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                        <CardDescription>
                            Track the growth of your portfolio over time
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <PerformanceChart data={performanceData} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Agents Section with Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Trading Agents</h2>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Button variant="outline" size="sm" onClick={() => openCreateModal('market-making')} className="flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4 text-teal-500" />
                            New Market Making
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openCreateModal('dca')} className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                            New DCA
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="all">All Agents</TabsTrigger>
                        <TabsTrigger value="market-making">Market Making</TabsTrigger>
                        <TabsTrigger value="dca">DCA</TabsTrigger>
                        <TabsTrigger value="neural">Neural</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {agents.length > 0 ? (
                                agents.map(agent => (
                                    <AgentCard key={agent.id} agent={agent} />
                                ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-12">
                                    <div className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                        <Brain className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Trading Agents Yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                        Create your first automated trading agent to start generating passive income
                                        while you sleep.
                                    </p>
                                    <div className="flex space-x-4">
                                        <Button onClick={() => openCreateModal('market-making')} className="flex items-center">
                                            <TrendingUp className="mr-2 h-4 w-4" />
                                            Create Market Maker
                                        </Button>
                                        <Button variant="outline" onClick={() => openCreateModal('dca')} className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4" />
                                            Create DCA Agent
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="market-making" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {agents.filter(a => a.type === 'market-making').length > 0 ? (
                                agents
                                    .filter(a => a.type === 'market-making')
                                    .map(agent => (
                                        <AgentCard key={agent.id} agent={agent} />
                                    ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-12">
                                    <div className="p-4 rounded-full bg-teal-100 dark:bg-teal-900/30 mb-4">
                                        <TrendingUp className="h-10 w-10 text-teal-500 dark:text-teal-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Market Making Agents</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                        Market making agents buy low and sell high automatically to generate profits from market spreads.
                                    </p>
                                    <Button onClick={() => openCreateModal('market-making')} className="flex items-center">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Market Maker
                                    </Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="dca" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {agents.filter(a => a.type === 'dca').length > 0 ? (
                                agents
                                    .filter(a => a.type === 'dca')
                                    .map(agent => (
                                        <AgentCard key={agent.id} agent={agent} />
                                    ))
                            ) : (
                                <div className="col-span-2 flex flex-col items-center justify-center py-12">
                                    <div className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                        <Clock className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No DCA Agents</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                        Dollar Cost Averaging (DCA) agents automatically invest at regular intervals to reduce the impact of volatility.
                                    </p>
                                    <Button onClick={() => openCreateModal('dca')} className="flex items-center">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create DCA Agent
                                    </Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="neural" className="mt-6">
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                                <Brain className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Neural Prediction Coming Soon</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-2">
                                Our AI-powered price prediction agents are currently in beta testing and will be available soon.
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
                                Join the waitlist to get early access.
                            </p>
                            <Button variant="outline" className="flex items-center">
                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                Join Waitlist
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.div>

            {/* Market Trends Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Trends</h2>
                <MarketTrends />
            </motion.div>

            {/* Create Agent Modal */}
            <CreateAgentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateAgent={handleCreateAgent}
                agentType={agentType}
            />
        </div>
    );
};

export default Dashboard;