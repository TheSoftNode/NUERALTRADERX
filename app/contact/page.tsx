"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa';
import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa6';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormStatus {
    submitted: boolean;
    success: boolean;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface SocialLink {
    name: string;
    icon: React.ReactNode;
    color: string;
    link: string;
}

interface FAQ {
    question: string;
    answer: string;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

const ContactPage: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const headerInView = useInView(headerRef, { once: true });
    const formInView = useInView(formRef, { once: true });
    const mapInView = useInView(mapRef, { once: true });

    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<FormStatus>({
        submitted: false,
        success: false,
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formState.name.trim()) newErrors.name = 'Name is required';

        if (!formState.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formState.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Simulate API call
        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message: 'Thank you for your message! We will get back to you shortly.'
            });

            // Reset form
            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset form status after 5 seconds
            setTimeout(() => {
                setFormStatus({
                    submitted: false,
                    success: false,
                    message: ''
                });
            }, 5000);
        }, 1000);
    };

    const socialLinks: SocialLink[] = [
        {
            name: 'Twitter',
            icon: <FaTwitter className="h-6 w-6 text-white" />,
            color: 'bg-blue-400 dark:bg-blue-500',
            link: 'https://twitter.com/neuraltradex'
        },
        {
            name: 'Discord',
            icon: <FaDiscord className="h-6 w-6 text-white" />,
            color: 'bg-indigo-500 dark:bg-indigo-600',
            link: 'https://discord.gg/neuraltradex'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="h-6 w-6 text-white" />,
            color: 'bg-blue-600 dark:bg-blue-700',
            link: 'https://linkedin.com/company/neuraltradex'
        },
        {
            name: 'GitHub',
            icon: <FaGithub className="h-6 w-6 text-white" />,
            color: 'bg-gray-800 dark:bg-gray-700',
            link: 'https://github.com/neuraltradex'
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
                <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-teal-200/30 dark:bg-teal-900/20 rounded-full filter blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center" ref={headerRef}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto mb-6 flex justify-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center">
                                <MessageSquare className="h-8 w-8 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400">Touch</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
                        >
                            Have questions about NEURAL TRADEX? Our team is here to help. Reach out to us and we'll respond as soon as possible.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="relative py-8 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Our friendly team is here to help</p>
                            <a
                                href="mailto:support@neuraltradex.com"
                                className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
                            >
                                support@neuraltradex.com
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Mon-Fri from 8am to 5pm</p>
                            <a
                                href="tel:+15551234567"
                                className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
                            >
                                +1 (555) 123-4567
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Come say hello at our office</p>
                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                123 Innovation Drive, San Francisco, CA 94107
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Form */}
                        <motion.div
                            ref={formRef}
                            initial="hidden"
                            animate={formInView ? "visible" : "hidden"}
                            variants={staggerContainer}
                            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
                            >
                                Send us a message
                            </motion.h2>

                            {formStatus.submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-6 p-4 rounded-lg ${formStatus.success ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {formStatus.success ? (
                                                <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium">{formStatus.message}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </motion.div>
                                </div>

                                <motion.div variants={fadeInUp} className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="How can we help you?"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={fadeInUp} className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="Tell us what you need help with..."
                                    ></textarea>
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={fadeInUp} className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                                    >
                                        Send Message
                                        <Send className="ml-2 h-5 w-5" />
                                    </button>
                                </motion.div>
                            </form>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            ref={mapRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={mapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.6 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                                {/* Replace this with an actual map integration if you have one */}
                                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-800 opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-gray-500 dark:text-gray-400 text-center">
                                            Interactive map would be displayed here.<br />
                                            (Google Maps, Mapbox, etc.)
                                        </p>
                                    </div>
                                    {/* Map Marker */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center p-1">
                                            <div className="w-4 h-4 bg-indigo-300 rounded-full animate-ping"></div>
                                        </div>
                                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-indigo-600 mx-auto -mt-1"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                        >
                            Can't find the answer you're looking for? Reach out to our customer support team.
                        </motion.p>
                    </div>


                </div>
            </section>

            {/* Social Media & Community Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Connect With Our Community
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                        >
                            Join our growing community of traders and AI enthusiasts. Stay updated with the latest news and feature releases.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                    >
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center mb-3`}>
                                    {social.icon}
                                </div>
                                <span className="text-gray-900 dark:text-white font-medium">{social.name}</span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;