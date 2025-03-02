"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Shield, Lock, Eye, FileText, Clock } from 'lucide-react';

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

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We collect information to provide better services to our users and improve your trading experience. The information we collect includes:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">Account Information:</span> When you create a NEURAL TRADEX account, you provide personal information such as your name, email address, and in some cases, identity verification documents.</li>
          <li><span class="font-medium">Transaction Information:</span> We collect information about the trading strategies you create, deploy, and manage through our platform.</li>
          <li><span class="font-medium">Wallet Information:</span> To enable our services, we require connection to your NEAR wallet, but we do not store your private keys or have direct access to your funds.</li>
          <li><span class="font-medium">Usage Information:</span> We collect information about how you interact with our platform, including log data, device information, and performance metrics.</li>
          <li><span class="font-medium">Cookies and Similar Technologies:</span> We use cookies and similar technologies to enhance your experience and collect information about your browsing sessions.</li>
        </ul>
      `
    },
    {
      title: "How We Use Your Information",
      icon: <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We use the information we collect for the following purposes:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">Providing Services:</span> To operate and maintain the NEURAL TRADEX platform and deliver the features and services you request.</li>
          <li><span class="font-medium">Improving Our Services:</span> To understand how users interact with our platform, identify areas for improvement, and develop new features.</li>
          <li><span class="font-medium">Personalization:</span> To tailor the content and features we show you, including personalized recommendations and trading insights.</li>
          <li><span class="font-medium">Communication:</span> To send you important notices, updates about your account, and respond to your inquiries.</li>
          <li><span class="font-medium">Security:</span> To detect, prevent, and address fraud, unauthorized access, and other potential security issues.</li>
          <li><span class="font-medium">Legal Compliance:</span> To comply with applicable laws, regulations, and legal processes.</li>
        </ul>
      `
    },
    {
      title: "Data Sharing and Disclosure",
      icon: <Lock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">With Your Consent:</span> When you explicitly authorize us to share your information with third parties.</li>
          <li><span class="font-medium">Service Providers:</span> With trusted third-party service providers who assist us in operating our platform and providing services to you, subject to strict contractual protections.</li>
          <li><span class="font-medium">Legal Requirements:</span> When required by law, legal process, or government requests, or to protect our rights, privacy, safety, or property, or that of our users or the public.</li>
          <li><span class="font-medium">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets, where your information may be transferred as a business asset.</li>
        </ul>
        <p class="mb-4">All third parties with whom we share your information are required to use your information in accordance with our instructions and this privacy policy.</p>
      `
    },
    {
      title: "Data Security",
      icon: <Shield className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, and destruction. These measures include:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">Encryption:</span> We encrypt data in transit and at rest using industry-standard protocols.</li>
          <li><span class="font-medium">Access Controls:</span> We restrict access to personal information to authorized employees who need to know that information to perform their job functions.</li>
          <li><span class="font-medium">Regular Audits:</span> We conduct regular security assessments and vulnerability tests of our systems.</li>
          <li><span class="font-medium">Incident Response:</span> We have procedures in place to address potential data breaches and notify affected individuals as required by law.</li>
        </ul>
        <p class="mb-4">While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to improve our security practices.</p>
      `
    },
    {
      title: "Your Rights and Choices",
      icon: <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><span class="font-medium">Access:</span> You can request access to the personal information we hold about you.</li>
          <li><span class="font-medium">Correction:</span> You can request that we correct inaccurate or incomplete information.</li>
          <li><span class="font-medium">Deletion:</span> You can request that we delete your personal information, subject to certain exceptions.</li>
          <li><span class="font-medium">Restriction:</span> You can request that we restrict the processing of your information under certain circumstances.</li>
          <li><span class="font-medium">Data Portability:</span> You can request that we provide your personal information in a structured, commonly used, and machine-readable format.</li>
          <li><span class="font-medium">Objection:</span> You can object to our processing of your personal information in certain circumstances.</li>
        </ul>
        <p class="mb-4">To exercise any of these rights, please contact us at <a href="mailto:privacy@neuraltradex.com" class="text-indigo-600 dark:text-indigo-400 hover:underline">privacy@neuraltradex.com</a>.</p>
      `
    },
    {
      title: "Data Retention",
      icon: <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including to satisfy legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li>The amount, nature, and sensitivity of the personal information</li>
          <li>The potential risk of harm from unauthorized use or disclosure</li>
          <li>The purposes for which we process the information and whether we can achieve those purposes through other means</li>
          <li>Applicable legal, regulatory, tax, accounting, or other requirements</li>
        </ul>
        <p class="mb-4">When we no longer need your personal information for the purposes we collected it, we will securely delete or anonymize it.</p>
      `
    },
    {
      title: "Changes to This Policy",
      icon: <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new effective date. We encourage you to review this policy periodically.</p>
        <p class="mb-4">If we make material changes that significantly affect how we use your personal information, we will provide appropriate notice, including through email or prominent notice on our website.</p>
      `
    },
    {
      title: "Contact Us",
      icon: <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />,
      content: `
        <p class="mb-4">If you have questions or concerns about this privacy policy or our data practices, please contact us at:</p>
        <p class="mb-4">
          NEURAL TRADEX<br />
          Email: <a href="mailto:privacy@neuraltradex.com" class="text-indigo-600 dark:text-indigo-400 hover:underline">privacy@neuraltradex.com</a>
        </p>
        <p class="mb-4">We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.</p>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 -translate-x-1/2"></div>
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-teal-200 dark:bg-teal-900/20 rounded-full filter blur-3xl opacity-30 translate-x-1/2"></div>
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
              <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              At NEURAL TRADEX, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
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
                This Privacy Policy describes how NEURAL TRADEX ("we," "our," or "us") collects, uses, and shares your personal information when you use our website, mobile applications, and services (collectively, the "Services"). Please read this policy carefully to understand our practices regarding your information.
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
            className="text-center mt-12 text-gray-600 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@neuraltradex.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">privacy@neuraltradex.com</a></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;