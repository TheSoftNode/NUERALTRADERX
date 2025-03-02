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

const HeroDashboard = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Animation controls
    const controls = useAnimation();
    const panelControls = useAnimation();

    useEffect(() => {
        setMounted(true);
        console.log("HeroDashboard mounted");

        // Simulate loading data
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
            setLoading(false);
        };

        fetchData();
    }, []);

    if (!mounted || loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
        );
    }

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
                        <div className="px-3 py-1 bg-green-100 text-green-800 dark:bg-opacity-20 rounded-full text-xs font-medium">
                            Bullish
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
                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">N</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        NEAR Protocol
                                    </h2>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                        NEAR
                                    </span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        $3.50
                                    </span>
                                    <div className="ml-2 flex items-center text-green-500">
                                        <ArrowUp className="w-4 h-4 mr-1" />
                                        <span className="font-medium">
                                            4.25%
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

                    {/* Placeholder Chart */}
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
                            <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                                {/* Placeholder grid */}
                                <g className="text-gray-300 dark:text-gray-700">
                                    <line x1="0" y1="40" x2="500" y2="40" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                    <line x1="0" y1="80" x2="500" y2="80" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                    <line x1="0" y1="120" x2="500" y2="120" strokeWidth="1" stroke="currentColor" strokeDasharray="5,5" />
                                </g>

                                {/* Placeholder line */}
                                <motion.path
                                    d="M 0 80 L 100 40 L 200 120 L 300 80 L 400 40 L 500 120"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />

                                {/* Placeholder gradient area */}
                                <motion.path
                                    d="M 0 80 L 100 40 L 200 120 L 300 80 L 400 40 L 500 120 L 500 160 L 0 160 Z"
                                    fill="url(#placeholder-gradient)"
                                    opacity="0.2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    transition={{ duration: 1, delay: 1 }}
                                />

                                {/* Gradient definitions */}
                                <defs>
                                    <linearGradient id="placeholder-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
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
                                value: '$350.00',
                                icon: <Wallet className="h-5 w-5 text-blue-500" />,
                                bgClass: 'bg-blue-50 dark:bg-blue-900/20'
                            },
                            {
                                label: 'Profit (7d)',
                                value: '+$34.50',
                                icon: <BarChart2 className="h-5 w-5 text-green-500" />,
                                bgClass: 'bg-green-50 dark:bg-green-900/20',
                                textClass: 'text-green-600 dark:text-green-400'
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