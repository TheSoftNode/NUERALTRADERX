import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define types for partner data
interface Partner {
    id: string;
    name: string;
    description: string;
    logo: string;
}

const TrustedByTraders: React.FC = () => {
    const [isHovering, setIsHovering] = useState<number | null>(null);

    // Partners data with logos and descriptions
    const partners: Partner[] = [
        {
            id: 'aurora',
            name: 'Aurora',
            description: 'EVM compatibility layer for NEAR Protocol',
            logo: '🌈' // Placeholder for Aurora logo
        },
        {
            id: 'ref-finance',
            name: 'Ref Finance',
            description: 'The DeFi hub of NEAR Protocol',
            logo: '💱' // Placeholder for Ref Finance logo
        },
        {
            id: 'paras',
            name: 'Paras',
            description: 'NFT marketplace for digital collectibles',
            logo: '🎨' // Placeholder for Paras logo
        },
        {
            id: 'octopus',
            name: 'Octopus Network',
            description: 'Multichain interoperable crypto network',
            logo: '🐙' // Placeholder for Octopus logo
        },
        {
            id: 'proximity',
            name: 'Proximity Labs',
            description: 'Building essential DeFi infrastructure',
            logo: '🔍' // Placeholder for Proximity logo
        },
        {
            id: 'metapool',
            name: 'Meta Pool',
            description: 'Liquid staking protocol for NEAR',
            logo: '🏊' // Placeholder for Metapool logo
        }
    ];

    // Animation variants for logos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: 'spring',
                stiffness: 300
            }
        }
    };

    return (
        <div className="w-full py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 dark:from-indigo-950 dark:via-gray-900 dark:to-blue-950">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="1" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#dots-pattern)" />
                    </svg>
                </div>

                {/* Accent lines */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-400/20 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-400/20 to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Trusted by traders across the NEAR ecosystem
                    </h2>
                    <div className="h-1 w-24 mx-auto rounded bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400"></div>
                </div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            variants={itemVariants}
                            whileHover="hover"
                            onMouseEnter={() => setIsHovering(index)}
                            onMouseLeave={() => setIsHovering(null)}
                            className="flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 hover:shadow-xl dark:hover:bg-gray-700/90 border border-gray-100 dark:border-gray-700/50"
                        >
                            <div className="text-4xl mb-3">{partner.logo}</div>
                            <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                                {partner.name}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: isHovering === index ? 1 : 0,
                                    height: isHovering === index ? 'auto' : 0
                                }}
                                className="text-center mt-2 overflow-hidden"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {partner.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300"
                    >
                        Join Our Trading Community
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default TrustedByTraders;