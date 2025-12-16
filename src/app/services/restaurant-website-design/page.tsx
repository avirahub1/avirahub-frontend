
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Utensils, BookMarked, ShoppingCart, Smartphone, Image as ImageIcon, Zap } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Restaurant Website Design with Online Ordering | Avira Hub',
    description: 'Attract more diners with a stunning restaurant website. We build sites with online menus, table reservations, and food ordering systems for cafes and restaurants.',
};

const features = [
    {
        icon: <Utensils className="h-8 w-8 text-primary" />,
        title: "Dynamic Digital Menu",
        description: "A beautiful, easy-to-navigate online menu that you can update instantly. Highlight specials and bestsellers with ease."
    },
    {
        icon: <BookMarked className="h-8 w-8 text-primary" />,
        title: "Table Reservation System",
        description: "Integrate a seamless booking system that lets customers reserve a table directly from your website, reducing no-shows."
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-primary" />,
        title: "Online Ordering Integration",
        description: "Enable direct-to-kitchen online ordering for pickup or delivery, integrated with top payment gateways."
    },
    {
        icon: <ImageIcon className="h-8 w-8 text-primary" />,
        title: "Mouth-Watering Gallery",
        description: "Showcase your dishes, ambiance, and events with a stunning, high-resolution photo and video gallery."
    },
     {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Blazing Fast & SEO Ready",
        description: "A super-fast website optimized to rank on Google for 'restaurants near me' and other local searches."
    },
    {
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        title: "Perfect on Mobile",
        description: "A flawless mobile experience, because most of your customers will find you on their phone."
    }
]

const faqs = [
    {
        question: "Can you integrate with Zomato or Swiggy?",
        answer: "While we can link to your profiles on those platforms, our primary goal is to build your own online ordering system. This allows you to save on commissions and build a direct relationship with your customers, capturing their data for your own marketing."
    },
    {
        question: "How do I update my menu?",
        answer: "We provide you with a very simple Content Management System (CMS) that makes updating your menu as easy as typing an email. You can add items, change prices, and mark things as 'sold out' in real-time."
    },
    {
        question: "Can the website handle reservations for different times and party sizes?",
        answer: "Yes. The reservation systems we integrate are highly flexible, allowing you to set availability, manage table sizes, and even accept pre-payments or deposits for large bookings to reduce no-shows."
    },
    {
        question: "How will a new website help my restaurant get more customers?",
        answer: "A professional, SEO-optimized website will rank higher on Google, making you more visible. A beautiful design with great food photography will entice visitors, and easy online ordering and reservations will convert that interest into actual revenue."
    }
]

export default function RestaurantWebsitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Restaurant Website Design That Delights Diners</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Your food is a work of art. Your website should be too. We create mouth-watering websites for restaurants and cafes that drive reservations and online orders.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Restaurant Website Quote</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Convert Hungry Visitors into Happy Customers</h2>
                        <p className="text-muted-foreground">In a competitive market, a simple website isn't enough. You need a digital storefront that makes it effortless for customers to explore your menu, book a table, or order their favorite meal online.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Increase direct online orders and save on commissions.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Fill more tables with a seamless reservation system.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Attract new customers searching for dining options online.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build a strong brand that keeps customers coming back.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/restaurant/600/400"
                            alt="A stylish restaurant website showing a food menu on a laptop."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="restaurant website"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Key Ingredients for a Successful Restaurant Website</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We blend the perfect features to serve your business needs.</p>
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
                        <Link href="/services/restaurant-website-demo">View Restaurant Website Demo</Link>
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
