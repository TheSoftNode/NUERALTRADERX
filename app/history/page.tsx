// import ComingSoonPage from '@/components/ComingSoonPage/ComingSoonPage';
// import type { Metadata } from 'next';


// export default function Docs() {
//     return <ComingSoonPage pageType="History" estimatedRelease="April 2025" />;
// }

"use client";

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowDown,
    ArrowUp,
    Search,
    Filter,
    CalendarIcon,
    ChevronDown,
    Download,
    TrendingUp,
    Clock,
    RefreshCw,
    ShoppingCart,
    DollarSign,
    BarChart2,
    Info
} from 'lucide-react';
import { NearContext } from '@/near-setup/near';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import dayjs from 'dayjs';


// Define types
interface Transaction {
    id: string;
    type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'fee';
    status: 'completed' | 'pending' | 'failed';
    date: string;
    token: string;
    amount: number;
    price: number;
    value: number;
    fee: number;
    agentId: string;
    agentName: string;
    agentType: 'market-making' | 'dca';
    transactionHash: string;
}

interface PerformanceDataPoint {
    date: string;
    value: number;
}

interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}

// Mock data
const mockTransactions: Transaction[] = [
    {
        id: 'tx-1',
        type: 'buy',
        status: 'completed',
        date: '2025-03-01T15:30:45Z',
        token: 'BTC',
        amount: 0.01,
        price: 65432.15,
        value: 654.32,
        fee: 0.65,
        agentId: 'mm-1',
        agentName: 'BTC Market Maker',
        agentType: 'market-making',
        transactionHash: '0x1234abcd5678efgh90ijklmnop'
    },
    {
        id: 'tx-2',
        type: 'sell',
        status: 'completed',
        date: '2025-03-01T14:45:12Z',
        token: 'BTC',
        amount: 0.0125,
        price: 65510.75,
        value: 818.88,
        fee: 0.82,
        agentId: 'mm-1',
        agentName: 'BTC Market Maker',
        agentType: 'market-making',
        transactionHash: '0x2345bcde6789fghi01jklmnopq'
    },
    {
        id: 'tx-3',
        type: 'buy',
        status: 'completed',
        date: '2025-03-01T09:15:30Z',
        token: 'ETH',
        amount: 0.5,
        price: 3456.78,
        value: 1728.39,
        fee: 1.73,
        agentId: 'dca-1',
        agentName: 'ETH Weekly DCA',
        agentType: 'dca',
        transactionHash: '0x3456cdef7890ghij12klmnopqr'
    },
    {
        id: 'tx-4',
        type: 'deposit',
        status: 'completed',
        date: '2025-02-28T10:05:22Z',
        token: 'USDT',
        amount: 1000,
        price: 1,
        value: 1000,
        fee: 0,
        agentId: 'mm-2',
        agentName: 'NEAR Market Maker',
        agentType: 'market-making',
        transactionHash: '0x4567defg8901hijk23lmnopqrs'
    },
    {
        id: 'tx-5',
        type: 'buy',
        status: 'pending',
        date: '2025-03-02T08:30:15Z',
        token: 'NEAR',
        amount: 50,
        price: 5.24,
        value: 262,
        fee: 0.26,
        agentId: 'dca-2',
        agentName: 'NEAR Daily DCA',
        agentType: 'dca',
        transactionHash: '0x5678efgh9012ijkl34mnopqrst'
    },
    {
        id: 'tx-6',
        type: 'withdraw',
        status: 'completed',
        date: '2025-02-27T16:45:33Z',
        token: 'USDT',
        amount: 500,
        price: 1,
        value: 500,
        fee: 0.5,
        agentId: 'mm-1',
        agentName: 'BTC Market Maker',
        agentType: 'market-making',
        transactionHash: '0x6789fghi0123jklm45nopqrstu'
    },
    {
        id: 'tx-7',
        type: 'sell',
        status: 'failed',
        date: '2025-02-26T11:20:05Z',
        token: 'NEAR',
        amount: 100,
        price: 5.18,
        value: 518,
        fee: 0,
        agentId: 'mm-2',
        agentName: 'NEAR Market Maker',
        agentType: 'market-making',
        transactionHash: '0x7890ghij1234klmn56opqrstuv'
    },
    {
        id: 'tx-8',
        type: 'fee',
        status: 'completed',
        date: '2025-02-25T23:10:45Z',
        token: 'NEAR',
        amount: 0.25,
        price: 5.15,
        value: 1.29,
        fee: 1.29,
        agentId: '',
        agentName: 'Network Fee',
        agentType: 'market-making',
        transactionHash: '0x8901hijk2345lmno67pqrstuvw'
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

const HistoryPage = () => {
    const { signedAccountId } = useContext(NearContext);
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined,
    });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [agentFilter, setAgentFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Stats calculated from transactions
    const [stats, setStats] = useState({
        totalVolume: 0,
        totalFees: 0,
        buyCount: 0,
        sellCount: 0
    });

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // In a real app, fetch from your smart contract
            await new Promise(resolve => setTimeout(resolve, 1200));
            setTransactions(mockTransactions);
            setFilteredTransactions(mockTransactions);
            setPerformanceData(mockPerformanceData);

            // Calculate stats
            const totalVolume = mockTransactions.reduce((sum, tx) => sum + tx.value, 0);
            const totalFees = mockTransactions.reduce((sum, tx) => sum + tx.fee, 0);
            const buyCount = mockTransactions.filter(tx => tx.type === 'buy').length;
            const sellCount = mockTransactions.filter(tx => tx.type === 'sell').length;

            setStats({
                totalVolume,
                totalFees,
                buyCount,
                sellCount
            });

            setIsLoading(false);
        };

        loadData();
    }, []);

    useEffect(() => {
        // Filter transactions based on search, type, status, date range, and agent filters
        let filtered = [...transactions];

        if (searchTerm) {
            filtered = filtered.filter(tx =>
                tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (typeFilter) {
            filtered = filtered.filter(tx => tx.type === typeFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(tx => tx.status === statusFilter);
        }

        if (dateRange.from) {
            filtered = filtered.filter(tx =>
                new Date(tx.date) >= dateRange.from!
            );
        }

        if (dateRange.to) {
            filtered = filtered.filter(tx =>
                new Date(tx.date) <= dateRange.to!
            );
        }

        if (agentFilter) {
            filtered = filtered.filter(tx => tx.agentId === agentFilter);
        }

        setFilteredTransactions(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [transactions, searchTerm, typeFilter, statusFilter, dateRange, agentFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleTypeFilter = (type: string | null) => {
        setTypeFilter(type);
    };

    const handleStatusFilter = (status: string | null) => {
        setStatusFilter(status);
    };

    const handleAgentFilter = (agentId: string | null) => {
        setAgentFilter(agentId === "all" ? null : agentId);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setTypeFilter(null);
        setStatusFilter(null);
        setDateRange({ from: undefined, to: undefined });
        setAgentFilter(null);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        // Format date using dayjs instead of date-fns
        return dayjs(dateString).format('MMM D, YYYY, h:mm A');
    };

    const formatDateShort = (date: Date) => {
        return dayjs(date).format('MMM DD');
    };

    const getTransactionTypeDetails = (type: string) => {
        switch (type) {
            case 'buy':
                return {
                    icon: <ShoppingCart className="h-4 w-4 text-green-500" />,
                    label: 'Buy',
                    badgeClass: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
                };
            case 'sell':
                return {
                    icon: <DollarSign className="h-4 w-4 text-blue-500" />,
                    label: 'Sell',
                    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800'
                };
            case 'deposit':
                return {
                    icon: <ArrowDown className="h-4 w-4 text-indigo-500" />,
                    label: 'Deposit',
                    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800'
                };
            case 'withdraw':
                return {
                    icon: <ArrowUp className="h-4 w-4 text-amber-500" />,
                    label: 'Withdraw',
                    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800'
                };
            case 'fee':
                return {
                    icon: <Info className="h-4 w-4 text-gray-500" />,
                    label: 'Fee',
                    badgeClass: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800'
                };
            default:
                return {
                    icon: <Info className="h-4 w-4 text-gray-500" />,
                    label: type,
                    badgeClass: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800'
                };
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                        Completed
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                        Pending
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
                        Failed
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800">
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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        View and filter your automated trading activity
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button size="sm" className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>
            </motion.div>

            {/* Stats & Performance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Stats cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <Skeleton className="h-6 w-24" />
                                ) : (
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(stats.totalVolume)}
                                    </div>
                                )}
                                <div className="flex items-center mt-1 text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Across {filteredTransactions.length} transactions
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Fees Paid</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <Skeleton className="h-6 w-24" />
                                ) : (
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(stats.totalFees)}
                                    </div>
                                )}
                                <div className="flex items-center mt-1 text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {((stats.totalFees / stats.totalVolume) * 100).toFixed(2)}% of volume
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Count</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <Skeleton className="h-6 w-24" />
                                ) : (
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {filteredTransactions.length}
                                    </div>
                                )}
                                <div className="flex items-center mt-1 text-sm">
                                    <span className="text-green-600 dark:text-green-400 flex items-center mr-4">
                                        <ShoppingCart className="h-3 w-3 mr-1" />
                                        {stats.buyCount} Buys
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400 flex items-center">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        {stats.sellCount} Sells
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance chart */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Portfolio Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <Skeleton className="h-[250px] w-full" />
                                </div>
                            ) : (
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={performanceData}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <RechartsTooltip
                                                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Value']}
                                                labelFormatter={(label) => `Date: ${label}`}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#6366F1"
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill="url(#colorValue)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Search and filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="w-full sm:max-w-xs relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search token, agent, or hash..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {/* Type filter */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center h-10">
                                                <Filter className="mr-2 h-4 w-4" />
                                                {typeFilter ? `Type: ${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}` : 'Type'}
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleTypeFilter(null)} className="cursor-pointer">
                                                All Types
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleTypeFilter('buy')} className="cursor-pointer">
                                                <ShoppingCart className="h-4 w-4 text-green-500 mr-2" />
                                                Buy
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleTypeFilter('sell')} className="cursor-pointer">
                                                <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                                                Sell
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleTypeFilter('deposit')} className="cursor-pointer">
                                                <ArrowDown className="h-4 w-4 text-indigo-500 mr-2" />
                                                Deposit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleTypeFilter('withdraw')} className="cursor-pointer">
                                                <ArrowUp className="h-4 w-4 text-amber-500 mr-2" />
                                                Withdraw
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleTypeFilter('fee')} className="cursor-pointer">
                                                <Info className="h-4 w-4 text-gray-500 mr-2" />
                                                Fee
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Status filter */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center h-10">
                                                <Filter className="mr-2 h-4 w-4" />
                                                {statusFilter ? `Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : 'Status'}
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleStatusFilter(null)} className="cursor-pointer">
                                                All Statuses
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleStatusFilter('completed')} className="cursor-pointer">
                                                Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusFilter('pending')} className="cursor-pointer">
                                                Pending
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusFilter('failed')} className="cursor-pointer">
                                                Failed
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Date filter with react-datepicker */}
                                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex items-center h-10">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dateRange.from ? (
                                                    dateRange.to ? (
                                                        <>
                                                            {formatDateShort(dateRange.from)} - {formatDateShort(dateRange.to)}
                                                        </>
                                                    ) : (
                                                        formatDateShort(dateRange.from)
                                                    )
                                                ) : (
                                                    "Date Range"
                                                )}
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <div className="p-4">
                                                <div className="grid gap-4">
                                                    <div className="flex flex-col space-y-2">
                                                        <label className="text-sm font-medium">Start Date</label>
                                                        <input
                                                            type="date"
                                                            className="border rounded p-2 w-full"
                                                            value={dateRange.from ? dateRange.from.toISOString().split('T')[0] : ''}
                                                            onChange={(e) => {
                                                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                                                setDateRange({ ...dateRange, from: date });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col space-y-2">
                                                        <label className="text-sm font-medium">End Date</label>
                                                        <input
                                                            type="date"
                                                            className="border rounded p-2 w-full"
                                                            value={dateRange.to ? dateRange.to.toISOString().split('T')[0] : ''}
                                                            min={dateRange.from ? dateRange.from.toISOString().split('T')[0] : ''}
                                                            onChange={(e) => {
                                                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                                                setDateRange({ ...dateRange, to: date });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setDateRange({ from: undefined, to: undefined });
                                                                setIsDatePickerOpen(false);
                                                            }}
                                                        >
                                                            Clear
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => setIsDatePickerOpen(false)}
                                                        >
                                                            Apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    {/* <Select value={agentFilter || ''} onValueChange={(value) => handleAgentFilter(value || null)}> */}
                                    <Select
                                        value={agentFilter === null ? "all" : agentFilter}
                                        onValueChange={(value) => handleAgentFilter(value)}
                                    >
                                        <SelectTrigger className="h-10 w-[180px]">
                                            <SelectValue placeholder="Filter by agent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Agents</SelectItem>
                                            <SelectItem value="mm-1">BTC Market Maker</SelectItem>
                                            <SelectItem value="dca-1">ETH Weekly DCA</SelectItem>
                                            <SelectItem value="mm-2">NEAR Market Maker</SelectItem>
                                            <SelectItem value="dca-2">NEAR Daily DCA</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Clear filters button */}
                                    {(searchTerm || typeFilter || statusFilter || dateRange.from || agentFilter) && (
                                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-10">
                                            Clear Filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Transactions table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card>
                    <CardContent className="p-0">
                        {isLoading ? (
                            // Loading state
                            <div className="p-6 space-y-4">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-center justify-between py-4">
                                        <div className="flex items-center space-x-4">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredTransactions.length === 0 ? (
                            // No results
                            <div className="flex flex-col items-center justify-center p-10">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
                                    <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                    No transactions match your search or filter criteria. Try adjusting your filters or search term.
                                </p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            // Results table
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Transaction</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Agent</TableHead>
                                            <TableHead>Token</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">Value</TableHead>
                                            <TableHead className="text-right">Fee</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedTransactions.map((tx) => {
                                            const txTypeDetails = getTransactionTypeDetails(tx.type);
                                            return (
                                                <TableRow key={tx.id}>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <Badge variant="outline" className={txTypeDetails.badgeClass}>
                                                                {txTypeDetails.icon}
                                                                <span className="ml-1">{txTypeDetails.label}</span>
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {formatDate(tx.date)}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{new Date(tx.date).toISOString()}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${tx.agentType === 'market-making' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                                                                {tx.agentType === 'market-making' ? (
                                                                    <TrendingUp className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                                                                ) : (
                                                                    <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {tx.agentName}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {tx.token}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {tx.amount.toLocaleString(undefined, {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 8
                                                            })}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {formatCurrency(tx.value)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {formatCurrency(tx.fee)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(tx.status)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                        <Info className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>View Transaction Details</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                    {/* Pagination */}
                    {!isLoading && filteredTransactions.length > 0 && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                    Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
                                </span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) => setItemsPerPage(parseInt(value))}
                                >
                                    <SelectTrigger className="h-8 w-[80px]">
                                        <SelectValue placeholder="10" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                    per page
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    First
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    Last
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </motion.div>
        </div>
    );
}

export default HistoryPage;