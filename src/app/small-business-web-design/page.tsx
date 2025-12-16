
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, DollarSign, Smartphone, Rocket, Brush, Clock } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Affordable Website Developer for Small & Local Business | Avira Hub',
    description: 'Need a website developer for your small business? Avira Hub is an affordable web development company building professional local business websites that grow your brand.',
};

const features = [
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Affordable Packages",
        description: "Transparent, budget-friendly pricing designed to provide maximum value for small businesses and startups."
    },
    {
        icon: <Brush className="h-8 w-8 text-primary" />,
        title: "Professional Design",
        description: "A high-quality, custom design that builds credibility and makes your business look its best online."
    },
    {
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        title: "Mobile-First Approach",
        description: "A perfect experience on smartphones, where most of your local customers will find you."
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary" />,
        title: "Local SEO Ready",
        description: "We build your site with SEO fundamentals in place to help you get found on Google by local customers."
    },
     {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: "Fast Turnaround",
        description: "Our streamlined process gets your professional website live quickly, so you can start attracting customers sooner."
    },
    {
        icon: <Check className="h-8 w-8 text-primary" />,
        title: "Easy to Manage",
        description: "We provide an optional, simple CMS that allows you to update your own content without any technical skills."
    }
]

const faqs = [
    {
        question: "Why does my local business need a website?",
        answer: "A website is your digital storefront, open 24/7. It builds credibility, helps you get found on Google by local customers, showcases your products or services, and provides a central point of contact. Without one, you're invisible to a large portion of potential customers."
    },
    {
        question: "Is it expensive to get a website for a small business?",
        answer: "It doesn't have to be. Our 'Starter' package is specifically designed for small businesses and is a highly affordable, one-time investment. It covers everything you need to get a professional online presence."
    },
    {
        question: "How long will it take to get my website live?",
        answer: "For our small business packages, we typically have a fast turnaround time of 2-4 weeks from start to finish. We understand you need to get online quickly."
    },
    {
        question: "Will I be able to make updates to the website myself?",
        answer: "Yes. While we can handle updates for you, we can also build your site on a simple Content Management System (CMS) that allows you to easily change text, update images, and post to a blog."
    }
]

export default function SmallBusinessWebDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Local Business Website Design Services</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are an affordable web development company that gets your business a professional, high-quality website—without breaking the bank.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Look Professional. Attract More Customers. Grow Your Business.</h2>
                        <p className="text-muted-foreground">You're an expert at what you do, but maybe not at web design. A DIY or outdated website can make your business look unprofessional and cost you customers. We create affordable, beautiful websites that build trust and drive sales.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build instant credibility with a stunning design.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Attract local customers searching on Google.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Make it easy for customers to contact you.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Compete with larger businesses in your industry.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/smallbiz/600/400"
                            alt="A small business owner proudly working on their new website on a laptop."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="small business website"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything Your Small Business Needs</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Our packages are packed with features to ensure your success.</p>
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
