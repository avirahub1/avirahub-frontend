
"use client";

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DialogTrigger } from '@radix-ui/react-dialog';
import { ContactForm } from '@/components/contact-form';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import { cn } from '@/lib/utils';


export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
        if(heroRef.current && !isMobile) {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5));
            setOpacity(newOpacity);
        }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const parallax = (speed: number) => {
    if (!isClient || isMobile) return {};
    const x = (window.innerWidth / 2 - mousePos.x * speed) / 100;
    const y = (window.innerHeight / 2 - mousePos.y * speed) / 100;
    return {
      transform: `translateX(${x}px) translateY(${y}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  return (
    <section 
        ref={heroRef} 
        className={cn(
            "w-full flex items-center justify-center overflow-hidden bg-background",
            isMobile ? 'h-screen pt-16' : 'h-screen sticky top-0'
        )}
    >
      {/* Background shapes for parallax */}
      {isClient && !isMobile && (
        <div className="absolute inset-0">
            {/* Starfield */}
            <div className="absolute inset-0" style={parallax(2)}>
                 <div className="absolute inset-0 bg-dot-primary/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_60%)]" />
            </div>

            {/* Core Black Hole */}
            <div className="absolute inset-0" style={parallax(8)}>
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-black rounded-full filter blur-xl" />
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] border-2 border-black rounded-full" />
            </div>

            {/* Inner Accretion Disk (Brighter & Faster) */}
            <div className="absolute inset-0" style={parallax(12)}>
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary)_/_0.8)_0%,hsl(var(--accent)_/_0.9)_50%,hsl(var(--primary)_/_0.8)_100%)] rounded-full filter blur-2xl opacity-60 animate-spin-slow" />
            </div>
            
            {/* Photon Ring (thin, bright) */}
            <div className="absolute inset-0" style={parallax(10)}>
                 <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full border-2 border-white/80 filter blur-sm" />
            </div>


            {/* Outer Accretion Disk / Glow (Slower) */}
            <div className="absolute inset-0" style={parallax(6)}>
                 <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_60%)] rounded-full filter blur-3xl opacity-80" />
            </div>
            
            {/* Distant Nebula */}
            <div className="absolute inset-0" style={parallax(4)}>
                <div className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.1),transparent_70%)]" />
                 <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
            </div>

        </div>
      )}


      <div className="relative z-10 text-center p-4" style={{opacity: isMobile ? 1 : opacity}}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground pb-4 animate-fade-in-up">
          Expert Web Design for Your Niche
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
          We build performant, visually stunning web experiences that captivate and convert.
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-up [animation-delay:400ms]">
          From interactive 3D to intelligent AI, we push the boundaries of digital.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
            <Dialog>
              <DialogTrigger asChild>
                 <Button size="lg" className="w-full sm:w-auto">
                    Get Started Now
                    <Send className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[625px] rounded-lg">
                 <DialogHeader>
                  <DialogTitle className="font-code text-left">{'> Terminal: New Project'}</DialogTitle>
                  <DialogDescription className="font-code text-left">
                    user@avirahub:~$ /bin/contact --init
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>

           <a href="#services">
            <Button size="lg" variant="outline" className="group w-full sm:w-auto">
              Explore Our Services
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
      
       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce" style={{opacity: isMobile ? 1 : opacity}}>
         <ArrowDown className="h-6 w-6 text-muted-foreground" />
       </div>
    </section>
  );
}
