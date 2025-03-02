"use client";

import { motion } from 'framer-motion';
import PricingCard from './PricingCard';

const PricingSection = () => {
    // Pricing plans
    const plans = [
        {
            title: "Basic",
            price: "Free",
            features: [
                "1 Active DCA Agent",
                "Manual execution",
                "Basic analytics",
                "Email support",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            title: "Pro",
            price: "2% fees",
            features: [
                "Unlimited DCA Agents",
                "1 Market Making Agent",
                "Automated execution",
                "Advanced analytics",
                "Priority support",
            ],
            cta: "Start 14-day Trial",
            popular: true,
        },
        {
            title: "Enterprise",
            price: "Contact us",
            features: [
                "Unlimited Agents",
                "Custom strategies",
                "API access",
                "Dedicated account manager",
                "White-label options",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <section className="py-16 md:py-20 relative overflow-hidden">
            {/* Enhanced sophisticated background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-gray-50 to-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-800"></div>

                {/* Mesh gradient effect */}
                <div className="absolute inset-0 opacity-40 dark:opacity-30">
                    <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                            <linearGradient id="meshGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
                                <stop offset="50%" stopColor="#10B981" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
                            </linearGradient>
                            <linearGradient id="meshGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.05" />
                                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.05" />
                                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.05" />
                            </linearGradient>
                            <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="100" height="100" fill="url(#meshGradient1)" />
                                <path d="M0 0L100 100M100 0L0 100" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh)" />
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#meshGradient2)" />
                    </svg>
                </div>

                {/* Soft accent circles */}
                <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-indigo-200/20 dark:bg-indigo-900/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-full">
                        Pricing Plans
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Choose the plan that works best for your trading strategy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            cta={plan.cta}
                            popular={plan.popular}
                            index={index}
                        />
                    ))}
                </div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="inline-flex items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-400 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium text-gray-900 dark:text-white">Still have questions?</span> Contact our team for more information
                            </p>
                        </div>
                        <motion.button
                            className="ml-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Contact Us
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;