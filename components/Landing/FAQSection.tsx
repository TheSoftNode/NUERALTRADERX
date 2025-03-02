"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category?: string;
}

const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // FAQ data with categories
    const faqItems: FAQItem[] = [
        {
            question: "How does NEURAL TRADEX work?",
            answer: "NEURAL TRADEX works by connecting to your NEAR wallet and executing trades on your behalf based on the strategies you've selected and configured. Our smart contracts run on the NEAR blockchain to ensure security and transparency.",
            category: "General"
        },
        {
            question: "Is my crypto safe?",
            answer: "Yes. NEURAL TRADEX uses secure smart contracts that have been audited for security. Your funds always remain under your control through your NEAR wallet, and our platform only gets the permissions you explicitly grant.",
            category: "Security"
        },
        {
            question: "What are the fees?",
            answer: "Our fee structure depends on your plan. We offer a free tier with basic features, and premium tiers with more advanced features for a small percentage of profits or a fixed subscription fee.",
            category: "Pricing"
        },
        {
            question: "Do I need to keep my computer on?",
            answer: "No. Once your agents are set up, they run 24/7 on the NEAR blockchain, regardless of whether your computer is on or not.",
            category: "Technical"
        },
        {
            question: "What if I want to stop an agent?",
            answer: "You can pause or stop your agents at any time through our dashboard. Changes take effect immediately.",
            category: "Usage"
        },
        {
            question: "How do I get started?",
            answer: "Getting started is simple. Just connect your NEAR wallet, select a trading strategy, configure your parameters, and activate your agent. Our step-by-step guide will walk you through the entire process.",
            category: "Onboarding"
        }
    ];

    // Filter FAQs based on search query
    const filteredFAQs = faqItems.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Create column groups for horizontal layout
    const firstColumnFAQs = filteredFAQs.slice(0, Math.ceil(filteredFAQs.length / 2));
    const secondColumnFAQs = filteredFAQs.slice(Math.ceil(filteredFAQs.length / 2));

    return (
        <section className="py-12 md:py-16 relative overflow-hidden">
            {/* Modern sophisticated background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

                {/* Subtle pattern overlay */}
                {/* <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 0 10 L 10 0 M 30 40 L 40 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div> */}
            </div>

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                        FAQ
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                        Got questions? We've got answers.
                    </p>

                    {/* Compact search input */}
                    <div className="relative max-w-sm mx-auto mb-8">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-9 pr-4 py-2 border-0 bg-white dark:bg-gray-800 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                            placeholder="Search FAQ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Horizontal two-column layout for larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
                    {/* First column */}
                    <div>
                        {firstColumnFAQs.map((faq, index) => (
                            <FAQAccordion
                                key={index}
                                faq={faq}
                                isActive={activeIndex === index}
                                onClick={() => toggleFAQ(index)}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Second column */}
                    <div>
                        {secondColumnFAQs.map((faq, index) => (
                            <FAQAccordion
                                key={index + firstColumnFAQs.length}
                                faq={faq}
                                isActive={activeIndex === index + firstColumnFAQs.length}
                                onClick={() => toggleFAQ(index + firstColumnFAQs.length)}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Compact contact support section */}
                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-sm">
                        <p className="text-gray-700 dark:text-gray-300 mr-3">
                            Still have questions?
                        </p>
                        <button className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-medium transition-colors duration-200">
                            Contact Support
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Compact FAQ Accordion Component
const FAQAccordion: React.FC<{
    faq: FAQItem;
    isActive: boolean;
    onClick: () => void;
    index: number;
}> = ({ faq, isActive, onClick, index }) => {
    return (
        <motion.div
            className="mb-3 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
        >
            <div
                className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/50 transition-all duration-300 ${isActive
                    ? "bg-white dark:bg-gray-800 shadow-sm"
                    : "bg-white/70 dark:bg-gray-800/50"
                    }`}
            >
                <button
                    className="flex justify-between items-center w-full px-4 py-3 text-left"
                    onClick={onClick}
                    aria-expanded={isActive}
                >
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {faq.question}
                    </h3>
                    <motion.div
                        animate={{
                            rotate: isActive ? 45 : 0,
                            backgroundColor: isActive ? 'rgb(99, 102, 241)' : 'transparent',
                            color: isActive ? 'white' : 'rgb(156, 163, 175)'
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 ml-2 p-0.5 rounded-full"
                    >
                        <Plus className="h-3 w-3" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-300">
                                {faq.category && (
                                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">
                                        {faq.category}
                                    </span>
                                )}
                                <p>{faq.answer}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FAQSection;