
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Home, Search, DollarSign, Camera, Handshake, Zap } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Real Estate Website Development with IDX/MLS | Avira Hub',
    description: 'Generate more leads with a professional real estate website. We build IDX/MLS integrated sites for agents and agencies with property listings and virtual tours.',
};

const features = [
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: "Advanced Property Search",
        description: "Powerful search filters (location, price, size, amenities) to help clients find their dream property quickly."
    },
    {
        icon: <Home className="h-8 w-8 text-primary" />,
        title: "IDX/MLS Integration",
        description: "Automatically sync and display the latest property listings from your MLS feed directly on your website."
    },
    {
        icon: <Camera className="h-8 w-8 text-primary" />,
        title: "High-Quality Galleries & Tours",
        description: "Showcase properties with stunning photo galleries, video walkthroughs, and immersive 3D virtual tours."
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Mortgage Calculator",
        description: "An integrated tool to help potential buyers estimate their monthly payments and affordability."
    },
     {
        icon: <Handshake className="h-8 w-8 text-primary" />,
        title: "Lead Generation Forms",
        description: "Strategically placed contact forms, showing requests, and newsletter sign-ups to capture every lead."
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Fast & Mobile-Ready",
        description: "A lightning-fast site that provides a perfect experience for clients browsing on their phones or on a desktop."
    }
]

const faqs = [
    {
        question: "What is IDX/MLS integration?",
        answer: "IDX (Internet Data Exchange) is the system that allows real estate agents to display MLS (Multiple Listing Service) property listings on their own websites. We handle the complex process of integrating this feed so your site always shows up-to-date listings."
    },
    {
        question: "How do you help with lead generation?",
        answer: "We design every real estate website with lead capture as a primary goal. This includes prominent calls-to-action, easy-to-use contact forms, 'Schedule a Viewing' buttons on every listing, and options for users to save searches and favorite properties."
    },
    {
        question: "Can I update property listings myself?",
        answer: "If you're using an IDX/MLS feed, the listings update automatically. For your own exclusive listings, we provide you with a simple-to-use Content Management System (CMS) so you can add, update, or remove properties with ease."
    },
    {
        question: "How do you optimize my website for local SEO?",
        answer: "We focus on local SEO by creating community-specific content, optimizing your Google Business Profile, ensuring your contact information is consistent everywhere, and targeting keywords that buyers in your specific city or neighborhood are searching for."
    }
]

export default function RealEstateWebsitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Lead-Generating Real Estate Website Development</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Your website is your 24/7 agent. We build powerful, feature-rich websites for real estate professionals that capture leads and close deals.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Agent Website Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Turn Clicks into Closings</h2>
                        <p className="text-muted-foreground">A basic website is just an online brochure. You need a hard-working digital platform that attracts motivated buyers, showcases your listings beautifully, and establishes you as the go-to agent in your area.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Capture more buyer and seller leads.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Display thousands of listings automatically.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build credibility and authority in your local market.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Rank higher on Google for real estate searches in your city.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/realestate/600/400"
                            alt="A professional real estate website on a tablet showing property listings."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="real estate website"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Must-Have Features for Real Estate Websites</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We build websites with the essential tools to grow your real estate business.</p>
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
                <div className="mt-16 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/services/real-estate-website-demo">View Real Estate Website Demo</Link>
                    </Button>
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
