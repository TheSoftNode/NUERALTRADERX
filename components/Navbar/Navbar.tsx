"use client";

import { useState, useEffect, useContext, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
    Menu,
    X,
    ChevronDown,
    TrendingUp,
    Clock,
    BarChart4,
    ArrowUpRight,
    Brain,
    Database,
    Cpu,
    Layers
} from 'lucide-react';
import { NearContext } from '@/near-setup/near';
import ThemeToggle from '../Themes/ThemeToggle';
import WalletButton from '@/near-setup/WalletButton';
import React from 'react';

interface FeatureMenuItem {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    color: string;
}

interface NavLink {
    name: string;
    href?: string;
    items?: FeatureMenuItem[];
}

const Navbar = () => {
    const { signedAccountId } = useContext(NearContext);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeFeature, setActiveFeature] = useState<number | null>(null);
    const pathname = usePathname();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Wait until mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu when path changes
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Add this useEffect to disable body scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Sophisticated background for the navbar when scrolled
    const scrolledBgClass = theme === 'dark'
        ? 'bg-gradient-to-r from-gray-900/95 via-gray-900/95 to-gray-900/95 border-b border-gray-800/30 shadow-lg shadow-indigo-900/5'
        // ? 'bg-gradient-to-r from-gray-900/95 via-gray-900/95 to-gray-900/95 backdrop-blur-lg border-b border-gray-800/30 shadow-lg shadow-indigo-900/5'
        : 'bg-gradient-to-r from-white/95 via-white/95 to-white/95 backdrop-blur-lg border-b border-gray-200/30 shadow-sm shadow-indigo-100/20';

    // Dynamic classes based on theme and scroll state
    const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? scrolledBgClass : 'bg-transparent'}`;


    const textColorClasses = "text-gray-800 dark:text-gray-100";
    const activeTextColorClasses = "text-indigo-600 dark:text-indigo-400";
    const hoverTextColorClasses = "hover:text-indigo-600 dark:hover:text-indigo-400";

    // Brand gradient for logo to match footer
    const logoGradientClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400";

    const featuresMenuItems: FeatureMenuItem[] = [
        {
            title: "Market Making",
            description: "Provide liquidity and earn from price spreads",
            icon: <TrendingUp className="h-6 w-6" />,
            href: "/features/market-making",
            color: "text-cyan-500 dark:text-cyan-400"
        },
        {
            title: "Dollar Cost Averaging",
            description: "Automate regular investments to reduce volatility",
            icon: <Clock className="h-6 w-6" />,
            href: "/features/dca",
            color: "text-teal-500 dark:text-teal-400"
        },
        {
            title: "Neural Prediction",
            description: "AI-powered price movement forecasting",
            icon: <Brain className="h-6 w-6" />,
            href: "/features/prediction",
            color: "text-indigo-500 dark:text-indigo-400"
        },
        {
            title: "Performance Analytics",
            description: "Track and optimize your trading strategies",
            icon: <BarChart4 className="h-6 w-6" />,
            href: "/features/analytics",
            color: "text-purple-500 dark:text-purple-400"
        },
    ];

    // Navigation links - different for signed in users
    const navLinks: NavLink[] = signedAccountId
        ? [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Agents", href: "/agents" },
            { name: "History", href: "/history" },
            { name: "Settings", href: "/settings" },
        ]
        : [
            { name: "Features", items: featuresMenuItems },
            { name: "Pricing", href: "/pricing" },
            { name: "Docs", href: "/docs" },
            { name: "About", href: "/about" },
        ];

    if (!mounted) return null;

    return (
        <header className={navbarClasses}>
            {/* Subtle pattern overlay */}
            {isScrolled && (
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] overflow-hidden pointer-events-none">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="navbar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 0 10 L 10 0 M 30 40 L 40 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#navbar-grid)" />
                    </svg>
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                        >
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 dark:from-indigo-600 dark:to-teal-600 mr-3 group-hover:from-indigo-600 group-hover:to-teal-600 dark:group-hover:from-indigo-500 dark:group-hover:to-teal-500 transition-all duration-300">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className={`text-xl font-bold ${logoGradientClass} group-hover:from-indigo-500 group-hover:to-teal-400 transition-all duration-300`}>
                                NEURAL TRADEX
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden md:flex items-center space-x-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {navLinks.map((link, index) => (
                            <div key={index} className="relative">
                                {link.items ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setActiveFeature(0)}
                                        onMouseLeave={() => setActiveFeature(null)}
                                    >
                                        <button className={`text-base ${textColorClasses} font-medium flex items-center transition-colors ${hoverTextColorClasses}`}>
                                            {link.name}
                                            <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                                        </button>

                                        <AnimatePresence>
                                            {activeFeature !== null && (
                                                <motion.div
                                                    className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[540px] rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 z-50 overflow-hidden"
                                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="relative">
                                                        {/* Decorative element */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-teal-50/50 dark:from-indigo-950/30 dark:to-teal-950/30 opacity-50"></div>

                                                        {/* Header accent */}
                                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

                                                        <div className="relative p-6">
                                                            <div className="grid grid-cols-2 gap-6">
                                                                {link.items.map((item, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        href={item.href}
                                                                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                                    >
                                                                        <div className={`p-2 rounded-lg ${item.color} bg-gray-50 dark:bg-gray-800/80 mr-4`}>
                                                                            {item.icon}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>

                                                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                                                <Link href="/features" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                                                                    View all features
                                                                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href || "#"}
                                        className={`text-base font-medium transition-colors relative ${pathname === link.href
                                            ? activeTextColorClasses
                                            : `${textColorClasses} ${hoverTextColorClasses}`
                                            }`}
                                    >
                                        <span className="relative">
                                            {link.name}
                                            {pathname === link.href && (
                                                <motion.span
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-400 dark:to-teal-400"
                                                    layoutId="navHighlight"
                                                />
                                            )}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Wallet Connection Button */}
                    <motion.div
                        className="hidden md:flex items-center space-x-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ThemeToggle />
                        <WalletButton />
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-2"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Enhanced */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        // className="md:hidden fixed inset-0 z-40 bg-opacity-100 dark:bg-opacity-100 bg-white dark:bg-gray-900"
                        className="md:hidden fixed inset-0 z-64 bg-white dark:bg-gray-900"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        {/* Mobile menu pattern */}
                        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id="mobile-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="10" cy="10" r="1" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#mobile-dots)" />
                            </svg>
                        </div>

                        {/* Gradient accents */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-teal-500 opacity-80"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-400/5 dark:bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/4"></div>

                        <div className="absolute top-0 right-0 pt-4 pr-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="p-4 pt-20 h-screen overflow-y-auto">
                            <nav className="flex flex-col space-y-2">
                                <div className="flex items-center mb-6">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 mr-3">
                                        <Brain className="h-6 w-6 text-white" />
                                    </div>
                                    <span className={`text-xl font-bold ${logoGradientClass}`}>
                                        NEURAL TRADEX
                                    </span>
                                </div>

                                <Link
                                    href="/"
                                    className="p-3 rounded-lg text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>

                                {signedAccountId ? (
                                    // Navigation for signed-in users
                                    <>
                                        {[
                                            { name: "Dashboard", href: "/dashboard", icon: <BarChart4 className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" /> },
                                            { name: "Agents", href: "/agents", icon: <Cpu className="h-5 w-5 mr-2 text-teal-500 dark:text-teal-400" /> },
                                            { name: "History", href: "/history", icon: <Clock className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" /> },
                                            { name: "Settings", href: "/settings", icon: <Layers className="h-5 w-5 mr-2 text-purple-500 dark:text-purple-400" /> },
                                        ].map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className={`p-3 flex items-center rounded-lg text-base font-medium ${pathname === item.href
                                                    ? 'bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-900/20 dark:to-teal-900/20 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                    } transition-colors`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.icon}
                                                {item.name}
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    // Navigation for visitors
                                    <>
                                        <div className="p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 mb-1">
                                            <div className="flex items-center justify-between w-full text-base font-medium text-gray-900 dark:text-white mb-2">
                                                <span>Features</span>
                                            </div>
                                            <div className="space-y-1">
                                                {featuresMenuItems.map((item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className="flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <div className={`p-1.5 rounded-md ${item.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/10`}>
                                                            {React.cloneElement(item.icon as React.ReactElement, {
                                                                className: `h-5 w-5 ${item.color}`
                                                            })}
                                                        </div>
                                                        <span className="ml-3">{item.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {[
                                            { name: "Pricing", href: "/pricing" },
                                            { name: "Docs", href: "/docs" },
                                            { name: "About", href: "/about" },
                                        ].map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className={`p-3 rounded-lg text-base font-medium ${pathname === item.href
                                                    ? 'bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-900/20 dark:to-teal-900/20 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                    } transition-colors`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </>
                                )}

                                <div className="p-3 mt-4">
                                    <WalletButton />
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;