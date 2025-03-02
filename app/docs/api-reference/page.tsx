import CompactComingSoonPage from '@/components/ComingSoonPage/ComingSoonPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'API Reference - Coming Soon | NEURAL TRADEX',
    description: 'Our developer API is almost ready. Soon you\'ll be able to integrate NEURAL TRADEX\'s powerful trading algorithms directly into your applications.',
};

export default function ApiReferencePage() {
    return <CompactComingSoonPage pageType="API" estimatedRelease="May 2025" />;
}