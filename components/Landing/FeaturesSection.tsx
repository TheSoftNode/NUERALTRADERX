// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ChevronRight } from 'lucide-react';
// import { cn } from '@/lib/utils';

// // Feature type definition
// type FeatureProps = {
//     title: string;
//     description: string;
//     icon: React.ReactNode;
//     color: string;
//     index: number;
// };

// // Feature card component with advanced hover effects
// const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon, color, index }) => {
//     const colorVariants = {
//         indigo: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
//         teal: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/50 hover:bg-teal-100 dark:hover:bg-teal-900/40',
//         purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/40',
//         cyan: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/40',
//     };

//     return (
//         <motion.div
//             className={cn(
//                 "p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-blur-sm",
//                 "transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/30",
//                 "flex flex-col h-full"
//             )}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{
//                 y: -5,
//                 transition: { duration: 0.2 }
//             }}
//         >
//             <div className={cn(
//                 "w-14 h-14 rounded-xl mb-5 flex items-center justify-center",
//                 colorVariants[color as keyof typeof colorVariants]
//             )}>
//                 <div className="w-6 h-6">{icon}</div>
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{description}</p>

//             <motion.div
//                 className="mt-5 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center"
//                 initial={{ opacity: 0.8 }}
//                 whileHover={{ opacity: 1, x: 5 }}
//                 transition={{ duration: 0.2 }}
//             >
//                 <span className={cn(
//                     "mr-2",
//                     `text-${color}-600 dark:text-${color}-400`
//                 )}>Learn more</span>
//                 <ChevronRight className={cn(
//                     "h-3 w-3",
//                     `text-${color}-600 dark:text-${color}-400`
//                 )} />
//             </motion.div>
//         </motion.div>
//     );
// };

// // Features section component
// const FeaturesSection: React.FC = () => {
//     // Sample features data
//     const features = [
//         {
//             title: "Neural Prediction",
//             description: "Advanced AI models that analyze market trends and predict future price movements with remarkable accuracy.",
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
//                     <line x1="2" y1="20" x2="2" y2="20"></line>
//                 </svg>
//             ),
//             color: "indigo",
//         },
//         {
//             title: "Automated Trading",
//             description: "Set your strategy parameters and let our agents execute trades 24/7 without emotional bias or fatigue.",
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//             ),
//             color: "teal",
//         },
//         {
//             title: "Risk Management",
//             description: "Sophisticated algorithms that adaptively manage position sizes and stop-losses to protect your capital.",
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                 </svg>
//             ),
//             color: "purple",
//         },
//         {
//             title: "Market Analysis",
//             description: "Real-time insights and analytics across multiple timeframes to keep you informed of market conditions.",
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                     <line x1="3" y1="9" x2="21" y2="9"></line>
//                     <line x1="9" y1="21" x2="9" y2="9"></line>
//                 </svg>
//             ),
//             color: "cyan",
//         },
//     ];

//     // Animation variants for staggered animations
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     return (
//         <section className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
//             {/* Background Decorative Elements */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 blur-3xl" />
//                 <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10 blur-3xl" />
//             </div>

//             <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                     className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                 >
//                     <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300">
//                         Advanced Trading Features
//                     </div>
//                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
//                         Powerful AI-Driven Features
//                     </h2>
//                     <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
//                         Our sophisticated trading agents work tirelessly to help you maximize returns and minimize risks in the volatile crypto market.
//                     </p>
//                 </motion.div>

//                 <motion.div
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     {features.map((feature, index) => (
//                         <FeatureCard
//                             key={index}
//                             title={feature.title}
//                             description={feature.description}
//                             icon={feature.icon}
//                             color={feature.color}
//                             index={index}
//                         />
//                     ))}
//                 </motion.div>

//                 <motion.div
//                     className="mt-16 md:mt-24 text-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                 >
//                     <Button
//                         variant="outline"
//                         size="lg"
//                         className="rounded-full px-8 py-6 text-base bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300"
//                     >
//                         Explore All Features
//                         <ChevronRight className="ml-2 h-4 w-4" />
//                     </Button>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default FeaturesSection;

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Feature type definition
type FeatureProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    index: number;
};

// Feature card component with advanced hover effects
const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon, color, index }) => {
    const colorVariants = {
        indigo: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
        teal: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/50 hover:bg-teal-100 dark:hover:bg-teal-900/40',
        purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-900/40',
        cyan: 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/40',
    };

    return (
        <motion.div
            className={cn(
                "p-5 md:p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/70 backdrop-blur-sm",
                "transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/30",
                "flex flex-col h-full"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <div className={cn(
                "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                colorVariants[color as keyof typeof colorVariants]
            )}>
                <div className="w-5 h-5">{icon}</div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{description}</p>

            <motion.div
                className="mt-4 text-xs font-medium text-gray-900 dark:text-gray-100 flex items-center"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, x: 5 }}
                transition={{ duration: 0.2 }}
            >
                <span className={cn(
                    "mr-2",
                    `text-${color}-600 dark:text-${color}-400`
                )}>Learn more</span>
                <ChevronRight className={cn(
                    "h-3 w-3",
                    `text-${color}-600 dark:text-${color}-400`
                )} />
            </motion.div>
        </motion.div>
    );
};

// Features section component
const FeaturesSection: React.FC = () => {
    // Sample features data
    const features = [
        {
            title: "Neural Prediction",
            description: "Advanced AI models that analyze market trends and predict future price movements with remarkable accuracy.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                    <line x1="2" y1="20" x2="2" y2="20"></line>
                </svg>
            ),
            color: "indigo",
        },
        {
            title: "Automated Trading",
            description: "Set your strategy parameters and let our agents execute trades 24/7 without emotional bias or fatigue.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
            color: "teal",
        },
        {
            title: "Risk Management",
            description: "Sophisticated algorithms that adaptively manage position sizes and stop-losses to protect your capital.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            ),
            color: "purple",
        },
        {
            title: "Market Analysis",
            description: "Real-time insights and analytics across multiple timeframes to keep you informed of market conditions.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
            ),
            color: "cyan",
        },
    ];

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-14 md:py-16 relative overflow-hidden isolate">
            {/* Sophisticated background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-gray-900"></div>

                {/* Interactive grid pattern */}
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.05]">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                            </pattern>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <rect width="40" height="40" fill="url(#smallGrid)"></rect>
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Animated gradient mesh */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#3b82f6,transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#8b5cf6,transparent)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,#14b8a6,transparent)]"></div>
                </div>

                {/* Accent accent elements */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-400/20 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 dark:via-indigo-400/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center px-3 py-1 mb-3 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300">
                        Advanced Trading Features
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Powerful AI-Driven Features
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
                        Our sophisticated trading agents work tirelessly to help you maximize returns and minimize risks.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            color={feature.color}
                            index={index}
                        />
                    ))}
                </motion.div>

                <motion.div
                    className="mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-5 py-2 text-sm bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                        Explore All Features
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;