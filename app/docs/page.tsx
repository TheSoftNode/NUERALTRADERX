import ComingSoonPage from '@/components/ComingSoonPage/ComingSoonPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation - Coming Soon | NEURAL TRADEX',
    description: 'Our comprehensive documentation is currently under development. We\'re working hard to create detailed guides, API references, and code examples.',
};

export default function Docs() {
    return <ComingSoonPage pageType="Documentation" estimatedRelease="April 2025" />;
}