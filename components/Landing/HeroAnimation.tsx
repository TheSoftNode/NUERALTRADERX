"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }

        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Generate random data for the chart
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 20; i++) {
            const value = Math.random() * 100 + 50;
            data.push(value);
        }
        return data;
    };

    // Chart data
    const chartData = generateData();
    const maxValue = Math.max(...chartData);
    const minValue = Math.min(...chartData);
    const range = maxValue - minValue;

    // Trading parameters for animation
    const buyPoints = [2, 7, 12, 17];
    const sellPoints = [5, 10, 15];

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {dimensions.width > 0 && (
                <>
                    {/* Dashboard mockup */}
                    <motion.div
                        className="absolute inset-0 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Dashboard header */}
                        <div className="bg-gray-50 border-b border-gray-200 p-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        A
                                    </div>
                                    <span className="ml-2 font-semibold">AutoTrader Dashboard</span>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Active
                                </div>
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div className="p-4">
                            {/* Chart */}
                            <div className="h-40 mb-6 relative">
                                <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width - 40} 160`}>
                                    {/* Chart line */}
                                    <motion.path
                                        d={`M 0 ${160 - ((chartData[0] - minValue) / range) * 120} ${chartData.map((value, index) => {
                                            const x = (index * (dimensions.width - 40)) / (chartData.length - 1);
                                            const y = 160 - ((value - minValue) / range) * 120;
                                            return `L ${x} ${y}`;
                                        }).join(' ')}`}
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />

                                    {/* Gradient area under the line */}
                                    <motion.path
                                        d={`M 0 ${160 - ((chartData[0] - minValue) / range) * 120} ${chartData.map((value, index) => {
                                            const x = (index * (dimensions.width - 40)) / (chartData.length - 1);
                                            const y = 160 - ((value - minValue) / range) * 120;
                                            return `L ${x} ${y}`;
                                        }).join(' ')} L ${dimensions.width - 40} 160 L 0 160 Z`}
                                        fill="url(#blue-gradient)"
                                        opacity="0.2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        transition={{ duration: 1, delay: 1 }}
                                    />

                                    {/* Buy points */}
                                    {buyPoints.map((index, i) => {
                                        const x = (index * (dimensions.width - 40)) / (chartData.length - 1);
                                        const y = 160 - ((chartData[index] - minValue) / range) * 120;
                                        return (
                                            <motion.g key={`buy-${i}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 + i * 0.2 }}>
                                                <circle cx={x} cy={y} r="6" fill="#10B981" />
                                                <circle cx={x} cy={y} r="10" stroke="#10B981" strokeWidth="2" fill="none" />
                                            </motion.g>
                                        );
                                    })}

                                    {/* Sell points */}
                                    {sellPoints.map((index, i) => {
                                        const x = (index * (dimensions.width - 40)) / (chartData.length - 1);
                                        const y = 160 - ((chartData[index] - minValue) / range) * 120;
                                        return (
                                            <motion.g key={`sell-${i}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 + i * 0.2 }}>
                                                <circle cx={x} cy={y} r="6" fill="#EF4444" />
                                                <circle cx={x} cy={y} r="10" stroke="#EF4444" strokeWidth="2" fill="none" />
                                            </motion.g>
                                        );
                                    })}

                                    {/* Gradient definition */}
                                    <defs>
                                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { label: 'Total Value', value: '$12,450.25', color: 'blue' },
                                    { label: 'Profit (7d)', value: '+$345.12', color: 'green' },
                                    { label: 'Active Agents', value: '2', color: 'purple' },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-50 p-3 rounded-lg"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.2 }}
                                    >
                                        <div className={`text-${stat.color}-600 text-lg font-bold`}>{stat.value}</div>
                                        <div className="text-gray-500 text-sm">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Agents */}
                            <div className="space-y-3">
                                <div className="text-sm font-medium text-gray-500 mb-2">Active Agents</div>
                                {[
                                    { name: 'Market Maker', status: 'Running', pair: 'NEAR/USDC', profit: '+2.4%' },
                                    { name: 'DCA', status: 'Scheduled', token: 'NEAR', next: '16h' },
                                ].map((agent, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.2 }}
                                    >
                                        <div>
                                            <div className="font-medium">{agent.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {agent.pair ? `${agent.pair}` : `${agent.token}`}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {agent.profit && (
                                                <div className="text-green-600 font-medium mr-3">{agent.profit}</div>
                                            )}
                                            {agent.next && (
                                                <div className="text-gray-600 font-medium mr-3">Next: {agent.next}</div>
                                            )}
                                            <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                {agent.status}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                        className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full opacity-20"
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
                        className="absolute bottom-10 -left-5 w-10 h-10 bg-green-500 rounded-full opacity-20"
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
                        className="absolute top-40 -right-5 w-15 h-15 bg-purple-500 rounded-full opacity-20"
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
                </>
            )}
        </div>
    );
};

export default HeroAnimation;