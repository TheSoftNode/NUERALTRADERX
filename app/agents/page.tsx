"use client";

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Clock,
    Brain,
    Plus,
    Filter,
    Search,
    ArrowUpDown,
    PlayCircle,
    PauseCircle,
    Settings,
    MoreHorizontal,
    ChevronDown,
    AlertTriangle,
    Info,
    Trash2
} from 'lucide-react';
import { NearContext } from '@/near-setup/near';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import CreateAgentModal from '@/components/Dashboard/CreateAgentModal';

// Define types
interface BaseAgent {
    id: string;
    name: string;
    type: 'market-making' | 'dca' | 'neural';
    status: 'active' | 'paused' | 'error';
    pair: string;
    created: string;
    lastUpdated: string;
}

interface MarketMakingAgent extends BaseAgent {
    type: 'market-making';
    balance: {
        base: number;
        quote: number;
    };
    profit: {
        daily: number;
        weekly: number;
        monthly: number;
        total: number;
    };
    settings: {
        spreadPercentage: number;
        maxOrderSize: number;
        rebalanceThreshold: number;
    };
    activeOrders: number;
    totalTrades: number;
}

interface DCAAgent extends BaseAgent {
    type: 'dca';
    balance: {
        quote: number;
    };
    invested: number;
    currentValue: number;
    profit: {
        total: number;
    };
    settings: {
        frequency: string;
        amount: number;
        day: string;
    };
    nextExecution: string;
    executionsCompleted: number;
}

type Agent = MarketMakingAgent | DCAAgent;

// Mock data
const mockAgents: Agent[] = [
    {
        id: 'mm-1',
        name: 'BTC Market Maker',
        type: 'market-making',
        status: 'active',
        pair: 'BTC/USDT',
        created: '2025-01-15',
        lastUpdated: '2025-03-01',
        balance: {
            base: 0.12,
            quote: 3500
        },
        profit: {
            daily: 25.5,
            weekly: 142.75,
            monthly: 580.50,
            total: 1250.25
        },
        settings: {
            spreadPercentage: 0.5,
            maxOrderSize: 0.01,
            rebalanceThreshold: 5
        },
        activeOrders: 4,
        totalTrades: 842
    },
    {
        id: 'dca-1',
        name: 'ETH Weekly DCA',
        type: 'dca',
        status: 'active',
        pair: 'ETH/USDT',
        created: '2025-01-22',
        lastUpdated: '2025-03-01',
        balance: {
            quote: 1200
        },
        invested: 2800,
        currentValue: 3150,
        profit: {
            total: 350
        },
        settings: {
            frequency: 'weekly',
            amount: 200,
            day: 'Monday'
        },
        nextExecution: '2025-03-04',
        executionsCompleted: 14
    },
    {
        id: 'mm-2',
        name: 'NEAR Market Maker',
        type: 'market-making',
        status: 'paused',
        pair: 'NEAR/USDT',
        created: '2025-02-05',
        lastUpdated: '2025-02-28',
        balance: {
            base: 250,
            quote: 1500
        },
        profit: {
            daily: 0,
            weekly: 35.20,
            monthly: 145.80,
            total: 185.45
        },
        settings: {
            spreadPercentage: 0.8,
            maxOrderSize: 25,
            rebalanceThreshold: 10
        },
        activeOrders: 0,
        totalTrades: 315
    },
    {
        id: 'dca-2',
        name: 'NEAR Daily DCA',
        type: 'dca',
        status: 'error',
        pair: 'NEAR/USDT',
        created: '2025-02-10',
        lastUpdated: '2025-03-01',
        balance: {
            quote: 250
        },
        invested: 750,
        currentValue: 790,
        profit: {
            total: 40
        },
        settings: {
            frequency: 'daily',
            amount: 50,
            day: ''
        },
        nextExecution: '2025-03-02',
        executionsCompleted: 15
    }
];

const AgentsPage = () => {
    const { signedAccountId } = useContext(NearContext);
    const [isLoading, setIsLoading] = useState(true);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [agentType, setAgentType] = useState<'market-making' | 'dca'>('market-making');

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // In a real app, fetch from your smart contract
            // For now, use mock data with a delay to simulate loading
            await new Promise(resolve => setTimeout(resolve, 1200));
            setAgents(mockAgents);
            setFilteredAgents(mockAgents);
            setIsLoading(false);
        };

        loadData();
    }, []);

    useEffect(() => {
        // Filter agents based on search term and status filter
        let filtered = [...agents];

        if (searchTerm) {
            filtered = filtered.filter(agent =>
                agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                agent.pair.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(agent => agent.status === statusFilter);
        }

        setFilteredAgents(filtered);
    }, [agents, searchTerm, statusFilter]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilter = (status: string | null) => {
        setStatusFilter(status);
    };

    const handleDeleteAgent = (agent: Agent) => {
        setAgentToDelete(agent);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteAgent = () => {
        if (agentToDelete) {
            // In a real app, call your smart contract
            // For now, just update the UI
            setAgents(agents.filter(a => a.id !== agentToDelete.id));
            setIsDeleteModalOpen(false);
            setAgentToDelete(null);
        }
    };

    const toggleAgentStatus = (agentId: string) => {
        // In a real app, call your smart contract
        // For now, just update the UI
        setAgents(agents.map(agent => {
            if (agent.id === agentId) {
                return {
                    ...agent,
                    status: agent.status === 'active' ? 'paused' : 'active'
                };
            }
            return agent;
        }));
    };

    const openCreateModal = (type: 'market-making' | 'dca') => {
        setAgentType(type);
        setIsCreateModalOpen(true);
    };

    const handleCreateAgent = (agentData: any) => {
        // In a real app, call smart contract to create agent
        // For now, just update the UI
        const newAgent = {
            id: `${agentData.type}-${agents.length + 1}`,
            status: 'active' as const,
            created: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            ...agentData
        };

        setAgents([...agents, newAgent as Agent]);
        setIsCreateModalOpen(false);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatPercent = (value: number) => {
        return `${value.toFixed(2)}%`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500 dark:bg-green-500';
            case 'paused':
                return 'bg-amber-500 dark:bg-amber-500';
            case 'error':
                return 'bg-red-500 dark:bg-red-500';
            default:
                return 'bg-gray-500 dark:bg-gray-500';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
                        Active
                    </Badge>
                );
            case 'paused':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                        <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
                        Paused
                    </Badge>
                );
            case 'error':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
                        <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
                        Error
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800">
                        <span className={`mr-1.5 inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
            >
                <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Agents</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Manage your automated trading bots
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button variant="outline" size="sm" onClick={() => openCreateModal('dca')} className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                        New DCA
                    </Button>
                    <Button size="sm" onClick={() => openCreateModal('market-making')} className="flex items-center bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        New Market Maker
                    </Button>
                </div>
            </motion.div>

            {/* Search and filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="w-full sm:max-w-xs relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search agents..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Status
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusFilter(null)} className="cursor-pointer">
                                    All
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusFilter('active')} className="cursor-pointer">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusFilter('paused')} className="cursor-pointer">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                    Paused
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusFilter('error')} className="cursor-pointer">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                    Error
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm" className="flex items-center">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Sort
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Agents List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
            >
                {isLoading ? (
                    // Loading skeletons
                    Array(3).fill(0).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agentToDelete?.name}</h3>
                                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{agentToDelete?.pair}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-10 w-full" />
                                    <div className="flex gap-3 justify-end">
                                        <Skeleton className="h-8 w-20" />
                                        <Skeleton className="h-8 w-20" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : filteredAgents.length === 0 ? (
                    // No agents found
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-8">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
                                <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No agents found</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                {searchTerm || statusFilter
                                    ? "No agents match your search or filter criteria. Try adjusting your search."
                                    : "You haven't created any trading agents yet. Get started by creating your first bot."}
                            </p>
                            {!searchTerm && !statusFilter && (
                                <div className="flex gap-4">
                                    <Button onClick={() => openCreateModal('market-making')} className="flex items-center">
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Create Market Maker
                                    </Button>
                                    <Button variant="outline" onClick={() => openCreateModal('dca')} className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        Create DCA Agent
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    // Agent list
                    filteredAgents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                                <CardHeader className="pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-lg mr-3 ${agent.type === 'market-making' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                                                {agent.type === 'market-making' ? (
                                                    <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                                ) : (
                                                    <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                                                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span>{agent.pair}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Created {agent.created}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {getStatusBadge(agent.status)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Agent specific data */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {agent.type === 'market-making' ? (
                                                // Market making data
                                                <>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Profit</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(agent.profit.total)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Profit</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(agent.profit.daily)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Orders</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {agent.activeOrders}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Trades</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {agent.totalTrades}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                // DCA data
                                                <>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Invested</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(agent.invested)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Value</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(agent.currentValue)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Profit</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {formatCurrency(agent.profit.total)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next Purchase</div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {agent.nextExecution}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Progress or info section */}
                                        {agent.status === 'error' ? (
                                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3 flex items-start">
                                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                                        Agent has encountered an error
                                                    </p>
                                                    <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                                                        Insufficient funds to execute the next purchase. Please add more funds or adjust your strategy.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : agent.type === 'dca' ? (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">Purchase Progress</div>
                                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {agent.executionsCompleted} buys completed
                                                    </div>
                                                </div>
                                                <Progress value={agent.executionsCompleted * 5} className="h-2" />
                                            </div>
                                        ) : (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 flex items-start">
                                                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                                        Market making settings
                                                    </p>
                                                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                                                        Spread: {agent.settings.spreadPercentage}% | Max Order: {agent.settings.maxOrderSize} | Rebalance: {agent.settings.rebalanceThreshold}%
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex justify-end gap-3">
                                            {agent.status !== 'error' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleAgentStatus(agent.id)}
                                                    className="flex items-center"
                                                >
                                                    {agent.status === 'active' ? (
                                                        <>
                                                            <PauseCircle className="mr-1.5 h-4 w-4 text-amber-500" />
                                                            Pause
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PlayCircle className="mr-1.5 h-4 w-4 text-green-500" />
                                                            Resume
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center"
                                            >
                                                <Settings className="mr-1.5 h-4 w-4" />
                                                Configure
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        Deposit Funds
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        Withdraw Funds
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600 dark:text-red-400 cursor-pointer"
                                                        onClick={() => handleDeleteAgent(agent)}
                                                    >
                                                        Delete Agent
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Delete confirmation dialog */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Agent</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this agent? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-6">
                        {agentToDelete && (
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-lg mr-3 ${agentToDelete.type === 'market-making' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                                        {agentToDelete.type === 'market-making' ? (
                                            <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                        ) : (
                                            <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{agentToDelete.name}</h3>
                                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{agentToDelete.pair}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDeleteAgent}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Agent
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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

export default AgentsPage;