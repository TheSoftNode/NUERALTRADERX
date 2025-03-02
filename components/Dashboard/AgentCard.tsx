"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Clock,
    MoreVertical,
    Play,
    Pause,
    Settings,
    ExternalLink,
    Trash2,
    Edit,
    DollarSign
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types imported from the Dashboard component
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

interface AgentCardProps {
    agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    const formatPercent = (value: number): string => {
        return `${value.toFixed(2)}%`;
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'active':
                return 'bg-green-500';
            case 'paused':
                return 'bg-amber-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const toggleAgentStatus = (): void => {
        // In a real app, would call contract here
        console.log(`Toggle status for agent ${agent.id}`);
    };

    return (
        <Card className="overflow-hidden transition-all duration-300">
            <div className="relative">
                {/* Status indicator */}
                <div className="absolute top-4 right-4 flex items-center">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)} mr-2`}></div>
                    <span className="text-xs font-medium capitalize text-gray-600 dark:text-gray-400">
                        {agent.status}
                    </span>
                </div>
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="flex items-center">
                            {agent.type === 'market-making' ? (
                                <TrendingUp className="h-5 w-5 mr-2 text-teal-500 dark:text-teal-400" />
                            ) : (
                                <Clock className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
                            )}
                            {agent.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {agent.pair} • Created {agent.created}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Agent Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" /> Edit Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <ExternalLink className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <DollarSign className="h-4 w-4 mr-2" /> Add Funds
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-400">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Agent
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                {agent.type === 'market-making' ? (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Daily Profit</div>
                                <div className="flex items-baseline">
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(agent.profit.daily || 0)}
                                    </div>
                                    <div className="ml-2 text-sm text-green-600 dark:text-green-400">
                                        {formatPercent(agent.profitPercent.daily || 0)}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Balance</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency((agent.balance.base || 0) * 30000 + agent.balance.quote)}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Active Orders</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {agent.activeOrders} orders
                                </div>
                            </div>
                            <Progress value={agent.activeOrders * 25} className="h-2" />
                        </div>

                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pt-2 border-t border-gray-100 dark:border-gray-800"
                            >
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Weekly Profit</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.profit.weekly || 0)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Monthly Profit</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.profit.monthly || 0)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Total Trades</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {agent.trades.total}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Spread Percentage</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {agent.settings.spreadPercentage}%
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Max Order Size</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {agent.settings.maxOrderSize} {agent.pair.split('/')[0]}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Rebalance Threshold</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {agent.settings.rebalanceThreshold}%
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Return</div>
                                <div className="flex items-baseline">
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(agent.profit.total || 0)}
                                    </div>
                                    <div className="ml-2 text-sm text-green-600 dark:text-green-400">
                                        {formatPercent(agent.profitPercent.total || 0)}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next Purchase</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {agent.nextExecution}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Investment Progress</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {agent.executionsCompleted} buys completed
                                </div>
                            </div>
                            <Progress value={agent.executionsCompleted * 6.25} className="h-2" />
                        </div>

                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pt-2 border-t border-gray-100 dark:border-gray-800"
                            >
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Invested</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.totalInvested)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Current Value</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.currentValue)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.balance.quote)}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Frequency</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white capitalize">
                                            {agent.settings.frequency}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Purchase Amount</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(agent.settings.amount)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Purchase Day</div>
                                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                                            {agent.settings.day}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </CardContent>

            <CardFooter className="flex justify-between pt-0">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>

                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={toggleAgentStatus}
                    >
                        {agent.status === 'active' ? (
                            <>
                                <Pause className="h-3.5 w-3.5 mr-1" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="h-3.5 w-3.5 mr-1" />
                                Resume
                            </>
                        )}
                    </Button>

                    <Button
                        variant="default"
                        size="sm"
                        className="h-8 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700"
                    >
                        <Settings className="h-3.5 w-3.5 mr-1" />
                        Configure
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default AgentCard;