
import type { Metadata } from 'next';
import PricingClient from './pricing-client';

export const metadata: Metadata = {
  title: 'Website Design Packages & Pricing in India | Avira Hub',
  description: 'Explore our flexible and transparent pricing for web design packages. Find the perfect plan for your business, from startups to enterprises. Get a custom quote.',
};

export const dynamic = 'force-static';

export default function PricingPage() {
  return <PricingClient />;
}

