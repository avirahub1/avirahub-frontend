
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scissors, Sparkles, Droplets, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';


export const metadata: Metadata = {
    title: 'Elegance Salon & Spa | Luxury Beauty & Wellness',
    description: 'Discover Elegance, where luxury meets beauty. Book your appointment for hair, skin, and spa treatments with our expert stylists.',
};

const services = [
    {
        icon: <Scissors className="h-8 w-8 text-primary" />,
        name: "Precision Haircuts",
        description: "Expert cuts for men and women, tailored to your style and face shape.",
        price: "Starts at ₹1,200"
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        name: "Creative Coloring",
        description: "From classic highlights to modern balayage, using premium products.",
        price: "Starts at ₹3,500"
    },
    {
        icon: <Droplets className="h-8 w-8 text-primary" />,
        name: "Rejuvenating Facials",
        description: "Customized facial treatments to cleanse, hydrate, and revitalize your skin.",
        price: "Starts at ₹2,500"
    }
];

const stylists = [
    { name: 'Aditi Rao', role: 'Artistic Director', avatar: 'https://picsum.photos/seed/aditi/200' },
    { name: 'Rohan Kapoor', role: 'Master Colorist', avatar: 'https://picsum.photos/seed/rohansalon/200' },
    { name: 'Mira Desai', role: 'Lead Esthetician', avatar: 'https://picsum.photos/seed/mira/200' },
];

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1596703223322-6f4233036b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxoYWlyJTIwc2Fsb258ZW58MHx8fHwxNzY1NTg0MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Chic hairstyle' },
    { src: 'https://images.unsplash.com/photo-1632345031435-8727f6197b53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzcCUyMHRyZWF0bWVudHxlbnwwfHx8fDE3NjU1ODQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Relaxing spa treatment' },
    { src: 'https://picsum.photos/seed/salon-page/800/800', alt: 'Elegant salon interior' },
];

export default function SalonDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
                src="https://picsum.photos/seed/salon-hero/1920/1080"
                alt="Luxurious and modern salon interior"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight drop-shadow-md font-serif [text-shadow:0_4px_8px_rgba(0,0,0,0.6)] animate-fade-in-up">Elegance Salon &amp; Spa</h1>
                <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-up [animation-delay:200ms]">
                    Your sanctuary for beauty, wellness, and rejuvenation.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild>
                        <Link href="#contact">Book an Appointment</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="services" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Signature Services</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Indulge in treatments designed to refresh and inspire.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <ScrollFadeIn key={service.name} delay={`${index*100}ms`}>
                            <Card className="bg-background border-border text-center p-6 sm:p-8 hover:-translate-y-2 transition-transform duration-300 hover:shadow-primary/10 h-full">
                                <div className="flex justify-center mb-4">
                                        {service.icon}
                                    </div>
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl">{service.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 mt-2">
                                    <p className="text-muted-foreground">{service.description}</p>
                                    <p className="mt-4 font-semibold text-primary">{service.price}</p>
                                </CardContent>
                            </Card>
                        </ScrollFadeIn>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button variant="outline">View All Services</Button>
                </div>
            </div>
        </section>

        <section id="stylists" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Meet Our Artists</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The talent behind the transformations.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {stylists.map((stylist, index) => (
                        <ScrollFadeIn key={stylist.name} delay={`${index*100}ms`} className="text-center flex flex-col items-center">
                            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4 border-4 border-primary">
                                <AvatarImage src={stylist.avatar} alt={`Avatar of ${stylist.name}`} />
                                <AvatarFallback>{stylist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg sm:text-xl">{stylist.name}</h3>
                            <p className="text-sm text-muted-foreground">{stylist.role}</p>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="gallery" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The Elegance Experience</h2>
                    <p className="mt-4 text-lg text-muted-foreground">A space designed for your ultimate comfort and luxury.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {galleryImages.map((img, index) => (
                        <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${index === 2 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                             <Image 
                                src={img.src}
                                alt={img.alt}
                                width={index === 2 ? 800 : 400}
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
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Book Your Escape</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Ready to be pampered? Contact us to schedule your appointment.
                    </p>
                </div>
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                     <ScrollFadeIn delay="100ms">
                        <div className="flex flex-col items-center p-6 bg-card rounded-lg h-full">
                            <MapPin className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Our Location</h3>
                            <p className="text-muted-foreground">456 Style Street, Indiranagar</p>
                            <p className="text-muted-foreground">Bangalore, India</p>
                        </div>
                     </ScrollFadeIn>
                     <ScrollFadeIn delay="200ms">
                         <div className="flex flex-col items-center p-6 bg-card rounded-lg h-full">
                            <Phone className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Contact Us</h3>
                            <p className="text-muted-foreground">(+91) 91234 56789</p>
                            <p className="text-muted-foreground">bookings@elegancespa.in</p>
                        </div>
                     </ScrollFadeIn>
                </div>
                <div className="mt-12">
                     <Button size="lg" asChild>
                        <Link href="#">Book Online Now</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
