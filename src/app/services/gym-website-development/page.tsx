
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Calendar, CreditCard, Users, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Custom Gym Website Design to Boost Memberships | Avira Hub',
    description: 'Get a high-performance gym website with booking, schedules, and member portals. Our expert web design helps fitness studios attract and retain more clients in India.',
};

const features = [
    {
        icon: <Calendar className="h-8 w-8 text-primary" />,
        title: "Dynamic Class Schedules",
        description: "An easy-to-update, interactive schedule that lets members view classes, trainers, and availability in real-time."
    },
    {
        icon: <CreditCard className="h-8 w-8 text-primary" />,
        title: "Online Booking & Payments",
        description: "Securely accept payments for memberships, class packs, and personal training sessions directly on your website."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Member Portals",
        description: "Allow members to create accounts, manage their subscriptions, track their attendance, and book future classes."
    },
    {
        icon: <Dumbbell className="h-8 w-8 text-primary" />,
        title: "Trainer & Staff Profiles",
        description: "Showcase the expertise and personality of your team with professional profiles for each trainer and staff member."
    },
     {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "High-Performance & Speed",
        description: "A lightning-fast website that loads instantly, providing a smooth experience for users and boosting your SEO."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Mobile-First Design",
        description: "A flawless and intuitive experience whether your members are on a desktop, tablet, or booking a class on their phone."
    }
]

const faqs = [
    {
        question: "How much does a custom gym website cost?",
        answer: "Our custom gym website packages start from our 'Business' tier, but the final cost depends on the specific features you need, like complex booking integrations or member portals. We provide a detailed, transparent quote after our initial consultation."
    },
    {
        question: "How long does it take to build the website?",
        answer: "A typical gym website project takes 4-6 weeks from our discovery call to the final launch. This timeline allows for thorough design, development, and testing to ensure a high-quality, bug-free website."
    },
    {
        question: "Can you integrate my existing gym management software?",
        answer: "Absolutely! We have extensive experience integrating with popular gym management platforms like Mindbody, Acuity Scheduling, and many others. We'll ensure a seamless data flow between your website and your management system."
    },
    {
        question: "Will my website be optimized for search engines (SEO)?",
        answer: "Yes, every website we build is founded on a strong SEO strategy. We perform keyword research, optimize on-page elements, ensure fast load times, and structure your site to rank higher on Google for local searches."
    }
]

export default function GymWebsitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Custom Gym Website Design That Powers Growth</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Your website is your digital front door. We build high-energy, conversion-focused websites for gyms and fitness studios that attract new members and keep them engaged.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get Your Free Gym Website Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Turn Visitors into Loyal Members</h2>
                        <p className="text-muted-foreground">A generic website templates won't capture the unique energy of your fitness community. You need a powerful digital hub that simplifies operations and drives membership sales. That's what we build.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Increase monthly sign-ups with a clear user journey.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Automate class bookings and save administrative time.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build a strong online brand that stands out from the competition.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Rank higher on Google for local fitness searches.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/gymsite/600/400"
                            alt="A modern gym website design on a laptop screen, showing a class schedule."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="gym website"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Essential Features for Every Fitness Website</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We build websites with all the tools you need to manage and grow your business.</p>
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
                        <Link href="/services/gym-website-demo">View Gym Website Demo</Link>
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
