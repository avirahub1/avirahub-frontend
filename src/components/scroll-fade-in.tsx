
"use client";

import { useRef, useEffect, useState, type ReactNode } from 'react';

type ScrollFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: string;
};

export default function ScrollFadeIn({ children, className, delay = '0s' }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
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

  return (
    <div
      ref={ref}
      className={`${className || ''} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
