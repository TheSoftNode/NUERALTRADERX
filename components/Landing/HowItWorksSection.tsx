"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet, GitBranch, TrendingUp } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            step: "01",
            title: "Connect Wallet",
            description: "Securely connect your NEAR wallet with just a few clicks.",
            icon: <Wallet className="w-full h-full" />
        },
        {
            step: "02",
            title: "Choose Strategy",
            description: "Select and configure your automated trading strategy.",
            icon: <GitBranch className="w-full h-full" />
        },
        {
            step: "03",
            title: "Sit Back & Earn",
            description: "Let your agents work 24/7 while you monitor performance.",
            icon: <TrendingUp className="w-full h-full" />
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-200/20 dark:bg-purple-500/10 blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">Simple Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Getting started with NEURAL TRADEX is simple and secure.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 lg:gap-8">
                    {steps.map((item, index) => (
                        <React.Fragment key={index}>
                            <motion.div
                                className="flex-1 relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col">
                                    <div className="flex items-center mb-6">
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-lg font-medium mr-3"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            {item.step}
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{item.description}</p>

                                    <motion.div
                                        className="w-12 h-12 mx-auto mb-3 text-indigo-600 dark:text-indigo-400"
                                        whileHover={{
                                            rotate: 5,
                                            scale: 1.05,
                                        }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                </div>

                                {index < 2 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <ArrowRight className="h-6 w-6 text-indigo-400 dark:text-indigo-300" />
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        </React.Fragment>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.button
                        className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-colors duration-200"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get Started
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSection;