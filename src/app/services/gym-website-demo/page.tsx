
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Zap, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';


export const metadata: Metadata = {
    title: 'Vertex Fitness | Your Peak Fitness Destination',
    description: 'Welcome to Vertex Fitness. Join our community and achieve your fitness goals with state-of-the-art equipment, expert trainers, and dynamic classes.',
};

const schedule = {
    monday: [
        { time: '6:00 AM', class: 'Sunrise Yoga', trainer: 'Anika' },
        { time: '8:00 AM', class: 'HIIT Blast', trainer: 'Rohan' },
        { time: '5:00 PM', class: 'Strength & Conditioning', trainer: 'Vikram' },
        { time: '7:00 PM', class: 'Zumba Party', trainer: 'Priya' },
    ],
    tuesday: [
        { time: '7:00 AM', class: 'Powerlifting Club', trainer: 'Vikram' },
        { time: '9:00 AM', class: 'Spin Revolution', trainer: 'Priya' },
        { time: '6:00 PM', class: 'Core Fusion', trainer: 'Anika' },
        { time: '8:00 PM', class: 'HIIT Blast', trainer: 'Rohan' },
    ],
    wednesday: [
        { time: '6:00 AM', class: 'Sunrise Yoga', trainer: 'Anika' },
        { time: '8:00 AM', class: 'Strength & Conditioning', trainer: 'Vikram' },
        { time: '5:00 PM', class: 'Spin Revolution', trainer: 'Priya' },
        { time: '7:00 PM', class: 'Zumba Party', trainer: 'Rohan' },
    ],
}

const packages = [
    {
        name: "Flex",
        price: "₹1,500",
        period: "/month",
        description: "Perfect for flexible schedules and weekend warriors.",
        features: [
            "Access to all equipment",
            "Weekend group classes",
            "Locker Room Access",
            "Pay-as-you-go personal training",
        ]
    },
    {
        name: "Ascend",
        price: "₹2,500",
        period: "/month",
        description: "Our most popular plan for consistent progress.",
        features: [
            "Everything in Flex",
            "Unlimited group classes",
            "Monthly fitness assessment",
            "Nutritional guidance",
        ],
        popular: true,
    },
    {
        name: "Apex",
        price: "₹4,000",
        period: "/month",
        description: "The ultimate package for dedicated athletes.",
        features: [
            "Everything in Ascend",
            "4 Personal Training sessions/month",
            "Towel Service",
            "Guest Passes (2/month)",
        ]
    }
];

const trainers = [
    { name: 'Vikram Singh', role: 'Head Trainer & Powerlifting Coach', avatar: 'https://picsum.photos/seed/vikram/200', specialty: 'Strength' },
    { name: 'Priya Sharma', role: 'Spin & Zumba Instructor', avatar: 'https://picsum.photos/seed/priyagym/200', specialty: 'Cardio' },
    { name: 'Rohan Mehra', role: 'HIIT & Functional Fitness Expert', avatar: 'https://picsum.photos/seed/rohangym/200', specialty: 'HIIT' },
    { name: 'Anika Patel', role: 'Yoga & Flexibility Guru', avatar: 'https://picsum.photos/seed/anikagym/200', specialty: 'Flexibility' },
];

const whyUs = [
    { icon: <Dumbbell className="h-10 w-10 text-primary" />, title: 'State-of-the-Art Equipment', description: 'Top-of-the-line machines and free weights from leading brands to maximize your workout.' },
    { icon: <HeartPulse className="h-10 w-10 text-primary" />, title: 'Expert-Led Classes', description: 'Motivating and effective group classes designed to challenge you and deliver results.' },
    { icon: <Zap className="h-10 w-10 text-primary" />, title: 'Vibrant Community', description: 'Join a supportive and energetic community that will inspire you to push your limits.'},
    { icon: <ShieldCheck className="h-10 w-10 text-primary" />, title: 'Clean & Safe Environment', description: 'We prioritize your health with rigorous cleaning protocols and a well-maintained facility.'},
]

export default function GymDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxneW0lMjB3ZWJzaXRlfGVufDB8fHx8MTc2NTI4MDI1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gym interior with people working out"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter drop-shadow-lg animate-fade-in-up">REACH YOUR PEAK</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
                    Unleash your potential at Vertex Fitness. Your journey to strength, health, and confidence starts here.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild>
                        <Link href="#pricing">Join Now</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="why-us" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Vertex Fitness?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Four pillars of excellence for your fitness journey.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyUs.map((item, index) => (
                        <ScrollFadeIn key={item.title} delay={`${index*100}ms`}>
                            <div className="text-center p-6 bg-background rounded-lg hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 h-full">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground">{item.description}</p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="schedule" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Class Schedule</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Find your next challenge. Our weekly schedule is packed with variety.</p>
                </div>
                <Tabs defaultValue="monday" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="monday">Monday</TabsTrigger>
                        <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                        <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monday" className="animate-fade-in-up">
                       <ul className="mt-6 space-y-4">
                            {schedule.monday.map((item, index) => (
                                <li key={item.time+item.class} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card rounded-lg gap-2">
                                    <div>
                                        <p className="font-semibold">{item.class}</p>
                                        <p className="text-sm text-muted-foreground">with {item.trainer}</p>
                                    </div>
                                    <p className="font-bold text-primary text-sm sm:text-base">{item.time}</p>
                                </li>
                            ))}
                       </ul>
                    </TabsContent>
                    <TabsContent value="tuesday" className="animate-fade-in-up">
                        <ul className="mt-6 space-y-4">
                            {schedule.tuesday.map((item, index) => (
                                <li key={item.time+item.class} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card rounded-lg gap-2">
                                    <div>
                                        <p className="font-semibold">{item.class}</p>
                                        <p className="text-sm text-muted-foreground">with {item.trainer}</p>
                                    </div>
                                    <p className="font-bold text-primary text-sm sm:text-base">{item.time}</p>
                                </li>
                            ))}
                       </ul>
                    </TabsContent>
                    <TabsContent value="wednesday" className="animate-fade-in-up">
                        <ul className="mt-6 space-y-4">
                            {schedule.wednesday.map((item, index) => (
                                <li key={item.time+item.class} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card rounded-lg gap-2">
                                    <div>
                                        <p className="font-semibold">{item.class}</p>
                                        <p className="text-sm text-muted-foreground">with {item.trainer}</p>
                                    </div>
                                    <p className="font-bold text-primary text-sm sm:text-base">{item.time}</p>
                                </li>
                            ))}
                       </ul>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

         <section id="pricing" className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Membership Plans</h2>
                <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your ambition. All plans are billed monthly.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg, index) => (
                <ScrollFadeIn key={pkg.name} delay={`${index*100}ms`}>
                  <Card className={`flex flex-col bg-background border h-full hover:-translate-y-2 transition-transform duration-300 ${pkg.popular ? 'border-primary shadow-primary/20 shadow-2xl' : 'border-border'}`}>
                      <CardHeader>
                          {pkg.popular && <div className="text-right font-semibold text-primary">Most Popular</div>}
                          <CardTitle className="text-2xl sm:text-3xl">{pkg.name}</CardTitle>
                          <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <div className="mb-6">
                              <span className="text-4xl font-bold">{pkg.price}</span>
                              <span className="text-muted-foreground">{pkg.period}</span>
                          </div>
                          <ul className="space-y-4">
                              {pkg.features.map((feature, fIndex) => (
                                  <li key={feature} className="flex items-center gap-3">
                                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                      <span className="text-muted-foreground">{feature}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                      <CardFooter>
                          <Button asChild className="w-full group" variant={pkg.popular ? 'default' : 'outline'}>
                              <Link href="#">Choose Plan <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                          </Button>
                      </CardFooter>
                  </Card>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="trainers" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Meet Our Expert Trainers</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our certified trainers are here to guide and motivate you.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <ScrollFadeIn key={trainer.name} delay={`${index * 100}ms`} className="text-center flex flex-col items-center">
                            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4 border-4 border-primary">
                                <AvatarImage src={trainer.avatar} alt={`Avatar of ${trainer.name}`} />
                                <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg sm:text-xl">{trainer.name}</h3>
                            <p className="text-sm text-muted-foreground">{trainer.role}</p>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
