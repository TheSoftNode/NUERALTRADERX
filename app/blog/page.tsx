import ComingSoonPage from '@/components/ComingSoonPage/ComingSoonPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Coming Soon | NEURAL TRADEX',
    description: 'Our blog is currently under construction. Soon we\'ll be sharing insights on AI trading, market analysis, and the latest platform updates.',
};

export default function Docs() {
    return <ComingSoonPage pageType="Blog" estimatedRelease="April 2025" />;
}