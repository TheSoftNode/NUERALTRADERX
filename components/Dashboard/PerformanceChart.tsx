"use client";

import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { useTheme } from 'next-themes';

interface PerformanceDataPoint {
    date: string;
    value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

interface PerformanceChartProps {
    data: PerformanceDataPoint[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }

    return null;
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Format data for chart
    const formattedData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: item.value
    }));

    // Calculate minimum y-axis value (slightly lower than minimum data point)
    const minValue = Math.min(...data.map(item => item.value)) * 0.95;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={formattedData}
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
                    tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                />
                <YAxis
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={[minValue, 'auto']}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                <Tooltip content={<CustomTooltip />} />
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
    );
};

export default PerformanceChart;