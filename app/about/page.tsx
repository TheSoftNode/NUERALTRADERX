"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Cpu, BrainCircuit, Layers, Globe, BarChart2, Users, LucideIcon, TrendingUp, MessageSquare, BookOpen, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
}

interface ValueProps {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const ValueCard = ({ title, description, icon: Icon, color }: ValueProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full"
        >
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );
};

const TeamMemberCard = ({ member, index }: { member: TeamMember, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-indigo-200">{member.role}</p>
                </div>
            </div>
            <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
            </div>
        </motion.div>
    );
};

const AboutUs = () => {
    const headerRef = useRef(null);
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const missionRef = useRef(null);
    const ctaRef = useRef(null);

    const headerInView = useInView(headerRef, { once: true });
    const storyInView = useInView(storyRef, { once: true });
    const valuesInView = useInView(valuesRef, { once: true });
    const teamInView = useInView(teamRef, { once: true });
    const missionInView = useInView(missionRef, { once: true });
    const ctaInView = useInView(ctaRef, { once: true });

    const values = [
        {
            title: "Innovation",
            description: "We push the boundaries of AI and blockchain to create cutting-edge trading solutions.",
            icon: Brain,
            color: "bg-indigo-600 dark:bg-indigo-500"
        },
        {
            title: "Transparency",
            description: "We believe in full transparency in our operations, fees, and algorithmic strategies.",
            icon: Layers,
            color: "bg-teal-600 dark:bg-teal-500"
        },
        {
            title: "Security",
            description: "Your assets and data security are our top priority, with rigorous protocols in place.",
            icon: Cpu,
            color: "bg-blue-600 dark:bg-blue-500"
        },
        {
            title: "Accessibility",
            description: "We make sophisticated trading technology accessible to traders of all experience levels.",
            icon: Users,
            color: "bg-purple-600 dark:bg-purple-500"
        }
    ];

    const teamMembers: TeamMember[] = [
        {
            name: "Sophia Chen",
            role: "Founder & CEO",
            bio: "Sophia has over 15 years of experience in fintech and algorithmic trading. Before founding NEURAL TRADEX, she led AI research at a major cryptocurrency exchange.",
            image: "/img/team/sophia-chen.jpg"
        },
        {
            name: "Marcus Johnson",
            role: "CTO",
            bio: "Marcus is a blockchain pioneer with deep expertise in NEAR Protocol. He previously built distributed systems at tech giants and co-founded two successful blockchain startups.",
            image: "/img/team/marcus-johnson.jpg"
        },
        {
            name: "Aisha Patel",
            role: "Head of AI Research",
            bio: "Aisha holds a Ph.D. in machine learning from MIT and specializes in reinforcement learning for financial markets and predictive analytics.",
            image: "/img/team/aisha-patel.jpg"
        },
        {
            name: "David Kim",
            role: "Lead Blockchain Developer",
            bio: "David is a core contributor to several NEAR Protocol projects and has extensive experience building secure smart contracts and decentralized applications.",
            image: "/img/team/david-kim.jpg"
        }
    ];

    const milestones = [
        {
            year: "2023",
            title: "Company Founded",
            description: "NEURAL TRADEX was established with a seed investment of $5M"
        },
        {
            year: "2023",
            title: "Alpha Launch",
            description: "First version of our platform launched with 3 trading strategies"
        },
        {
            year: "2024",
            title: "Series A Funding",
            description: "Secured $12M in Series A funding to expand our team and technology"
        },
        {
            year: "2024",
            title: "Platform Expansion",
            description: "Expanded to support 20+ trading strategies and multiple exchanges"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Neural network animation background */}
            <div className="absolute inset-0 overflow-hidden z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-net" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                            <circle cx="20" cy="60" r="1.5" fill="currentColor" />
                            <circle cx="60" cy="20" r="1.5" fill="currentColor" />
                            <circle cx="60" cy="60" r="1.5" fill="currentColor" />
                            <path d="M40 40 L20 20 M40 40 L60 20 M40 40 L20 60 M40 40 L60 60" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-net)" />
                </svg>
            </div>

            {/* Background gradient blobs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-200/30 dark:bg-teal-900/20 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center" ref={headerRef}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto mb-6 flex justify-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center">
                                <BrainCircuit className="h-10 w-10 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Revolutionizing Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400">AI</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
                        >
                            NEURAL TRADEX is pioneering the future of autonomous cryptocurrency trading through neural networks and blockchain technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/#features"
                                className="px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
                            >
                                Explore Features
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <motion.div
                                className="w-full lg:w-1/2 relative"
                                ref={storyRef}
                                initial="hidden"
                                animate={storyInView ? "visible" : "hidden"}
                                variants={fadeIn}
                            >
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-teal-500/90 dark:from-indigo-800/90 dark:to-teal-700/90 mix-blend-multiply"></div>
                                    <Image
                                        src="/img/about/team-working.jpg"  // You'll need to add this image
                                        alt="NEURAL TRADEX Team"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="flex items-center space-x-2 text-white mb-3">
                                            <TrendingUp className="h-5 w-5" />
                                            <span className="text-sm font-medium">Founded in 2023</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">From vision to revolution</h3>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg -z-10"></div>
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-lg -z-10"></div>
                            </motion.div>

                            <motion.div
                                className="w-full lg:w-1/2"
                                ref={storyRef}
                                initial="hidden"
                                animate={storyInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                            >
                                <motion.h2
                                    variants={fadeInUp}
                                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                                >
                                    Our Story
                                </motion.h2>

                                <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mb-4">
                                    NEURAL TRADEX was born from a vision to democratize advanced trading technologies. Our founders, seasoned experts in AI, finance, and blockchain, recognized that sophisticated algorithmic trading was largely inaccessible to individual traders.
                                </motion.p>

                                <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mb-4">
                                    In 2023, we assembled a team of leading minds in neural networks, machine learning, and NEAR Protocol development to build a platform that would bridge this gap. Our mission was clear: create an intuitive platform where traders of all experience levels could deploy AI-powered trading strategies without requiring extensive technical knowledge.
                                </motion.p>

                                <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mb-4">
                                    After months of rigorous development and testing, NEURAL TRADEX launched with our first set of AI-driven trading agents. Today, we continue to innovate at the intersection of artificial intelligence and blockchain technology, empowering thousands of traders to navigate the cryptocurrency markets with confidence.
                                </motion.p>

                                <motion.div variants={fadeInUp} className="flex items-center mt-8">
                                    <div className="flex -space-x-4 mr-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">SC</div>
                                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm">MJ</div>
                                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">AP</div>
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        <p className="font-semibold">Founded by industry experts</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">With 30+ years combined experience</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12" ref={valuesRef}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4"
                        >
                            Our Values
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            The principles that guide us
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-12"
                        >
                            At NEURAL TRADEX, our values are the foundation of everything we do. They shape our decision-making, guide our development, and define our relationships with our users.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {values.map((value, index) => (
                            <ValueCard key={index} {...value} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-800 dark:to-teal-800 rounded-2xl p-8 sm:p-12 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">$250M+</h3>
                                <p className="text-indigo-100">Trading Volume</p>
                            </motion.div>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">15,000+</h3>
                                <p className="text-indigo-100">Active Users</p>
                            </motion.div>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">24/7</h3>
                                <p className="text-indigo-100">Automated Trading</p>
                            </motion.div>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">20+</h3>
                                <p className="text-indigo-100">Trading Strategies</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12" ref={teamRef}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4"
                        >
                            Our Team
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Meet the minds behind NEURAL TRADEX
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-12"
                        >
                            Our diverse team combines expertise in artificial intelligence, blockchain development, financial markets, and user experience design.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} member={member} index={index} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href="/careers"
                                className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg transition-colors duration-200"
                            >
                                <Users className="h-5 w-5 mr-2" />
                                Join Our Team
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-16 relative z-10" ref={missionRef}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <motion.div
                                className="w-full lg:w-1/2"
                                initial="hidden"
                                animate={missionInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                            >
                                <motion.span
                                    variants={fadeInUp}
                                    className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4"
                                >
                                    Our Mission
                                </motion.span>

                                <motion.h2
                                    variants={fadeInUp}
                                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                                >
                                    Democratizing AI for financial markets
                                </motion.h2>

                                <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mb-6">
                                    We believe in a future where sophisticated AI trading tools are accessible to everyone, not just institutional investors with deep pockets. Our mission is to level the playing field by providing individual traders with institutional-grade AI technology.
                                </motion.p>

                                <motion.div
                                    variants={fadeInUp}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Empowering traders with knowledge about AI and algorithmic trading</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                                                <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Access</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Making advanced trading technology available to traders worldwide</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeInUp}>
                                    <Link
                                        href="/manifesto"
                                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
                                    >
                                        Read our full manifesto
                                        <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="w-full lg:w-1/2 relative"
                                initial="hidden"
                                animate={missionInView ? "visible" : "hidden"}
                                variants={fadeIn}
                            >
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-500/90 dark:from-blue-800/90 dark:to-purple-700/90 mix-blend-multiply"></div>
                                    <Image
                                        src="/img/about/mission-image.jpg"
                                        alt="NEURAL TRADEX Mission"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <div className="mb-4 w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                                                <Award className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Our Purpose</h3>
                                            <p className="text-white/80 max-w-xs mx-auto">
                                                To create a future where AI-powered trading is accessible, transparent, and beneficial for all market participants.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg -z-10"></div>
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg -z-10"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-4"
                        >
                            Our Journey
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Key milestones in our history
                        </motion.h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 pl-8 ml-4 md:ml-8">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="mb-12 relative"
                                >
                                    <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 bg-indigo-500"></div>
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                                        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium mb-2">
                                            {milestone.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 relative z-10" ref={ctaRef}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-800 dark:to-teal-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="relative px-8 py-12 md:p-12 lg:p-16">
                            {/* Background neural network pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="neural-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <circle cx="20" cy="20" r="1" fill="white" />
                                            <circle cx="10" cy="10" r="1" fill="white" />
                                            <circle cx="10" cy="30" r="1" fill="white" />
                                            <circle cx="30" cy="10" r="1" fill="white" />
                                            <circle cx="30" cy="30" r="1" fill="white" />
                                            <path d="M20 20 L10 10 M20 20 L30 10 M20 20 L10 30 M20 20 L30 30" stroke="white" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#neural-cta)" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8 md:mb-0 md:mr-8 md:w-2/3"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to experience the future of trading?</h2>
                                    <p className="text-indigo-100 text-lg mb-0 md:pr-12">
                                        Join thousands of traders who are already leveraging our AI-powered platform to navigate the cryptocurrency markets with confidence.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Link
                                        href="/signup"
                                        className="w-full md:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                                    >
                                        Get Started Free
                                        <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;