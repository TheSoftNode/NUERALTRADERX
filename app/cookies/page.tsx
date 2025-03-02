"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Info, FileText } from 'lucide-react';
import Link from 'next/link';

const SimpleCookiePolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Background gradient blobs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-200/30 dark:bg-teal-900/20 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto mb-6 flex justify-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center">
                                <Cookie className="h-8 w-8 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400">Policy</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-3 max-w-2xl mx-auto"
                        >
                            Last Updated: March 2, 2025
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative pb-12 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <div className="prose prose-indigo dark:prose-invert max-w-none">
                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                <Info className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                                What Are Cookies
                            </h2>

                            <p>
                                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                                They are widely used to make websites work more efficiently and provide information to the website owners.
                            </p>

                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                <Cookie className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                                How We Use Cookies
                            </h2>

                            <p>
                                NEURAL TRADEX uses cookies to:
                            </p>

                            <ul>
                                <li>Remember your login status and preferences</li>
                                <li>Understand how you use our platform</li>
                                <li>Enhance security and prevent fraud</li>
                                <li>Analyze the performance and effectiveness of our services</li>
                                <li>Deliver personalized content and experiences</li>
                            </ul>

                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                <Shield className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                                Types of Cookies We Use
                            </h2>

                            <p>We use the following types of cookies:</p>

                            <ul>
                                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly. They enable core functionality such as security, account management, and network management.</li>
                                <li><strong>Functional Cookies:</strong> Help us remember your preferences and settings to personalize your experience.</li>
                                <li><strong>Analytics Cookies:</strong> Collect information about how visitors use our website to help us improve it.</li>
                                <li><strong>Marketing Cookies:</strong> Track your online activity to help advertisers deliver more relevant advertising.</li>
                            </ul>

                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                Managing Your Cookie Preferences
                            </h2>

                            <p>
                                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The Help function within your browser should tell you how.
                            </p>

                            <p>
                                Please note that if you disable cookies, some features of NEURAL TRADEX may not function properly.
                            </p>

                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                Changes to This Cookie Policy
                            </h2>

                            <p>
                                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                            </p>

                            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                Contact Us
                            </h2>

                            <p>
                                If you have any questions about our Cookie Policy, please contact us at
                                <a href="mailto:privacy@neuraltradex.com" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
                                    privacy@neuraltradex.com
                                </a>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            href="/privacy"
                            className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center"
                        >
                            <Shield className="mr-2 h-5 w-5" />
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center"
                        >
                            <FileText className="mr-2 h-5 w-5" />
                            Terms of Service
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SimpleCookiePolicyPage;