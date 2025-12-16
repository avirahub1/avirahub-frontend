
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Target, Link2, FileText, LineChart, Building } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Expert SEO Services for Small Business in India | Avira Hub',
    description: 'Boost your organic traffic with the leading company for SEO services in India, specializing in small businesses. Avira Hub offers expert SEO strategies to help you rank higher.',
};

const features = [
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: "Keyword Research & Strategy",
        description: "We identify high-value keywords that your target customers in India are searching for to drive relevant traffic."
    },
    {
        icon: <FileText className="h-8 w-8 text-primary" />,
        title: "On-Page & Content SEO",
        description: "Optimizing your content, meta tags, and site structure to be perfectly aligned with search engine algorithms."
    },
    {
        icon: <Link2 className="h-8 w-8 text-primary" />,
        title: "Quality Link Building",
        description: "Building high-authority backlinks from reputable Indian and global sites to boost your domain authority."
    },
    {
        icon: <Check className="h-8 w-8 text-primary" />,
        title: "Technical SEO Audit",
        description: "Fixing technical issues like site speed, crawl errors, and schema markup that hold your site back."
    },
     {
        icon: <Building className="h-8 w-8 text-primary" />,
        title: "Local SEO for India",
        description: "Dominating local search results in your city with Google Business Profile optimization and local citations."
    },
    {
        icon: <LineChart className="h-8 w-8 text-primary" />,
        title: "Transparent Reporting",
        description: "Receive clear, detailed reports on your keyword rankings, traffic, and the results of our efforts."
    }
]

const faqs = [
    {
        question: "How long does it take to see results from SEO for a small business?",
        answer: "SEO is a long-term strategy. While some improvements can be seen in as little as 4-6 weeks, it typically takes 4-6 months to see significant and stable improvements in rankings and organic traffic, especially for small businesses in competitive niches."
    },
    {
        question: "Is SEO a one-time thing?",
        answer: "No, SEO is an ongoing process. Search engines constantly update their algorithms, and your competitors are always working to outrank you. Consistent effort is required to maintain and improve your rankings over time."
    },
    {
        question: "How much do SEO services cost in India for a small business?",
        answer: "Our SEO packages are customized to your business goals and competition level. Prices can range from ₹15,000 to ₹50,000+ per month. We focus on delivering a strong return on your investment, making it affordable for small businesses."
    },
    {
        question: "Do you guarantee a #1 ranking on Google?",
        answer: "No reputable SEO agency can guarantee a #1 ranking, as Google's algorithm is complex and constantly changing. We do, however, guarantee that we will use proven, ethical strategies to significantly improve your visibility and rankings."
    }
]

export default function SeoServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Result-Driven SEO Services for Small Business in India</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Stop waiting for customers. Let them find you. We help you rank higher on Google, attract more organic traffic, and grow your business.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free SEO Audit</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Are You Invisible to Your Potential Customers?</h2>
                        <p className="text-muted-foreground">If your website isn't on the first page of Google, you're losing valuable business to your competitors. 90% of users never go past the first page. We use proven, data-driven strategies to put your business in front of motivated buyers.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Increase your website's visibility on search engines.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Drive high-quality, organic traffic to your site.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Generate more leads and sales without paying for ads.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build long-term authority and trust in your niche.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/seo/600/400"
                            alt="A graph showing upward trending SEO results on a computer screen."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="seo results graph"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Comprehensive SEO Services</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A 360-degree approach to dominating the search results.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="bg-card border-border hover:-translate-y-2 transition-transform duration-300">
                           <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                {feature.icon}
                                <div className="flex-1">
                                    <CardTitle>{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map(faq => (
                            <AccordionItem key={faq.question} value={faq.question}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
