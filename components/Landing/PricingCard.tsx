"use client";

import { motion } from 'framer-motion';
import { CheckIcon, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    cta: string;
    popular?: boolean;
    index: number;
}

const PricingCard = ({ title, price, features, cta, popular = false, index }: PricingCardProps) => {
    return (
        <motion.div
            className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 relative h-full flex flex-col
                ${popular
                    ? 'border-2 border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-100 dark:shadow-gray-900/40'
                    : 'border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:shadow-gray-900/20'
                }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
        >
            {popular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
            )}

            <div className={`p-6 ${popular ? 'pt-8' : 'pt-6'} flex-grow`}>
                {popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-md">
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        Most Popular
                    </div>
                )}

                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                    <div className="mb-1">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
                    </div>
                    {price !== "Free" && price !== "Contact us" && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">on profitable trades</div>
                    )}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 my-6"></div>

                <ul className="space-y-4 mb-8 text-left flex-grow">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-0.5 mr-3 mt-0.5 flex-shrink-0">
                                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-6 pb-6">
                <Button
                    className={`w-full h-11 font-medium text-sm transition-all duration-200 ${popular
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600 shadow-md shadow-indigo-200/50 dark:shadow-none'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                        }`}
                    variant={popular ? "default" : "outline"}
                >
                    <span>{cta}</span>
                    {popular && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
        </motion.div>
    );
};

export default PricingCard;