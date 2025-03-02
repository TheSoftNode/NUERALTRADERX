"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Scroll, Scale, AlertTriangle, ShieldCheck, Gavel, Bot, Brain } from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TermsAndConditions = () => {
    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const sections = [
        {
            title: "Acceptance of Terms",
            icon: <Scroll className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">By accessing or using the NEURAL TRADEX platform, website, mobile application, or any other services provided by NEURAL TRADEX (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, you may not access or use our Services.</p>
        <p class="mb-4">These Terms constitute a legally binding agreement between you and NEURAL TRADEX regarding your use of the Services. Please read them carefully.</p>
        <p class="mb-4">We may update these Terms from time to time. If we make material changes, we will notify you through the Services or by other means to provide you with the opportunity to review the changes before they become effective. Your continued use of our Services after we publish or send a notice about our changes to these Terms means that you are consenting to the updated Terms.</p>
      `
        },
        {
            title: "Service Description",
            icon: <Bot className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">NEURAL TRADEX provides automated trading services on the NEAR Protocol blockchain. Our platform enables users to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Connect their NEAR wallet to our platform</li>
          <li>Create, customize, and deploy automated trading strategies (agents)</li>
          <li>Monitor performance and manage trading activities</li>
          <li>Access analytics and trading insights</li>
        </ul>
        <p class="mb-4">While we strive to provide accurate information and reliable services, trading in cryptocurrencies involves significant risks. Our AI-powered trading strategies are based on historical data and algorithms, and past performance is not indicative of future results.</p>
        <p class="mb-4">NEURAL TRADEX does not take custody of your funds. All transactions are executed through smart contracts on the NEAR blockchain, and you maintain control of your assets through your connected wallet.</p>
      `
        },
        {
            title: "User Registration and Accounts",
            icon: <ShieldCheck className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">To use certain features of our Services, you may need to create an account and connect your NEAR wallet. By creating an account, you agree to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Keep your wallet credentials and private keys secure</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
        <p class="mb-4">You must be at least 18 years old and have the legal capacity to enter into these Terms to use our Services. By using the Services, you represent and warrant that you meet these requirements.</p>
        <p class="mb-4">We reserve the right to suspend or terminate your account if any information you provide is inaccurate, incomplete, or if you engage in any activity that violates these Terms.</p>
      `
        },
        {
            title: "Trading Risks and Disclaimer",
            icon: <AlertTriangle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">Cryptocurrency trading involves significant risks, including but not limited to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">Market Volatility:</span> Cryptocurrency markets are highly volatile and can fluctuate significantly in a short period.</li>
          <li><span class="font-medium">Liquidity Risks:</span> Certain cryptocurrencies may have limited liquidity, which can affect trading execution and prices.</li>
          <li><span class="font-medium">Technical Risks:</span> Blockchain networks, smart contracts, and our platform may experience technical issues, delays, or failures.</li>
          <li><span class="font-medium">Regulatory Risks:</span> Changes in laws or regulations may adversely affect cryptocurrencies and trading activities.</li>
          <li><span class="font-medium">Strategy Risks:</span> Automated trading strategies may not perform as expected, especially in unusual market conditions.</li>
        </ul>
        <p class="mb-4"><strong>Disclaimer:</strong> NEURAL TRADEX provides its Services on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not guarantee any specific outcomes or profits from using our Services. You acknowledge and agree that you use our Services at your own risk.</p>
        <p class="mb-4">We are not financial advisors, and the information provided through our Services does not constitute financial advice. You should consult with a professional financial advisor before making any investment decisions.</p>
      `
        },
        {
            title: "User Conduct and Prohibited Activities",
            icon: <Gavel className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">When using our Services, you agree not to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Violate any applicable laws, regulations, or third-party rights</li>
          <li>Use our Services for any illegal activities, including money laundering or financing terrorism</li>
          <li>Attempt to gain unauthorized access to our Services or other users' accounts</li>
          <li>Interfere with or disrupt the operation of our Services</li>
          <li>Upload or transmit any viruses, malware, or other malicious code</li>
          <li>Engage in market manipulation or fraudulent activities</li>
          <li>Use automated methods or bots to access our Services, except as explicitly permitted</li>
          <li>Reverse engineer, decompile, or disassemble any portion of our Services</li>
          <li>Use our Services in any manner that could damage, disable, overburden, or impair our systems</li>
        </ul>
        <p class="mb-4">We reserve the right to monitor compliance with these Terms and to take appropriate action, including removing content or suspending or terminating accounts, for violations.</p>
      `
        },
        {
            title: "Intellectual Property Rights",
            icon: <Brain className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">NEURAL TRADEX and its licensors own all intellectual property rights in the Services, including:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Trademarks, service marks, and logos</li>
          <li>Software, algorithms, and trading strategies</li>
          <li>User interfaces and design elements</li>
          <li>Content, documentation, and materials</li>
        </ul>
        <p class="mb-4">We grant you a limited, non-exclusive, non-transferable, revocable license to use our Services for their intended purposes, subject to these Terms. You may not use our intellectual property for any other purpose without our prior written consent.</p>
        <p class="mb-4">Any feedback, suggestions, or ideas you provide about our Services may be used by us without any obligation to compensate you.</p>
      `
        },
        {
            title: "Fees and Payments",
            icon: <Scale className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">NEURAL TRADEX charges fees for certain features and services, which are disclosed on our website or within the Services. We may change our fee structure by providing notice through our Services.</p>
        <p class="mb-4">Fees may include:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Subscription fees for premium features</li>
          <li>Performance fees based on trading profits</li>
          <li>Transaction fees for executing trades</li>
        </ul>
        <p class="mb-4">All fees are in addition to any blockchain network fees (gas fees) required to execute transactions on the NEAR Protocol. You are responsible for ensuring you have sufficient funds to cover all fees.</p>
        <p class="mb-4">Payments are processed through the NEAR blockchain. All fees are non-refundable unless otherwise specified or required by law.</p>
      `
        },
        {
            title: "Limitation of Liability",
            icon: <Scale className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">To the maximum extent permitted by law, NEURAL TRADEX and its affiliates, directors, employees, agents, and licensors will not be liable for:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Any indirect, incidental, special, consequential, or punitive damages</li>
          <li>Trading losses or lost profits</li>
          <li>Damages arising from unauthorized access to your account</li>
          <li>System failures, errors, or inaccuracies in our Services</li>
          <li>Damages resulting from causes beyond our reasonable control</li>
        </ul>
        <p class="mb-4">In no event shall our total liability to you for all claims exceed the amount you paid to NEURAL TRADEX for the Services during the twelve (12) months preceding the event giving rise to the liability, or $100, whichever is greater.</p>
        <p class="mb-4">Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above limitations may not apply to you.</p>
      `
        },
        {
            title: "Indemnification",
            icon: <ShieldCheck className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">You agree to indemnify, defend, and hold harmless NEURAL TRADEX and its affiliates, directors, officers, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Your use of our Services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another person or entity</li>
          <li>Your breach of any applicable laws or regulations</li>
        </ul>
        <p class="mb-4">We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with us in asserting any available defenses.</p>
      `
        },
        {
            title: "Governing Law and Dispute Resolution",
            icon: <Gavel className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
        <p class="mb-4">Any dispute arising out of or relating to these Terms or our Services shall first be resolved through good-faith negotiations. If the dispute cannot be resolved through negotiations, it shall be submitted to binding arbitration in accordance with the rules of [Arbitration Association], and judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.</p>
        <p class="mb-4">Any arbitration shall be conducted on an individual basis, and not as a class, consolidated, or representative action. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction.</p>
      `
        },
        {
            title: "Termination",
            icon: <AlertTriangle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">You may terminate your account at any time by following the instructions on our website. We may terminate or suspend your access to our Services at any time, without prior notice or liability, for any reason, including if you breach these Terms.</p>
        <p class="mb-4">Upon termination:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>Your right to use the Services will immediately cease</li>
          <li>Any ongoing trading activities will be concluded as soon as reasonably practicable</li>
          <li>You will remain responsible for any actions taken prior to termination</li>
          <li>Certain provisions of these Terms will survive termination, including Intellectual Property Rights, Limitation of Liability, Indemnification, and Governing Law and Dispute Resolution</li>
        </ul>
      `
        },
        {
            title: "Contact Information",
            icon: <Scroll className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
            content: `
        <p class="mb-4">If you have any questions, concerns, or feedback about these Terms or our Services, please contact us at:</p>
        <p class="mb-4">
          NEURAL TRADEX<br />
          Email: <a href="mailto:support@neuraltradex.com" class="text-indigo-600 dark:text-indigo-400 hover:underline">support@neuraltradex.com</a>
        </p>
        <p class="mb-4">We will respond to your inquiry as soon as possible.</p>
      `
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute left-0 top-1/4 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 -translate-x-1/2"></div>
                <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full filter blur-3xl opacity-30 translate-x-1/2"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.015] dark:opacity-[0.03]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 0 10 L 10 0 M 30 40 L 40 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-6"
                        >
                            <Scale className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Terms and Conditions</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Please read these terms carefully before using our platform and services.
                        </p>
                        <p className="mt-4 text-gray-500 dark:text-gray-500">Last Updated: March 1, 2025</p>
                    </div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-300">
                                These Terms and Conditions ("Terms") govern your access to and use of the NEURAL TRADEX platform, website, mobile applications, and services. By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {sections.map((section, index) => (
                                <div key={index} className="overflow-hidden">
                                    <motion.button
                                        className={`w-full p-6 sm:p-8 flex items-center justify-between text-left transition-colors ${expandedSection === index
                                                ? 'bg-indigo-50/50 dark:bg-indigo-900/20'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/20'
                                            }`}
                                        onClick={() => toggleSection(index)}
                                        variants={itemVariants}
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-4">{section.icon}</div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                                        </div>
                                        <ChevronDown
                                            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${expandedSection === index ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </motion.button>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedSection === index ? 'auto' : 0,
                                            opacity: expandedSection === index ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className="p-6 sm:p-8 pt-0 sm:pt-0 text-gray-600 dark:text-gray-300 prose prose-indigo dark:prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="text-center mt-12 text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <p className="text-sm">By using NEURAL TRADEX, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
                        <p className="mt-4">
                            <a href="/privacy-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">Privacy Policy</a>
                            <span className="mx-2 text-gray-400">•</span>
                            <a href="/cookie-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">Cookie Policy</a>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsAndConditions;