
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Zap, HeartPulse, Wind, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';


export const metadata: Metadata = {
    title: 'Momentum Fitness | High-Intensity Training Center',
    description: 'Welcome to Momentum Fitness. We specialize in CrossFit and functional training to help you build unstoppable momentum.',
};

const schedule = {
    monday: [
        { time: '6:30 AM', class: 'CrossFit WOD', trainer: 'Arjun' },
        { time: '9:00 AM', class: 'Olympic Lifting', trainer: 'Sanya' },
        { time: '5:30 PM', class: 'MetCon Mayhem', trainer: 'Leo' },
        { time: '7:00 PM', class: 'Gymnastics Skills', trainer: 'Isha' },
    ],
    tuesday: [
        { time: '7:30 AM', class: 'Endurance WOD', trainer: 'Leo' },
        { time: '10:00 AM', class: 'Mobility & Flow', trainer: 'Isha' },
        { time: '6:30 PM', class: 'CrossFit WOD', trainer: 'Arjun' },
        { time: '8:00 PM', class: 'Olympic Lifting', trainer: 'Sanya' },
    ],
    wednesday: [
        { time: '6:30 AM', class: 'MetCon Mayhem', trainer: 'Arjun' },
        { time: '9:00 AM', class: 'Gymnastics Skills', trainer: 'Isha' },
        { time: '5:30 PM', class: 'CrossFit WOD', trainer: 'Leo' },
        { time: '7:00 PM', class: 'Endurance WOD', trainer: 'Sanya' },
    ],
}

const packages = [
    {
        name: "Starter",
        price: "₹3,000",
        period: "/month",
        description: "Great for beginners and those new to CrossFit.",
        features: [
            "3 Classes per week",
            "Access to Open Gym",
            "Introductory Course",
            "Basic Progress Tracking",
        ]
    },
    {
        name: "Unlimited",
        price: "₹4,500",
        period: "/month",
        description: "The best value for dedicated members.",
        features: [
            "Unlimited Classes",
            "Access to all specialty classes",
            "Advanced Progress Tracking",
            "Nutritional Seminars",
        ],
        popular: true,
    },
    {
        name: "Drop-In",
        price: "₹700",
        period: "/class",
        description: "Perfect for visiting athletes or trying a class.",
        features: [
            "Access to one CrossFit WOD",
            "Full use of facility for the day",
            "Expert coaching",
            "Community access",
        ]
    }
];

const trainers = [
    { name: 'Arjun Verma', role: 'Head Coach & CrossFit L2', avatar: 'https://picsum.photos/seed/arjun/200' },
    { name: 'Sanya Reddy', role: 'Weightlifting Specialist', avatar: 'https://picsum.photos/seed/sanya/200' },
    { name: 'Leo Desai', role: 'MetCon & Endurance Coach', avatar: 'https://picsum.photos/seed/leo/200' },
    { name: 'Isha Nair', role: 'Gymnastics & Mobility Pro', avatar: 'https://picsum.photos/seed/isha/200' },
];

const whyUs = [
    { icon: <Dumbbell className="h-10 w-10 text-primary" />, title: 'Elite Coaching Staff', description: 'Certified and experienced coaches dedicated to your form, safety, and progress.' },
    { icon: <HeartPulse className="h-10 w-10 text-primary" />, title: 'Data-Driven Results', description: 'Track your PRs, workout history, and progress with our integrated fitness tracking software.' },
    { icon: <Zap className="h-10 w-10 text-primary" />, title: 'Unbeatable Community', description: 'Join a family of motivated individuals who will cheer you on every step of the way.'},
    { icon: <Wind className="h-10 w-10 text-primary" />, title: 'Top-Tier Facility', description: 'A spacious, well-equipped box with everything you need for high-intensity training.'},
]

export default function GymDemoPage2() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
                src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxneW0lMjBlcXVpcG1lbnR8ZW58MHx8fHwxNzY1MjkxNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="CrossFit gym with equipment"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter drop-shadow-lg animate-fade-in-up">BUILD MOMENTUM</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
                    Functional fitness for unstoppable results. Forge your strength, endurance, and willpower with us.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild>
                        <Link href="#pricing">Start Training</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="why-us" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why Momentum Fitness?</h2>
                     <p className="mt-4 text-lg text-muted-foreground">The ultimate environment for functional fitness.</p>
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
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Weekly WODs</h2>
                    <p className="mt-4 text-lg text-muted-foreground">This week's Workout of the Day schedule. Are you ready?</p>
                </div>
                <Tabs defaultValue="monday" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="monday">Monday</TabsTrigger>
                        <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                        <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monday" className="animate-fade-in-up">
                       <ul className="mt-6 space-y-4">
                            {schedule.monday.map(item => (
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
                            {schedule.tuesday.map(item => (
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
                            {schedule.wednesday.map(item => (
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
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Join The Community</h2>
                <p className="mt-4 text-lg text-muted-foreground">Find the perfect membership to start building momentum.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg, index) => (
                <ScrollFadeIn key={pkg.name} delay={`${index*100}ms`}>
                  <Card className={`flex flex-col bg-background border h-full hover:-translate-y-2 transition-transform duration-300 ${pkg.popular ? 'border-primary shadow-primary/20 shadow-2xl' : 'border-border'}`}>
                      <CardHeader>
                          {pkg.popular && <div className="text-right font-semibold text-primary">Best Value</div>}
                          <CardTitle className="text-2xl sm:text-3xl">{pkg.name}</CardTitle>
                          <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <div className="mb-6">
                              <span className="text-4xl font-bold">{pkg.price}</span>
                              <span className="text-muted-foreground">{pkg.period}</span>
                          </div>
                          <ul className="space-y-4">
                              {pkg.features.map(feature => (
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
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Coaching Team</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Experts in strength, conditioning, and motivation.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                         <ScrollFadeIn key={trainer.name} delay={`${index*100}ms`} className="text-center flex flex-col items-center">
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
