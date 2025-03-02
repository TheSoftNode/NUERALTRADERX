"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    color: string;
    index: number;
}

const FeatureCard = ({ title, description, icon, color, index }: FeatureCardProps) => {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
        green: 'bg-green-50 border-green-200 hover:bg-green-100',
        purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
        orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    };

    const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <motion.div
            className={`rounded-xl border p-6 transition-all duration-300 ${selectedColor}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </motion.div>
    );
};

export default FeatureCard;