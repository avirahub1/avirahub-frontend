
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollFadeIn from '@/components/scroll-fade-in';
import connectToDatabase from '@/lib/mongodb';
import Pricing from '@/models/Pricing';

export const metadata: Metadata = {
  title: 'Website Design Packages & Pricing in India | Avira Hub',
  description: 'Explore our flexible and transparent pricing for web design packages. Find the perfect plan for your business, from startups to enterprises. Get a custom quote.',
};

async function getPricingPlans() {
  try {
    await connectToDatabase();
    // Fetch only active plans, sorted by price (assuming price is number or we rely on creation order/custom sort)
    // For now, sorting by createdAt as per API standard, but maybe price or custom order is better?
    // Let's stick to simple fetch
    const plans = await Pricing.find({ status: 'active' }).sort({ createdAt: 1 }).lean();

    // Map _id to string to avoid serialization issues
    return plans.map(plan => ({
      ...plan,
      _id: plan._id.toString(),
      createdAt: plan.createdAt ? plan.createdAt.toISOString() : null,
      updatedAt: plan.updatedAt ? plan.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error('Failed to fetch pricing plans', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const packages = await getPricingPlans();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">Clear & Flexible Pricing for Your Needs</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
              We offer transparent pricing plans designed to provide maximum value. Choose a package that fits your goals, or contact us for a custom quote.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {packages.length === 0 ? (
              <div className="text-center text-muted-foreground p-12 border rounded-lg bg-muted/20">
                <p>No pricing plans currently available. Please contact us for a quote.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch [perspective:1000px]">
                {packages.map((pkg, index) => (
                  <ScrollFadeIn key={pkg._id} delay={`${index * 150}ms`}>
                    <Card className={`flex flex-col h-full transition-all duration-300 hover:[transform:rotateX(5deg)_translateY(-0.5rem)] ${pkg.popular ? 'border-primary shadow-primary/20 shadow-2xl relative' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 left-0 -mt-3 text-center">
                          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <CardHeader className={pkg.popular ? 'pt-8' : ''}>
                        <CardTitle className="text-2xl sm:text-3xl">{pkg.title}</CardTitle>
                        <CardDescription>Perfect for your business needs</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="mb-6">
                          <span className="text-4xl font-bold">{pkg.price}</span>
                          {pkg.title.toLowerCase() !== 'enterprise' && pkg.price !== 'Custom' && (
                            <span className="text-muted-foreground">/one-time</span>
                          )}
                        </div>
                        <ul className="space-y-4">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${100 + fIndex * 50}ms` }}>
                              <Check className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full group" variant={pkg.popular ? 'default' : 'outline'}>
                          <Link href="/contact">
                            {pkg.title.toLowerCase().includes('enterprise') || pkg.price === 'Custom' ? 'Get a Custom Quote' : 'Get Started'}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </ScrollFadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 sm:py-20 text-center container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold">Not sure which plan is right for you?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              No problem. Every project is unique. Contact us for a free, no-obligation consultation, and we'll help you figure out the best solution for your specific needs.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
            </div>
          </ScrollFadeIn>
        </section>

      </main>
      <Footer />
    </div>
  );
}
