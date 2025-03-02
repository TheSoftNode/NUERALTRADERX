"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    ArrowUp,
    ArrowDown,
    Activity,
    Layers,
    Clock,
    BarChart2,
    Wallet,
    Bot,
    CheckCircle,
    RefreshCw,
    Menu
} from 'lucide-react';

// Define types for our chart data
interface ChartDataPoint {
    price: number;
    timestamp: number;
}

interface CryptoData {
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    sparkline_in_7d: {
        price: number[];
    };
    market_cap: number;
    total_volume: number;
}

const HeroDashboard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 450 }); // Default dimensions
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Animation controls
    const controls = useAnimation();
    const panelControls = useAnimation();

    useEffect(() => {
        setMounted(true);
        console.log("HeroDashboard mounted");

        // Function to fetch real crypto data from CoinGecko
        const fetchCryptoData = async () => {
            try {
                // Try to get real time data from CoinGecko API
                try {
                    const response = await fetch(
                        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=near&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=24h',
                        { signal: AbortSignal.timeout(5000) } // Timeout after 5 seconds
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    const data = await response.json();
                    if (data && data.length > 0) {
                        setCryptoData(data[0]);

                        // Convert sparkline data to our format
                        const formattedData = data[0].sparkline_in_7d.price.map((price: number, index: number) => ({
                            price,
                            timestamp: Date.now() - (data[0].sparkline_in_7d.price.length - index) * 3600000 // Approximating hourly data
                        }));

                        setChartData(formattedData);
                        console.log("Fetched real data:", formattedData.length);
                    }
                } catch (error) {
                    console.warn('Falling back to generated data:', error);
                    // Fall back to generated data if API fails
                    generateFallbackData();
                }
            } finally {
                setLoading(false);
            }
        };

        // Fallback function to generate mock data if API fails
        const generateFallbackData = () => {
            console.log("Generating fallback data");
            const mockData: ChartDataPoint[] = [];
            const basePrice = 3.5; // Base price for NEAR
            const now = Date.now();

            // Generate 168 data points (hourly for 7 days)
            for (let i = 0; i < 168; i++) {
                // Create slightly realistic price movements
                const randomFactor = 0.05; // 5% max movement
                const trendFactor = 0.02; // Overall trend
                const cycleFactor = Math.sin(i / 24 * Math.PI) * 0.03; // Daily cycle

                const priceChange =
                    basePrice * randomFactor * (Math.random() - 0.5) + // Random movement
                    basePrice * trendFactor * (i / 168) + // Upward trend
                    basePrice * cycleFactor; // Daily cycle

                mockData.push({
                    price: basePrice + priceChange,
                    timestamp: now - (168 - i) * 3600000
                });
            }

            setChartData(mockData);
            setCryptoData({
                name: "NEAR Protocol",
                symbol: "NEAR",
                current_price: mockData[mockData.length - 1].price,
                price_change_percentage_24h: 4.25,
                sparkline_in_7d: {
                    price: mockData.map(point => point.price)
                },
                market_cap: 3500000000,
                total_volume: 250000000
            });

            console.log("Generated fallback data:", mockData.length);
        };

        // Set container dimensions
        const setContainerDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth || 500;
                const height = containerRef.current.offsetHeight || 450;

                console.log("Container dimensions:", { width, height });

                if (width > 0 && height > 0) {
                    setDimensions({ width, height });
                }
            } else {
                console.log("Container ref not available yet");
            }
        };

        // Initial load
        const handleInitialLoad = async () => {
            setContainerDimensions();
            await fetchCryptoData();

            // Animate in the dashboard
            controls.start({ opacity: 1, y: 0 });

            // Animate panels with a stagger effect
            panelControls.start(i => ({
                opacity: 1,
                y: 0,
                transition: { delay: 0.3 + i * 0.1 }
            }));
        };

        // Run initial load
        handleInitialLoad();

        // Resize handler
        const handleResize = () => {
            setContainerDimensions();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [controls, panelControls]);

    // Set up a second useEffect to handle cases where the ref might be ready later
    useEffect(() => {
        if (containerRef.current && (dimensions.width === 0 || dimensions.height === 0)) {
            const width = containerRef.current.offsetWidth || 500;
            const height = containerRef.current.offsetHeight || 450;

            console.log("Updating dimensions:", { width, height });

            if (width > 0 && height > 0) {
                setDimensions({ width, height });
            }
        }
    }, [dimensions, mounted, containerRef.current]);

    // Trading parameters for animation
    const buyPoints = chartData.length > 0 ? [
        Math.floor(chartData.length * 0.15),
        Math.floor(chartData.length * 0.35),
        Math.floor(chartData.length * 0.6),
        Math.floor(chartData.length * 0.85)
    ] : [];

    const sellPoints = chartData.length > 0 ? [
        Math.floor(chartData.length * 0.25),
        Math.floor(chartData.length * 0.5),
        Math.floor(chartData.length * 0.75)
    ] : [];

    // Format price with commas
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    // Format large numbers with abbreviations
    const formatLargeNumber = (num: number): string => {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        }
        if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        }
        return num.toString();
    };

    // Calculate min, max, and range for the chart
    const chartMin = chartData.length > 0 ? Math.min(...chartData.map(d => d.price)) * 0.9 : 0;
    const chartMax = chartData.length > 0 ? Math.max(...chartData.map(d => d.price)) * 1.1 : 0;
    const chartRange = chartMax - chartMin;

    // Determine chart color based on trend
    const isPositiveTrend = cryptoData?.price_change_percentage_24h ? cryptoData.price_change_percentage_24h > 0 : true;
    const chartStrokeColor = isPositiveTrend ? '#10B981' : '#EF4444';
    const chartGradientStart = isPositiveTrend ? '#10B981' : '#EF4444';
    const chartGradientEnd = '#ffffff'; // Will be overridden by dark mode in the gradient

    // Scale to UI coordinates for the chart
    const scaleX = (index: number): number => {
        const width = Math.max(dimensions.width - 40, 1);
        return (index * width) / Math.max(chartData.length - 1, 1);
    };

    const scaleY = (price: number): number => {
        if (chartRange === 0) return 80; // Default to middle if no range
        return 160 - ((price - chartMin) / chartRange) * 120;
    };

    // Generate the SVG path for the line chart
    const generateChartPath = (): string => {
        if (chartData.length === 0) return '';

        const startPoint = `M 0 ${scaleY(chartData[0].price)}`;
        const linePath = chartData.map((point, i) => {
            return `L ${scaleX(i)} ${scaleY(point.price)}`;
        }).join(' ');

        return startPoint + ' ' + linePath;
    };

    // Generate the SVG path for the area under the chart
    const generateAreaPath = (): string => {
        if (chartData.length === 0) return '';

        const linePath = generateChartPath();
        const closePathStart = `L ${scaleX(chartData.length - 1)} 160`;
        const closePathEnd = 'L 0 160 Z';

        return linePath + ' ' + closePathStart + ' ' + closePathEnd;
    };

    if (!mounted || loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    console.log('Rendering HeroDashboard with data:', {
        width: dimensions.width,
        height: dimensions.height,
        chartDataPoints: chartData.length,
        chartPath: generateChartPath().substring(0, 50) + '...'
    });

    return (
        <div ref={containerRef} className="relative w-full h-full z-10 flex items-center justify-center" style={{ minHeight: '450px' }}>
            {/* Dashboard container */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={controls}
                transition={{ duration: 0.7, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-0"></div>

                {/* Top navbar */}
                <div className="relative z-10 flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            Neural TradeX Dashboard
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 ${isPositiveTrend ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} dark:bg-opacity-20 rounded-full text-xs font-medium`}>
                            {isPositiveTrend ? 'Bullish' : 'Bearish'}
                        </div>
                        <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                </div>

                {/* Dashboard content */}
                <div className="relative z-10 p-4 sm:p-6">
                    {/* Asset header */}
                    <motion.div
                        custom={0}
                        initial={{ opacity: 0, y: 20 }}
                        animate={panelControls}
                        className="mb-6"
                    >
                        <div className="flex flex-wrap justify-between items-center">
                            <div>
                                <div className="flex items-center">
                                    {cryptoData && (
                                        <>
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">N</span>
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {cryptoData.name}
                                                </h2>
                                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {cryptoData.symbol.toUpperCase()}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center mt-1">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {cryptoData && formatPrice(cryptoData.current_price)}
                                    </span>
                                    <div className={`ml-2 flex items-center ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
                                        {isPositiveTrend ? (
                                            <ArrowUp className="w-4 h-4 mr-1" />
                                        ) : (
                                            <ArrowDown className="w-4 h-4 mr-1" />
                                        )}
                                        <span className="font-medium">
                                            {cryptoData && Math.abs(cryptoData.price_change_percentage_24h).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-2 sm:mt-0">
                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <Activity className="w-3.5 h-3.5 mr-1" />
                                    1D
                                </button>
                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                                    <Activity className="w-3.5 h-3.5 mr-1" />
                                    7D
                                </button>
                                <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <Activity className="w-3.5 h-3.5 mr-1" />
                                    1M
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart */}
                    <motion.div
                        custom={1}
                        initial={{ opacity: 0, y: 20 }}
                        animate={panelControls}
                        className="h-52 sm:h-60 mb-6 relative rounded-xl p-4 overflow-hidden bg-gray-50 dark:bg-gray-800/50"
                    >
                        <div className="absolute top-3 left-3 z-10">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Price Chart - 7 Day
                            </span>
                        </div>
                        <div className="absolute inset-0">
                            <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width - 40} 160`} preserveAspectRatio="none">
                                {/* Chart grid */}
                                <g className="text-gray-300 dark:text-gray-700">
                                    <line x1="0" y1="40" x2={dimensions.width - 40} y2="40" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                    <line x1="0" y1="80" x2={dimensions.width - 40} y2="80" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                    <line x1="0" y1="120" x2={dimensions.width - 40} y2="120" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                </g>

                                {/* Y-axis labels */}
                                <g className="text-gray-400 dark:text-gray-500">
                                    <text x="5" y="40" fontSize="10" textAnchor="start" dominantBaseline="middle">
                                        ${(chartMax).toFixed(2)}
                                    </text>
                                    <text x="5" y="80" fontSize="10" textAnchor="start" dominantBaseline="middle">
                                        ${((chartMax + chartMin) / 2).toFixed(2)}
                                    </text>
                                    <text x="5" y="120" fontSize="10" textAnchor="start" dominantBaseline="middle">
                                        ${(chartMin).toFixed(2)}
                                    </text>
                                </g>

                                {/* Chart line */}
                                <motion.path
                                    d={generateChartPath()}
                                    fill="none"
                                    stroke={chartStrokeColor}
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />

                                {/* Gradient area under the line */}
                                <motion.path
                                    d={generateAreaPath()}
                                    fill={`url(#chart-gradient-${isPositiveTrend ? 'up' : 'down'})`}
                                    opacity="0.2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    transition={{ duration: 1, delay: 1 }}
                                />

                                {/* Buy points */}
                                {buyPoints.map((index, i) => {
                                    if (!chartData[index]) return null;
                                    const x = scaleX(index);
                                    const y = scaleY(chartData[index].price);
                                    return (
                                        <motion.g
                                            key={`buy-${i}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.5 + i * 0.2 }}
                                        >
                                            <circle cx={x} cy={y} r="6" fill="#10B981" />
                                            <circle cx={x} cy={y} r="10" stroke="#10B981" strokeWidth="2" fill="none" />
                                        </motion.g>
                                    );
                                })}

                                {/* Sell points */}
                                {sellPoints.map((index, i) => {
                                    if (!chartData[index]) return null;
                                    const x = scaleX(index);
                                    const y = scaleY(chartData[index].price);
                                    return (
                                        <motion.g
                                            key={`sell-${i}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 2 + i * 0.2 }}
                                        >
                                            <circle cx={x} cy={y} r="6" fill="#EF4444" />
                                            <circle cx={x} cy={y} r="10" stroke="#EF4444" strokeWidth="2" fill="none" />
                                        </motion.g>
                                    );
                                })}

                                {/* Gradient definitions */}
                                <defs>
                                    <linearGradient id="chart-gradient-up" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" className="dark:stop-color-gray-900" />
                                    </linearGradient>
                                    <linearGradient id="chart-gradient-down" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" className="dark:stop-color-gray-900" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        custom={2}
                        initial={{ opacity: 0, y: 20 }}
                        animate={panelControls}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
                    >
                        {[
                            {
                                label: 'Total Value',
                                value: cryptoData ? formatPrice(cryptoData.current_price * 100) : '$0.00',
                                icon: <Wallet className="h-5 w-5 text-blue-500" />,
                                bgClass: 'bg-blue-50 dark:bg-blue-900/20'
                            },
                            {
                                label: 'Profit (7d)',
                                value: isPositiveTrend ? '+$345.12' : '-$145.25',
                                icon: <BarChart2 className="h-5 w-5 text-green-500" />,
                                bgClass: isPositiveTrend ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
                                textClass: isPositiveTrend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            },
                            {
                                label: 'Active Agents',
                                value: '2',
                                icon: <Bot className="h-5 w-5 text-purple-500" />,
                                bgClass: 'bg-purple-50 dark:bg-purple-900/20'
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.bgClass} p-4 rounded-xl`}
                            >
                                <div className="flex items-center mb-1">
                                    {stat.icon}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{stat.label}</div>
                                </div>
                                <div className={`text-lg font-bold ${stat.textClass || 'text-gray-900 dark:text-white'}`}>
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Active Agents */}
                    <motion.div
                        custom={3}
                        initial={{ opacity: 0, y: 20 }}
                        animate={panelControls}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Active Agents
                            </div>
                            <div className="flex items-center text-xs text-teal-500 dark:text-teal-400">
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Updated 2m ago
                            </div>
                        </div>

                        {[
                            {
                                name: 'Market Maker',
                                status: 'Running',
                                pair: 'NEAR/USDC',
                                profit: '+2.4%',
                                bgClass: 'bg-white dark:bg-gray-800',
                                borderClass: 'border-gray-200 dark:border-gray-700',
                            },
                            {
                                name: 'DCA',
                                status: 'Scheduled',
                                token: 'NEAR',
                                next: '16h',
                                bgClass: 'bg-white dark:bg-gray-800',
                                borderClass: 'border-gray-200 dark:border-gray-700',
                            },
                        ].map((agent, index) => (
                            <motion.div
                                key={index}
                                className={`${agent.bgClass} ${agent.borderClass} border rounded-xl p-4 flex justify-between items-center`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.2 }}
                            >
                                <div>
                                    <div className="flex items-center">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${agent.name === 'Market Maker' ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-teal-100 dark:bg-teal-900/40'}`}>
                                            {agent.name === 'Market Maker' ?
                                                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> :
                                                <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                            }
                                        </div>
                                        <div className="font-medium text-gray-900 dark:text-white">{agent.name}</div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {agent.pair ? agent.pair : agent.token}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {agent.profit && (
                                        <div className="text-green-600 dark:text-green-400 font-medium mr-3">{agent.profit}</div>
                                    )}
                                    {agent.next && (
                                        <div className="text-gray-600 dark:text-gray-400 font-medium mr-3">Next: {agent.next}</div>
                                    )}
                                    <div className={`px-2 py-1 rounded-full text-xs flex items-center whitespace-nowrap ${agent.status === 'Running' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        {agent.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 opacity-20 dark:opacity-30 blur-xl"
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-10 -left-5 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 opacity-20 dark:opacity-30 blur-xl"
                animate={{
                    y: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute top-40 -right-5 w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 opacity-15 dark:opacity-25 blur-xl"
                animate={{
                    y: [0, 15, 0],
                    scale: [1, 0.9, 1],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
        </div>
    );
};

export default HeroDashboard;