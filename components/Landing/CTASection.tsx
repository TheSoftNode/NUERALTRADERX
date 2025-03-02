"use client";

import React from 'react';
import { motion } from 'framer-motion';
import WalletButton from '@/near-setup/WalletButton';

const CTASection: React.FC = () => {
    return (
        <section className="relative py-16 md:py-20 overflow-hidden isolate">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-700 dark:to-blue-900"></div>

            {/* Advanced background elements */}
            <div className="absolute inset-0">
                {/* Animated mesh grid */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cta-grid)" />
                    </svg>
                </div>

                {/* Glow effects */}
                <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-blue-400 dark:bg-blue-300 rounded-full opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-300 dark:bg-indigo-400 rounded-full opacity-10 blur-[120px]"></div>
            </div>

            {/* Decorative geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-24 w-64 h-64 border border-white/10 rounded-full"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/3 -right-32 w-80 h-80 border border-white/10 rounded-full"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full blur-sm"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.05, 0.08, 0.05]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Content container */}
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-3xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="text-center">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Ready to Start Trading Automatically?
                        </motion.h2>

                        <motion.p
                            className="text-xl text-blue-100 dark:text-blue-100 mb-8"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Join thousands of traders who trust NEURAL TRADEX to manage their portfolio.
                        </motion.p>

                        <motion.div
                            className="flex justify-center space-x-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-300 dark:to-indigo-300 rounded-lg blur opacity-50 group-hover:opacity-80 transition duration-300"></div>
                                <WalletButton className="relative px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg" />
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex items-center justify-center space-x-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-blue-200">No credit card required</span>

                            <svg className="w-5 h-5 text-blue-200 ml-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-blue-200">Cancel anytime</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;