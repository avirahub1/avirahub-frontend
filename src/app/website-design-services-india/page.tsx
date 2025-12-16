
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Code, Search, Smartphone, Palette, Zap, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Web & Ecommerce Website Development Services in India | Avira Hub',
    description: 'Looking for web design services in India? Avira Hub offers custom, responsive, and SEO-friendly websites, including e-commerce solutions. Get a world-class site that drives business growth.',
};

const features = [
    {
        icon: <Palette className="h-8 w-8 text-primary" />,
        title: "Custom UI/UX Design",
        description: "Bespoke designs that reflect your brand's unique identity and provide an exceptional user experience."
    },
     {
        icon: <ShoppingCart className="h-8 w-8 text-primary" />,
        title: "E-commerce Development",
        description: "Robust online stores with secure payment gateways, product management, and a seamless checkout experience."
    },
    {
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        title: "Fully Responsive",
        description: "Flawless performance and viewing on all devices, from desktops to smartphones."
    },
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: "SEO-Optimized",
        description: "Built with search engine best practices to help you rank higher and attract more organic traffic."
    },
     {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "High Performance",
        description: "Optimized for speed to provide a lightning-fast user experience and improve conversion rates."
    },
    {
        icon: <Code className="h-8 w-8 text-primary" />,
        title: "CMS Integration",
        description: "Easily manage and update your website content with a user-friendly Content Management System."
    }
]

const faqs = [
    {
        question: "What is the cost of website design in India?",
        answer: "The cost varies depending on the project's complexity. A simple informational site can start from ₹25,000, while a complex e-commerce or custom platform can be ₹1,00,000 or more. We provide detailed, transparent quotes after understanding your specific requirements."
    },
    {
        question: "How long does it take to design and develop a website?",
        answer: "A standard website typically takes 4-8 weeks from conception to launch. This includes discovery, design, development, and revision phases. More complex projects will have a longer timeline, which we outline in our project proposal."
    },
    {
        question: "Do you provide website maintenance services?",
        answer: "Yes, we offer comprehensive maintenance packages to ensure your website remains updated, secure, and performs optimally. This includes software updates, security scans, and content updates."
    },
    {
        question: "Will my website work on mobile phones?",
        answer: "Absolutely. We follow a mobile-first design approach, meaning we design for the smallest screen first and then scale up. This ensures your website looks and functions perfectly on all devices."
    }
]

export default function WebDesignServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Leading Web Design Services in India</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              We craft beautiful, high-performance websites that captivate your audience, drive engagement, and deliver tangible business results.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Website Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Your Website is Your Most Valuable Digital Asset</h2>
                        <p className="text-muted-foreground">In today's digital-first world, your website is more than just an online brochure—it's your 24/7 salesperson, your brand storyteller, and your primary tool for lead generation. An outdated, slow, or non-responsive site can cost you customers and credibility.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Attract and convert your target audience.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build a strong, professional brand image.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Increase leads, sales, and revenue.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Stand out from the competition in the Indian market.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/webdesign/600/400"
                            alt="A collage of modern website designs on different devices."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="website design collage"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Web Design & Development Process</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We blend strategy, creativity, and technology to deliver excellence.</p>
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
