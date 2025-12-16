
"use client";

import { useState, useEffect, useRef } from 'react';
import ScrollFadeIn from '@/components/scroll-fade-in';
import {
  Briefcase, Calendar, Smile, Award, Users, Star,
  Heart, ChevronRight, CheckCircle, Globe
} from 'lucide-react';

const iconMap: any = {
  Briefcase, Calendar, Smile, Award, Users, Star,
  Heart, ChevronRight, CheckCircle, Globe
};

const AnimatedStat = ({ finalValueRaw, label, iconRaw }: { finalValueRaw: string; label: string; iconRaw: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Parse numeric part from string like "500+" or "500"
  const finalValue = parseInt(finalValueRaw.replace(/[^0-9]/g, '')) || 0;
  const suffix = finalValueRaw.replace(/[0-9]/g, '');

  const IconComponent = iconMap[iconRaw] || Star; // Fallback icon

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = finalValue;
      if (start === end) return;

      const duration = 2000;
      const incrementTime = (duration / end);

      const timer = setInterval(() => {
        start += Math.ceil(end / 100); // Increment faster for large numbers
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, incrementTime < 10 ? 10 : incrementTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, finalValue]);

  return (
    <div ref={ref} className="p-6 sm:p-8 border border-border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
      <div className="flex justify-center mb-4">
        <IconComponent className="h-10 w-10 text-primary" />
      </div>
      <p className="text-4xl font-bold text-primary">{count}{suffix}</p>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  );
};

const clients = [
  'Innovate Inc.',
  'QuantumLeap',
  'FutureWorks',
  'CreativeMinds',
  'NextGen Solutions',
  'AlphaStream',
  'ByteBloom',
];

const extendedClients = [...clients, ...clients];

interface StatItem {
  label: string;
  value: string;
  icon: string;
  order: number;
  active: boolean;
}

export default function TrustedBySection({ cmsData }: { cmsData?: any }) {
  // Default data if CMS is empty or loading failed
  const title = cmsData?.title || "Trusted by the Best";
  const description = cmsData?.description || "Our track record speaks for itself. We are committed to excellence and delivering results.";

  // Sort active stats
  const stats: StatItem[] = cmsData?.stats
    ? cmsData.stats.filter((s: StatItem) => s.active).sort((a: StatItem, b: StatItem) => a.order - b.order)
    : [
      { icon: 'Briefcase', value: '500+', label: 'Projects Completed', order: 1, active: true },
      { icon: 'Smile', value: '450+', label: 'Happy Clients', order: 2, active: true },
      { icon: 'Calendar', value: '5+', label: 'Years of Experience', order: 3, active: true }
    ];

  return (
    <section id="trusted-by" className="py-16 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          </div>
        </ScrollFadeIn>
        <ScrollFadeIn delay="150ms">
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} finalValueRaw={stat.value} label={stat.label} iconRaw={stat.icon} />
            ))}
          </div>
        </ScrollFadeIn>
      </div>
      <ScrollFadeIn className="mt-16 sm:mt-24" delay="300ms">
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {extendedClients.map((client, index) => (
              <div key={index} className="mx-6 sm:mx-8 flex-shrink-0 text-xl sm:text-2xl font-semibold text-muted-foreground whitespace-nowrap">
                {client}
              </div>
            ))}
          </div>
          <div
            className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent"
            aria-hidden="true"
          />
        </div>
      </ScrollFadeIn>
    </section>
  );
}
