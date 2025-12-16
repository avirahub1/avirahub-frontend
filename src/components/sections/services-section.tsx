
"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Code, PenTool, BrainCircuit } from 'lucide-react';
import ScrollFadeIn from '@/components/scroll-fade-in';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Code className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />,
    title: 'Dynamic Web Development',
    description: 'Building high-performance, scalable websites and applications with modern frameworks, focusing on interactivity and user engagement.',
    href: '/website-design-services-india'
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />,
    title: 'Immersive UI/UX Design',
    description: 'Designing intuitive and beautiful interfaces that tell a story. We create seamless user journeys with a focus on 3D elements and motion.',
    href: '/website-design-services-india'
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'AI & GenAI Integration',
    description: 'Leveraging the power of artificial intelligence to create smarter, more personalized user experiences and automate complex processes.',
    href: '/frontend-developer-services'
  },
];

const getAnimationClass = (index: number) => {
    if (index === 0) return 'animate-slide-in-left';
    if (index === 2) return 'animate-slide-in-right';
    return 'animate-slide-in-bottom';
}

export default function ServicesSection() {
  const isMobile = useIsMobile();

  return (
    <section 
      id="services" 
      className={cn(
        "flex items-center bg-background",
        isMobile ? "h-auto py-16" : "h-screen relative sticky top-0"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">Our Core Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
            We transform visions into digital realities with a blend of artistry and engineering.
          </p>
        </ScrollFadeIn>
        <div className={cn(
          "mt-16 grid grid-cols-1 md:grid-cols-3 gap-8",
          !isMobile && "[perspective:1000px]"
        )}>
          {services.map((service, index) => (
            <Link href={service.href} key={service.title} className="h-full">
                <ScrollFadeIn delay={`${index * 150}ms`} className={isMobile ? '' : getAnimationClass(index)}>
                <Card className={cn(
                  "relative h-full text-center bg-background/50 border-border transition-all duration-300 group overflow-hidden",
                  !isMobile && "hover:shadow-2xl hover:shadow-primary/10 hover:[transform:rotateX(10deg)_translateY(-0.5rem)]"
                )}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [mask-image:radial-gradient(300px_at_center,white,transparent)] group-hover:[animation:pulse_2s_infinite] bg-gradient-to-tr from-primary/10 to-transparent" />
                    <CardHeader className="relative">
                    <div className="mx-auto bg-card p-4 rounded-full w-fit group-hover:bg-accent transition-colors">
                        {service.icon}
                    </div>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                    <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
                </ScrollFadeIn>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
