import ComingSoonPage from '@/components/ComingSoonPage/ComingSoonPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tutorials - Coming Soon | NEURAL TRADEX',
    description: 'We\'re creating step-by-step tutorials to help you make the most of NEURAL TRADEX. From beginner guides to advanced techniques.',
};

export default function Docs() {
    return <ComingSoonPage pageType="Tutorials" estimatedRelease="April 2025" />;
}