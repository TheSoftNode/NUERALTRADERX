"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Brain } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerItems = [
        {
            title: "Products",
            links: [
                { name: "Market Making", href: "/features/market-making" },
                { name: "DCA Agent", href: "/features/dca" },
                { name: "Analytics", href: "/features/analytics" },
                { name: "API Access", href: "/docs/api-access" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/docs/api-reference" },
                { name: "Tutorials", href: "/docs/tutorials" },
                { name: "Blog", href: "/blog" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
            ],
        },
    ];

    const socialLinks = [
        { icon: <Github className="h-5 w-5" />, href: "https://github.com", name: "GitHub" },
        { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", name: "Twitter" },
        { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", name: "LinkedIn" },
        { icon: <Mail className="h-5 w-5" />, href: "mailto:info@neuraltradex.com", name: "Email" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <footer className="relative overflow-hidden bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-16 pb-8">
            {/* Neural network background pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 0 10 L 10 0 M 30 40 L 40 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#footer-grid)" />
                </svg>
            </div>

            {/* Gradient accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-400/5 dark:bg-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-70"></div>
            <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4 opacity-70"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 gap-y-12 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Logo & Description */}
                    <motion.div
                        className="lg:col-span-5"
                        variants={itemVariants}
                    >
                        <Link href="/" className="inline-flex items-center mb-6 group">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 mr-3">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400 group-hover:from-indigo-500 group-hover:to-teal-400 transition-all duration-300">
                                NEURAL TRADEX
                            </div>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                            Automated trading and investment strategies powered by AI on NEAR Protocol. Set your strategy, connect your wallet, and let our neural agents maximize your returns.
                        </p>

                        {/* Newsletter signup */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stay updated with our newsletter</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full max-w-xs px-4 py-2 text-sm rounded-l-lg border-0 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                />
                                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-r-lg text-sm font-medium transition-colors duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-gray-700 dark:hover:text-indigo-400 transition-colors"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Spacer for better alignment */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Links */}
                    {footerItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            className="lg:col-span-2"
                            variants={itemVariants}
                        >
                            <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                                {item.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                                        >
                                            <span>{link.name}</span>
                                            <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform -translate-y-px transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} NEURAL TRADEX. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/privacy"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;