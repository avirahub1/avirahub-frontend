
"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ScrollFadeIn from '@/components/scroll-fade-in';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import Link from 'next/link';

const projects = PlaceHolderImages.slice(0, 6);

export default function GallerySection() {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current || !railRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress of section through viewport
      // 0 = section entering, 1 = section leaving
      if (top < viewportHeight && top > -height) {
        const progress = (viewportHeight - top) / (viewportHeight + height);
        
        // Move the rail horizontally based on scroll progress
        const railWidth = railRef.current.scrollWidth;
        const maxScroll = railWidth - viewportHeight + 100; // +100 for some padding
        railRef.current.style.transform = `translateX(${-progress * maxScroll}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
        <section id="gallery" className="py-16 sm:py-24 bg-background">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollFadeIn>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">Our Work</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
                        A glimpse into the immersive experiences we've crafted.
                    </p>
                </ScrollFadeIn>
                <div className="mt-12 grid grid-cols-1 gap-8">
                     {projects.map((project) => (
                        <ScrollFadeIn key={project.id}>
                            <Card className="bg-card border-border overflow-hidden group">
                                <CardContent className="p-0 relative overflow-hidden">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.description}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
                                        data-ai-hint={project.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button asChild>
                                            <Link href={project.href || '#'}>View Project</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                                <div className="p-4">
                                    <h3 className="font-semibold">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground">{project.description}</p>
                                </div>
                            </Card>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
  }

  return (
    <section ref={sectionRef} id="gallery" className="py-20 sm:py-32 bg-background h-[200vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <ScrollFadeIn>
                <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">Our Work</h2>
                <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
                    A glimpse into the immersive experiences we've crafted.
                </p>
            </ScrollFadeIn>
            <div
                ref={railRef}
                className="flex items-center gap-8 px-8 mt-16 will-change-transform"
            >
                {projects.map((project) => (
                    <div key={project.id} className="w-[50vw] md:w-[30vw] flex-shrink-0">
                        <Card className="bg-card border-border overflow-hidden group">
                            <CardContent className="p-0 relative overflow-hidden">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.description}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
                                    data-ai-hint={project.imageHint}
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button asChild>
                                        <Link href={project.href || '#'}>View Project</Link>
                                    </Button>
                                </div>
                            </CardContent>
                             <div className="p-4">
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
