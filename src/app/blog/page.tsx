import type { Metadata } from 'next';
import BlogIndexPageClient from './page-client';

export const metadata: Metadata = {
    title: 'Blog | Insights on Web Design & Digital Growth | Avira Hub',
    description: 'Read the latest insights from Avira Hub on web design, SEO, and digital strategy to help your business grow in the Indian market.',
};

// Client-side rendering to fetch blogs at runtime (works with static export)
export default function BlogIndexPage() {
    return <BlogIndexPageClient />;
}
