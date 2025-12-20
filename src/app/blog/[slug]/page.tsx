import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogBySlug, fetchBlogs } from '@/services/api';
import { formatDate } from '@/lib/utils';

// Generate static params for better performance (optional - can be removed for fully dynamic)
// With static export, this runs at build time - API must be accessible
// If API fails, returns empty array to allow build to continue
export async function generateStaticParams() {
    try {
        const blogs = await fetchBlogs({ limit: 100 });
        
        if (!Array.isArray(blogs)) {
            console.warn('generateStaticParams: API returned non-array, returning empty');
            return [];
        }
        
        return blogs.map((blog: any) => ({
            slug: blog.slug,
        }));
    } catch (error) {
        // Log but don't fail build - return empty array to allow build to continue
        // Pages will be generated on-demand at runtime if needed
        console.warn('generateStaticParams: Failed to fetch blogs, continuing with empty params:', error);
        return [];
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const blog = await fetchBlogBySlug(params.slug);
        
        if (!blog) {
            return {
                title: 'Blog Not Found | Avira Hub',
            };
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://avirahub.in';
        const canonicalUrl = blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`;
        const ogImage = blog.ogImage || blog.featuredImage || `${siteUrl}/img/avira.png`;
        const metaTitle = blog.metaTitle || blog.title;
        const metaDescription = blog.metaDescription || '';
        const ogTitle = blog.ogTitle || metaTitle;
        const ogDescription = blog.ogDescription || metaDescription;

        return {
            title: metaTitle,
            description: metaDescription,
            keywords: blog.seoKeywords?.join(', '),
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: ogTitle,
                description: ogDescription,
                url: canonicalUrl,
                siteName: 'Avira Hub',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ],
                locale: 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: ogTitle,
                description: ogDescription,
                images: [ogImage],
            },
        };
    } catch (error) {
        // Log but don't fail build - return default metadata
        console.warn(`generateMetadata: Failed to fetch blog ${params.slug}, using defaults:`, error);
        return {
            title: 'Blog | Avira Hub',
            description: 'Read the latest insights from Avira Hub',
        };
    }
}

// Generate structured data (JSON-LD)
function generateStructuredData(blog: any) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://avirahub.in';
    const canonicalUrl = blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`;
    const imageUrl = blog.featuredImage || blog.ogImage || `${siteUrl}/img/avira.png`;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.metaDescription || '',
        image: imageUrl,
        datePublished: blog.publishedAt || blog.createdAt,
        dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
        author: {
            '@type': 'Organization',
            name: 'Avira Hub',
            url: siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Avira Hub',
            url: siteUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/img/avira.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
    };

    if (blog.category) {
        (structuredData as any).articleSection = blog.category;
    }

    if (blog.tags && blog.tags.length > 0) {
        (structuredData as any).keywords = blog.tags.join(', ');
    }

    return structuredData;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    let blog;
    try {
        blog = await fetchBlogBySlug(params.slug);
    } catch (error) {
        // Log error but don't fail build - show not found page
        // With static export, this page will be generated with notFound() if API fails
        console.warn(`BlogPostPage: Failed to fetch blog ${params.slug}:`, error);
        notFound();
    }

    if (!blog) {
        notFound();
    }

    const structuredData = generateStructuredData(blog);
    const date = formatDate(blog.publishedAt || blog.createdAt);
    const readingTime = blog.readingTime ? `${blog.readingTime} min read` : '';
    const imageUrl = blog.featuredImage || 'https://picsum.photos/seed/blog/1200/600';

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-16">
                    <article className="py-16 sm:py-24 bg-background">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <header className="text-center mb-12">
                                    {blog.category && (
                                        <p className="text-sm text-primary font-semibold mb-2">{blog.category.toUpperCase()}</p>
                                    )}
                                    <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">{blog.title}</h1>
                                    <div className="mt-6 text-sm text-muted-foreground">
                                        {date && <span>{date}</span>}
                                        {date && readingTime && <span> &middot; </span>}
                                        {readingTime && <span>{readingTime}</span>}
                                    </div>
                                </header>

                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={blog.title}
                                        width={1200}
                                        height={600}
                                        className="rounded-lg shadow-lg w-full h-auto mb-12"
                                        priority
                                    />
                                )}

                                <div
                                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />

                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t">
                                        <div className="flex flex-wrap gap-2">
                                            {blog.tags.map((tag: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-12 pt-8 border-t text-center">
                                    <Link
                                        href="/blog"
                                        className="text-primary hover:underline inline-flex items-center"
                                    >
                                        ← Back to Blog
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
                <Footer />
            </div>
        </>
    );
}

