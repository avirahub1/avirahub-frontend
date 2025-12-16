
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import ScrollFadeIn from '@/components/scroll-fade-in';

export const metadata: Metadata = {
    title: 'The Daily Grind | Artisan Coffee & Fresh Bites',
    description: 'Welcome to The Daily Grind. Your local neighborhood cafe for artisan coffee, delicious pastries, and a cozy atmosphere.',
};

const menuItems = [
    { name: 'Espresso', description: 'A rich and aromatic shot of pure coffee.', price: '₹150' },
    { name: 'Cappuccino', description: 'Espresso with steamed milk foam.', price: '₹220' },
    { name: 'Cold Brew', description: 'Smooth, low-acid coffee steeped for 12 hours.', price: '₹250' },
    { name: 'Croissant', description: 'Buttery, flaky, and freshly baked.', price: '₹180' },
    { name: 'Avocado Toast', description: 'Sourdough toast with fresh avocado and chili flakes.', price: '₹350' },
    { name: 'Banana Bread', description: 'Moist and delicious, a perfect treat.', price: '₹200' },
];

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjYWZlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzY1NTgwMDMxfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Interior of The Daily Grind cafe' },
    { src: 'https://images.unsplash.com/photo-1507914464223-165ab03a3393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmb29kJTIwZ2FsbGVyeXxlbnwwfHx8fDE3NjU1ODAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'A spread of delicious food items' },
    { src: 'https://images.unsplash.com/photo-1511920183303-533e0d1d23b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsYXR0ZSUyMGFydHxlbnwwfHx8fDE3NjU1ODAwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Latte art in a coffee cup' },
];

export default function CafeDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYW1iaWFuY2V8ZW58MHx8fHwxNzY1NTc4ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cozy interior of The Daily Grind cafe"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight [text-shadow:0_4px_8px_rgba(0,0,0,0.6)] font-serif animate-fade-in-up">The Daily Grind</h1>
                <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-neutral-200 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-up [animation-delay:200ms]">
                    Your perfect escape for artisan coffee, fresh bites, and quiet moments.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild variant="outline">
                        <Link href="#menu">Explore Menu</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="about" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                     <h2 className="text-base font-semibold tracking-wider text-primary uppercase">Our Philosophy</h2>
                    <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Simple Things, Done Exceptionally Well</p>
                    <p className="mt-4 text-lg text-muted-foreground">
                        The Daily Grind was born from a simple love for coffee and community. We believe in the power of a perfect cup to start your day, spark a conversation, or offer a moment of peace. We source the finest beans and use local ingredients to bring you a menu that's both comforting and creative.
                    </p>
                </div>
            </div>
        </section>
        
        <section id="menu" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">From Our Kitchen</h2>
                    <p className="mt-4 text-lg text-muted-foreground">A curated selection of our most-loved coffees and bites.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {menuItems.map((item, index) => (
                        <ScrollFadeIn key={item.name} delay={`${index * 100}ms`}>
                            <Card className="bg-card border-border hover:-translate-y-1 transition-transform duration-300 h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-baseline">
                                        <span className="text-xl">{item.name}</span>
                                        <span className="text-primary text-lg">{item.price}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </ScrollFadeIn>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button>View Full Menu</Button>
                </div>
            </div>
        </section>

        <section id="gallery" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">A Glimpse Inside</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The atmosphere of your next favorite spot.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {galleryImages.map((img, index) => (
                        <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                             <Image 
                                src={img.src}
                                alt={img.alt}
                                width={index === 0 ? 800 : 400}
                                height={400}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="contact" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Visit Us</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We're looking forward to serving you. Find us in the heart of the city.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <ScrollFadeIn delay="100ms">
                        <div className="flex flex-col items-center p-6 bg-card rounded-lg h-full">
                            <Clock className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Hours</h3>
                            <p className="text-muted-foreground">Mon - Sat: 7am - 7pm</p>
                            <p className="text-muted-foreground">Sunday: 8am - 5pm</p>
                        </div>
                    </ScrollFadeIn>
                    <ScrollFadeIn delay="200ms">
                         <div className="flex flex-col items-center p-6 bg-card rounded-lg h-full">
                            <MapPin className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Location</h3>
                            <p className="text-muted-foreground">123 Cafe Lane,</p>
                            <p className="text-muted-foreground">Koramangala, Bangalore</p>
                        </div>
                    </ScrollFadeIn>
                    <ScrollFadeIn delay="300ms">
                         <div className="flex flex-col items-center p-6 bg-card rounded-lg h-full">
                            <Phone className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Contact</h3>
                            <p className="text-muted-foreground">(+91) 98765 43210</p>
                            <p className="text-muted-foreground">hello@dailygrind.com</p>
                        </div>
                    </ScrollFadeIn>
                </div>

                <div className="mt-12">
                     <Button size="lg" asChild>
                        <Link href="#">Book a Table</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
