
import { Card } from '@/components/ui/card';
import { Utensils, Dumbbell, Sprout, Home, GraduationCap } from 'lucide-react';
import ScrollFadeIn from '@/components/scroll-fade-in';
import Link from 'next/link';

const industries = [
  {
    icon: <Dumbbell className="h-10 w-10 text-primary" />,
    title: 'Gym & Fitness Studios',
    description: 'Custom websites with booking systems, class schedules, and member portals.',
    href: '/services/gym-website-development',
  },
  {
    icon: <Utensils className="h-10 w-10 text-primary" />,
    title: 'Restaurants & Cafes',
    description: 'Beautiful websites with online menus, reservation systems, and ordering integration.',
    href: '/services/restaurant-website-design',
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'Salons & Spas',
    description: 'Elegant websites to showcase services, manage appointments, and sell products.',
    href: '/services/salon-website-development',
  },
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: 'Real Estate Agencies',
    description: 'Professional sites with property listings, virtual tours, and agent profiles.',
    href: '/services/real-estate-website-development',
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: 'Education & E-Learning',
    description: 'Engaging platforms for online courses, student management, and virtual classrooms.',
    href: '/services/education-website-development',
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 sm:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">Industries We Serve</h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
                We provide tailored web solutions for a variety of business niches.
            </p>
            </ScrollFadeIn>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
                <Link href={industry.href} key={industry.title} className="h-full">
                    <Card className="h-full text-center bg-background/50 border-border transition-all duration-300 group p-6 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden">
                        <ScrollFadeIn delay={`${index * 150}ms`} className="animate-reveal-up">
                            <div className="flex justify-center mb-4">
                            {industry.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{industry.title}</h3>
                            <p className="mt-2 text-muted-foreground">{industry.description}</p>
                        </ScrollFadeIn>
                    </Card>
                </Link>
            ))}
            </div>
        </div>
    </section>
  );
}
