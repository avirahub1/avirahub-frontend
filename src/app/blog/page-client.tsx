'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs } from '@/services/api';
import { formatDate } from '@/lib/utils';

// Helper to extract excerpt from HTML content
function extractExcerpt(content: string, maxLength: number = 150): string {
    if (!content) return '';
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

export default function BlogIndexPageClient() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlogs() {
            try {
                const data = await fetchBlogs({ limit: 50 });
                if (Array.isArray(data)) {
                    setBlogs(data);
                } else {
                    console.warn('fetchBlogs returned non-array:', data);
                    setBlogs([]);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        }
        loadBlogs();
    }, []);

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
                        {loading ? (
                            <div className="text-center py-20">
                                <p className="text-lg text-muted-foreground">Loading blogs...</p>
                            </div>
                        ) : blogs.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-lg text-muted-foreground">No blog posts yet. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((post: any) => {
                                    const excerpt = post.metaDescription || extractExcerpt(post.content || '');
                                    const date = formatDate(post.publishedAt || post.createdAt);
                                    const readingTime = post.readingTime ? `${post.readingTime} min read` : '';
                                    const imageUrl = post.featuredImage || 'https://picsum.photos/seed/blog/600/400';
                                    
                                    return (
                                        <Card key={post.slug || post._id} className="flex flex-col overflow-hidden bg-card border-border hover:-translate-y-2 transition-transform duration-300">
                                            <Link href={`/blog/${post.slug}`}>
                                                <Image
                                                    src={imageUrl}
                                                    alt={`Featured image for ${post.title}`}
                                                    width={600}
                                                    height={400}
                                                    className="object-cover w-full h-auto"
                                                />
                                            </Link>
                                            <CardHeader>
                                                <CardTitle className="text-xl">
                                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <p className="text-muted-foreground">{excerpt}</p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center">
                                                <div className="text-sm text-muted-foreground">
                                                    {date && <span>{date}</span>}
                                                    {date && readingTime && <span> &middot; </span>}
                                                    {readingTime && <span>{readingTime}</span>}
                                                </div>
                                                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center group">
                                                    Read More <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

