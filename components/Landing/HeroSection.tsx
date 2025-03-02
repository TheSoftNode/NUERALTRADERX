"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, ArrowDown, TrendingUp, BrainCircuit, BarChart2 } from 'lucide-react';
import WalletButton from '@/near-setup/WalletButton';
import HeroDashboard from './HeroDashboard';
import HeroAnimation from './HeroAnimation';
import HeroDashboard2 from './HeroDashboard2';

const HeroSection = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: false });

    // For neural network animation
    const nodeCount = 40;
    const edgeCount = 80;
    const nodes = Array.from({ length: nodeCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        velocity: Math.random() * 0.05 + 0.02
    }));

    const edges = Array.from({ length: edgeCount }).map((_, i) => ({
        from: Math.floor(Math.random() * nodeCount),
        to: Math.floor(Math.random() * nodeCount),
        opacity: Math.random() * 0.3 + 0.1
    }));

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section ref={heroRef} className="relative overflow-hidden pt-28 lg:pt-24 pb-16 md:pb-20">
            {/* Enhanced background grid with smaller pattern */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                    <div className="absolute inset-0 w-full h-full opacity-10 dark:opacity-15">
                        <svg
                            className="absolute inset-0 w-full h-full"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 100"
                        >
                            <defs>
                                <pattern
                                    id="smallGrid"
                                    width="2"
                                    height="2"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M 2 0 L 0 0 0 2" fill="none" stroke="currentColor" strokeWidth="0.05" />
                                </pattern>
                                <pattern
                                    id="grid"
                                    width="10"
                                    height="10"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect width="10" height="10" fill="url(#smallGrid)" />
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                </pattern>
                                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" className="dark:stop-color-indigo-600 stop-color-indigo-400" />
                                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.1" className="dark:stop-color-emerald-600 stop-color-emerald-400" />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" className="dark:stop-color-purple-600 stop-color-purple-400" />
                                </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
                            <rect x="0" y="0" width="100%" height="100%" fill="url(#heroGradient)" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Neural network visual animation */}
            <div className="absolute inset-0 overflow-hidden z-1 opacity-20 dark:opacity-30 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Neural network edges (connections) */}
                    {edges.map((edge, index) => (
                        <motion.line
                            key={`edge-${index}`}
                            x1={nodes[edge.from].x}
                            y1={nodes[edge.from].y}
                            x2={nodes[edge.to].x}
                            y2={nodes[edge.to].y}
                            stroke="currentColor"
                            strokeWidth="0.1"
                            strokeOpacity={edge.opacity}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: isInView ? 1 : 0 }}
                            transition={{ duration: 1.5, delay: index * 0.01 }}
                        />
                    ))}

                    {/* Neural network nodes */}
                    {nodes.map((node, index) => (
                        <motion.circle
                            key={`node-${index}`}
                            cx={node.x}
                            cy={node.y}
                            r={node.size}
                            fill="currentColor"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isInView ? 1 : 0,
                                opacity: isInView ? 0.7 : 0,
                                cx: [
                                    node.x,
                                    node.x + (Math.random() * 2 - 1) * node.velocity,
                                    node.x
                                ]
                            }}
                            transition={{
                                scale: { duration: 1, delay: index * 0.02 },
                                opacity: { duration: 1, delay: index * 0.02 },
                                cx: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="text-indigo-500 dark:text-indigo-400"
                        />
                    ))}
                </svg>
            </div>

            {/* Enhanced animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div
                    className="absolute top-1/4 -left-20 w-64 h-64 rounded-full opacity-15 dark:opacity-20 bg-gradient-to-r from-cyan-400 to-blue-500 blur-3xl"
                    animate={{
                        x: [50, 150, 50],
                        y: [0, 50, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-20 w-32 h-32 rounded-full opacity-10 dark:opacity-15 bg-gradient-to-r from-emerald-400 to-teal-500 blur-2xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full opacity-15 dark:opacity-20 bg-gradient-to-r from-purple-500 to-indigo-500 blur-3xl"
                    animate={{
                        x: [-50, -150, -50],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 23,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-2/3 left-1/3 w-96 h-96 rounded-full opacity-10 dark:opacity-15 bg-gradient-to-r from-teal-400 to-emerald-500 blur-3xl"
                    animate={{
                        x: [50, -50, 50],
                        y: [0, 75, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Floating trading symbols/icons */}
            <div className="absolute inset-0 overflow-hidden z-1 opacity-10 dark:opacity-15 pointer-events-none">
                <motion.div
                    className="absolute text-teal-500 dark:text-teal-400"
                    style={{ top: '25%', left: '15%' }}
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <TrendingUp size={32} />
                </motion.div>
                <motion.div
                    className="absolute text-indigo-500 dark:text-indigo-400"
                    style={{ top: '60%', left: '75%' }}
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <BrainCircuit size={48} />
                </motion.div>
                <motion.div
                    className="absolute text-purple-500 dark:text-purple-400"
                    style={{ top: '75%', left: '25%' }}
                    animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <BarChart2 size={36} />
                </motion.div>
            </div>



            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center md:justify-start min-h-[calc(100vh-8rem)]">
                <div className="flex flex-col lg:flex-row gap-14 items-center justify-center md:justify-start w-full">
                    {/* Hero content */}
                    <motion.div
                        className="w-full flex flex-col items-center justify-center md:justify-start lg:w-1/2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative mb-8"
                        >
                            <div className="inline-block relative">
                                <motion.span
                                    className="inline-flex  justify-center lg:justify-start relative z-10 px-4 py-2 text-sm font-medium 
                        text-indigo-800 dark:text-indigo-200 
                        rounded-full mb-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10
                        border border-indigo-200/20 backdrop-blur-sm"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                                    Built on NEAR Protocol
                                </motion.span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl text-center md:!text-start lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Neural Trading <br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-600 text-center dark:from-teal-400 dark:to-indigo-500"
                            >
                                Without the Complexity
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-600 text-center md:text-start dark:text-gray-300 mb-8 max-w-lg leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            NEURAL TRADEX empowers you with AI-driven trading strategies that run 24/7, without requiring constant attention or technical expertise.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <WalletButton className="px-6 py-3 text-base" />
                            <Button
                                variant="outline"
                                size="lg"
                                className="group px-6 py-3 flex items-center justify-center border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                            >
                                <Play className="w-4 h-4 mr-2 text-teal-500 group-hover:text-teal-400 transition-colors" />
                                <span>Watch Demo</span>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex items-center text-sm text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <ArrowDown className="w-4 h-4 mr-2 animate-bounce" />
                            <span>Scroll to explore features</span>
                        </motion.div>
                    </motion.div>

                    {/* Hero dashboard */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.3 }}
                    >
                        <div className="relative h-[450px] md:h-[500px] lg:h-[600px]">
                            <HeroAnimation />
                            {/* <HeroDashboard2 /> */}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Gradient fade at bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"
                style={{ opacity, y }}
            />
        </section>
    );
};

export default HeroSection;