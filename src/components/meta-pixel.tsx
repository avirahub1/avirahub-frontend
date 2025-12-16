 'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const MetaPixel = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
      return;
    }

    window.fbq('track', 'PageView');
  }, [pathname]);

  return null;
};

export default MetaPixel;


