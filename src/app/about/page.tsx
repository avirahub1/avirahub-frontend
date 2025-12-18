
import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
    title: 'About Avira Hub | Our Mission & Expert Web Design Team',
    description: 'Learn about Avira Hub\'s mission to deliver innovative web design and development. Meet our team of experts dedicated to helping your business succeed online.',
};

export const dynamic = 'force-static';

export default function AboutPage() {
    return <AboutClient />;
}

