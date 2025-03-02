"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    Clock,
    BrainCircuit,
    MailIcon,
    Bell,
    CheckCircle,
    Loader2
} from 'lucide-react';

interface PageProps {
    pageType: string;
    estimatedRelease?: string;
}

interface CountdownProps {
    targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
                    <div className="text-indigo-200 text-sm md:text-sm capitalize">{unit}</div>
                </div>
            ))}
        </div>
    );
};

const CompactComingSoonPage: React.FC<PageProps> = ({
    pageType = "Documentation",
    estimatedRelease = "April 2025"
}) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const particlesRef = useRef<HTMLDivElement>(null);
    const notifyControls = useAnimation();

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    useEffect(() => {
        // Create the particles effect
        const createParticles = () => {
            const container = particlesRef.current;
            if (!container) return;

            // Clear existing particles
            container.innerHTML = '';

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            // Create particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');

                // Random size between 2-5px
                const size = Math.random() * 3 + 2;

                // Random position
                const left = Math.random() * containerWidth;
                const top = Math.random() * containerHeight;

                // Random opacity between 0.1-0.5
                const opacity = Math.random() * 0.4 + 0.1;

                // Apply styles
                particle.style.position = 'absolute';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = 'white';
                particle.style.opacity = opacity.toString();
                particle.style.left = `${left}px`;
                particle.style.top = `${top}px`;

                // Animation duration between 20-40s
                const duration = Math.random() * 20 + 20;
                particle.style.animation = `float ${duration}s linear infinite`;

                container.appendChild(particle);
            }
        };

        createParticles();

        // Recreate on window resize
        window.addEventListener('resize', createParticles);

        return () => {
            window.removeEventListener('resize', createParticles);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setErrorMessage('');
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset notification after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 5000);
        }, 1500);
    };

    useEffect(() => {
        if (isSubmitted) {
            notifyControls.start({
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 500, damping: 30 }
            });
        } else {
            notifyControls.start({
                opacity: 0,
                y: 20,
                transition: { duration: 0.2 }
            });
        }
    }, [isSubmitted, notifyControls]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Dynamic content based on page type
    const getContent = () => {
        switch (pageType.toLowerCase()) {
            case 'documentation':
                return {
                    title: "Documentation",
                    description: "Our comprehensive documentation is currently under development. We're working hard to create detailed guides, API references, and code examples.",
                    features: ["API References", "Code Examples", "Best Practices", "Integration Guides"]
                };
            case 'api':
                return {
                    title: "API Access",
                    description: "Our developer API is almost ready. Soon you'll be able to integrate NEURAL TRADEX's powerful trading algorithms directly into your applications.",
                    features: ["RESTful Endpoints", "WebSocket Support", "OAuth Authentication", "Rate Limiting"]
                };
            case 'tutorials':
                return {
                    title: "Tutorials",
                    description: "We're creating step-by-step tutorials to help you make the most of NEURAL TRADEX. From beginner guides to advanced techniques.",
                    features: ["Video Walkthroughs", "Interactive Examples", "Hands-on Exercises", "Expert Tips"]
                };
            case 'blog':
                return {
                    title: "Blog",
                    description: "Our blog is currently under construction. Soon we'll be sharing insights on AI trading, market analysis, and the latest platform updates.",
                    features: ["Market Analysis", "AI Research", "Platform Updates", "User Success Stories"]
                };
            default:
                return {
                    title: pageType,
                    description: `Our ${pageType} section is currently under development. Check back soon for updates.`,
                    features: ["Coming Soon", "Under Development", "In Progress", "Stay Tuned"]
                };
        }
    };

    const content = getContent();

    return (
        <div className="relative pt-12 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 overflow-hidden">
            {/* Particle background */}
            <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden">
                {/* Particles will be dynamically added here */}
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[40px] opacity-30 animate-blob"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-[40px] opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-teal-500 rounded-full mix-blend-multiply filter blur-[40px] opacity-30 animate-blob animation-delay-4000"></div>

            {/* Neural network decorative lines */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-net" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1.5" fill="white" />
                            <circle cx="25" cy="25" r="1.5" fill="white" />
                            <circle cx="25" cy="75" r="1.5" fill="white" />
                            <circle cx="75" cy="25" r="1.5" fill="white" />
                            <circle cx="75" cy="75" r="1.5" fill="white" />
                            <path d="M50 50 L25 25 M50 50 L75 25 M50 50 L25 75 M50 50 L75 75" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-net)" />
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={fadeInUp} className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <BrainCircuit className="h-8 w-8 text-white" />
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-indigo-200 rounded-full text-sm font-medium mb-3">
                            Coming Soon
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                    >
                        {content.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-300">Under Development</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto"
                    >
                        {content.description}
                    </motion.p>

                    {/* <motion.div variants={fadeInUp} className="mb-8">
                        <div className="text-indigo-200 mb-3 flex items-center justify-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Estimated Release: {estimatedRelease}</span>
                        </div>
                    </motion.div> */}
                    <motion.div variants={fadeInUp} className="mb-12">
                        <div className="text-indigo-200 mb-4 flex items-center justify-center">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>Estimated Release: {estimatedRelease}</span>
                        </div>

                        <Countdown targetDate={targetDate} />
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
                    >
                        {content.features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center"
                            >
                                <div className="text-indigo-100 font-medium text-sm">{feature}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="max-w-md mx-auto"
                    >
                        <h2 className="text-lg font-semibold text-white mb-3 flex items-center justify-center">
                            <Bell className="h-4 w-4 mr-2" />
                            Get Notified When We Launch
                        </h2>

                        <form onSubmit={handleSubmit} className="relative">
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-indigo-400 bg-white/10 backdrop-blur-sm text-white placeholder:text-indigo-200"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-medium rounded-r-lg transition-all duration-200 hover:from-teal-600 hover:to-indigo-600 flex items-center justify-center min-w-[100px]"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            Notify Me
                                            <MailIcon className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {errorMessage && (
                                <p className="absolute -bottom-6 left-0 text-red-300 text-sm mt-1">
                                    {errorMessage}
                                </p>
                            )}
                        </form>

                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-2 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center"
                            >
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                <span className="text-green-100 text-sm">
                                    Thanks! We'll notify you when {content.title} is available.
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Add some CSS animations */}
            <style jsx global>{`
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default CompactComingSoonPage;