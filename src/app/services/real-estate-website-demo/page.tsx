
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, Car, MapPin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';


export const metadata: Metadata = {
    title: 'Apex Properties | Luxury Real Estate',
    description: 'Welcome to Apex Properties. Discover luxury homes, apartments, and estates with our expert real estate agents.',
};

const properties = [
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3VzZXxlbnwwfHx8fDE3NjU1ODU3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        name: 'Modern Villa in Jubilee Hills',
        price: '₹12.5 Cr',
        address: 'Jubilee Hills, Hyderabad',
        beds: 5,
        baths: 6,
        parking: 3,
    },
    {
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxob3VzZXxlbnwwfHx8fDE3NjU1ODU3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        name: 'Penthouse with Ocean View',
        price: '₹18 Cr',
        address: 'Bandra West, Mumbai',
        beds: 4,
        baths: 5,
        parking: 2,
    },
    {
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3VzZXxlbnwwfHx8fDE3NjU1ODU3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        name: 'Spacious Garden Bungalow',
        price: '₹9.8 Cr',
        address: 'Indiranagar, Bangalore',
        beds: 4,
        baths: 4,
        parking: 2,
    },
]

const agents = [
    { name: 'Sameer Sharma', role: 'Principal Agent', avatar: 'https://picsum.photos/seed/sameer/200' },
    { name: 'Kavita Singh', role: 'Luxury Home Specialist', avatar: 'https://picsum.photos/seed/kavita/200' },
    { name: 'Rajesh Kumar', role: 'Commercial Properties', avatar: 'https://picsum.photos/seed/rajesh/200' },
];

export default function RealEstateDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-start text-left text-white">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3VzZXxlbnwwfHx8fDE3NjU1ODU3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luxurious modern home"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter drop-shadow-md max-w-2xl [text-shadow:0_4px_8px_rgba(0,0,0,0.6)] animate-fade-in-up">Find Your Next Chapter.</h1>
                <p className="mt-4 max-w-xl text-lg md:text-xl text-neutral-200 drop-shadow-md [text-shadow:0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-up [animation-delay:200ms]">
                    Specializing in luxury residential and commercial properties in India's most sought-after locations.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild>
                        <Link href="#listings">View Listings</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="listings" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Properties</h2>
                    <p className="mt-4 text-lg text-muted-foreground">A curated selection of our finest available properties.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((prop, index) => (
                       <ScrollFadeIn key={prop.name} delay={`${index*100}ms`}>
                           <Card className="bg-background border-border overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                               <CardContent className="p-0 relative">
                                    <Image
                                        src={prop.image}
                                        alt={prop.name}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full h-[250px] group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                        {prop.price}
                                    </div>
                               </CardContent>
                               <CardHeader>
                                <CardTitle className="text-xl">{prop.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1"><MapPin className="h-4 w-4" />{prop.address}</CardDescription>
                               </CardHeader>
                                <CardContent className="flex-grow flex items-center justify-between text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-primary" /> {prop.beds} Beds</span>
                                    <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-primary" /> {prop.baths} Baths</span>
                                    <span className="flex items-center gap-2"><Car className="h-5 w-5 text-primary" /> {prop.parking} Parking</span>
                                </CardContent>
                               <CardFooter>
                                    <Button asChild variant="outline" className="w-full group">
                                        <Link href="#">View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                                    </Button>
                               </CardFooter>
                           </Card>
                       </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="agents" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Expert Agents</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The most trusted names in luxury real estate.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {agents.map((agent, index) => (
                        <ScrollFadeIn key={agent.name} delay={`${index*100}ms`} className="text-center flex flex-col items-center">
                            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4 border-4 border-primary">
                                <AvatarImage src={agent.avatar} alt={`Avatar of ${agent.name}`} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg sm:text-xl">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">{agent.role}</p>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="contact" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to Begin Your Journey?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Whether you are buying or selling, our team is here to guide you every step of the way.
                    </p>
                </div>
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                     <ScrollFadeIn delay="100ms">
                        <div className="flex flex-col items-center p-6 bg-background rounded-lg h-full">
                            <MapPin className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Visit Our Office</h3>
                            <p className="text-muted-foreground">789 Realty Plaza, DLF Cyber City</p>
                            <p className="text-muted-foreground">Gurugram, India</p>
                        </div>
                    </ScrollFadeIn>
                     <ScrollFadeIn delay="200ms">
                        <div className="flex flex-col items-center p-6 bg-background rounded-lg h-full">
                            <Mail className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-semibold text-lg">Contact Us</h3>
                            <p className="text-muted-foreground">(+91) 99887 76655</p>
                            <p className="text-muted-foreground">contact@apexproperties.in</p>
                        </div>
                    </ScrollFadeIn>
                </div>
                <div className="mt-12">
                     <Button size="lg" asChild>
                        <Link href="#">Schedule a Consultation</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
