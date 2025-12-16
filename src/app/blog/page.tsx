
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blog | Insights on Web Design & Digital Growth | Avira Hub',
    description: 'Read the latest insights from Avira Hub on web design, SEO, and digital strategy to help your business grow in the Indian market.',
};

const blogPosts = [
    {
        title: 'How to Choose a Web Designer in India: A Guide',
        slug: '/blog/how-to-choose-a-web-designer-in-india',
        image: 'https://picsum.photos/seed/blog1/600/400',
        excerpt: 'Choosing the right web designer is crucial. This guide breaks down everything you need to know to find the perfect partner in India.',
        date: 'October 17, 2024',
        readingTime: '8 min read',
    },
    {
        title: 'Frontend vs Backend: A Simple Guide for Business Owners',
        slug: '/blog/frontend-vs-backend-development',
        image: 'https://picsum.photos/seed/blog2/600/400',
        excerpt: 'Understand the key differences between frontend and backend development and learn how they come together to build your website.',
        date: 'October 24, 2024',
        readingTime: '7 min read',
    },
    {
        title: 'Top Web Design Trends 2025: A Guide for Indian Businesses',
        slug: '/blog/top-website-design-trends-2025',
        image: 'https://picsum.photos/seed/blog3/600/400',
        excerpt: 'Explore the future of web design with AI-powered interfaces, immersive 3D, bento grids, and other key UI/UX trends for 2025.',
        date: 'November 5, 2024',
        readingTime: '9 min read',
    },
    {
        title: 'Why Your Website Is Not Getting Leads (And How to Fix It)',
        slug: '/blog/my-website-is-not-getting-leads',
        image: 'https://picsum.photos/seed/leads/600/400',
        excerpt: 'Diagnose the common reasons your website is failing to generate leads and learn actionable steps to turn it into a conversion machine.',
        date: 'November 19, 2024',
        readingTime: '10 min read',
    },
    {
        title: 'Website Development Cost in India: A 2025 Pricing Guide',
        slug: '/blog/website-development-cost-in-india',
        image: 'https://picsum.photos/seed/cost/600/400',
        excerpt: 'Wondering about website pricing in India? This guide breaks down the costs for business, e-commerce, and custom websites.',
        date: 'December 2, 2024',
        readingTime: '10 min read',
    },
    {
        title: 'The Ultimate Guide to Gym Website Design in India',
        slug: '/blog/gym-website-design-company-in-india',
        image: 'https://picsum.photos/seed/gymblog/600/400',
        excerpt: 'Learn the 7 essential features your fitness website needs to attract members, manage bookings, and grow your gym business.',
        date: 'December 15, 2024',
        readingTime: '9 min read',
    }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function BlogIndexPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
                <section className="py-20 sm:py-24 bg-background text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">Avira Hub Blog</h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
                            Insights, tutorials, and strategies on web design, SEO, and digital growth for Indian businesses.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <Card key={post.slug} className="flex flex-col overflow-hidden bg-card border-border hover:-translate-y-2 transition-transform duration-300">
                                    <Link href={post.slug} passHref>
                                        <Image
                                            src={post.image}
                                            alt={`Featured image for ${post.title}`}
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-auto"
                                            data-ai-hint="blog abstract"
                                        />
                                    </Link>
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            <Link href={post.slug} passHref>{post.title}</Link>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{post.excerpt}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <div className="text-sm text-muted-foreground">
                                            <span>{post.date}</span> &middot; <span>{post.readingTime}</span>
                                        </div>
                                        <Link href={post.slug} passHref className="text-primary hover:underline flex items-center group">
                                            Read More <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
