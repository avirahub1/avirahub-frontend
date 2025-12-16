
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Scissors, Calendar, ShoppingBag, Gift, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Salon & Spa Website Design with Online Booking | Avira Hub',
    description: 'Elevate your brand with an elegant salon website. We integrate online appointment booking, service menus, and galleries to attract more clients to your spa or salon.',
};

const features = [
    {
        icon: <Calendar className="h-8 w-8 text-primary" />,
        title: "24/7 Appointment Booking",
        description: "Allow clients to book appointments anytime, day or night, with a real-time scheduling system that syncs with your calendar."
    },
    {
        icon: <Scissors className="h-8 w-8 text-primary" />,
        title: "Service & Stylist Menus",
        description: "Beautifully showcase your services, prices, and staff. Let clients choose their preferred service and stylist when booking."
    },
    {
        icon: <ShoppingBag className="h-8 w-8 text-primary" />,
        title: "E-commerce for Products",
        description: "Sell your retail products directly from your website with a fully integrated online shop."
    },
    {
        icon: <Gift className="h-8 w-8 text-primary" />,
        title: "Gift Card Sales",
        description: "Boost your revenue by allowing customers to purchase and send digital gift cards for your services."
    },
     {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Elegant, Fast Design",
        description: "A visually stunning website that reflects your brand's luxury and loads instantly to impress potential clients."
    },
    {
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        title: "Perfect on Any Device",
        description: "A flawless and intuitive mobile experience, making it easy for clients to book on the go."
    }
]

const faqs = [
    {
        question: "Can the system handle staff-specific bookings and different service durations?",
        answer: "Yes, absolutely. The booking systems we implement allow you to assign specific services to specific staff members, each with their own availability and service durations. It's designed to handle the real-world complexity of running a salon or spa."
    },
    {
        question: "How does the online booking system prevent double bookings?",
        answer: "The system works in real-time. Once a time slot is booked, it is instantly marked as unavailable across all platforms, preventing any chance of double booking. It syncs with your main business calendar."
    },
    {
        question: "Can we take deposits for appointments to reduce no-shows?",
        answer: "Yes. We can configure the booking system to require a partial or full pre-payment to secure an appointment. This is a proven strategy to dramatically reduce no-shows and protect your revenue."
    },
    {
        question: "Will I be able to update my services and prices myself?",
        answer: "Of course. We provide a simple-to-use backend dashboard where you can easily add new services, update prices, add new staff members, and manage your photo gallery without any technical skills."
    }
]

export default function SalonWebsitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Elegant Salon Website Design to Fill Your Calendar</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Your salon is a sanctuary of style. We design beautiful, functional websites for salons and spas that streamline bookings and elevate your brand.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Salon Website Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">From Online Lookers to Loyal Clients</h2>
                        <p className="text-muted-foreground">A generic website can't capture the essence of your brand. You need a sophisticated digital presence that simplifies appointment booking and makes a lasting first impression on potential clients.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Reduce phone calls and administrative work with online booking.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Attract high-value clients looking for premium services.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Showcase your work and stylists with beautiful galleries.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Increase your revenue with online product and gift card sales.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/salon/600/400"
                            alt="An elegant salon website on a laptop, showing an appointment booking interface."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="salon website"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Features That Make Your Salon Shine Online</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We build your website with the tools you need to manage and grow your business effortlessly.</p>
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
                        <Link href="/services/salon-website-demo">View Salon Website Demo</Link>
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
