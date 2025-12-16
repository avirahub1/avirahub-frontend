
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ScrollFadeIn from '@/components/scroll-fade-in';

export const metadata: Metadata = {
    title: 'Our Work | Web Design & Development Portfolio | Avira Hub',
    description: 'Explore our portfolio of stunning, custom-built websites for gyms, restaurants, real estate, and more. See the quality and innovation Avira Hub delivers.',
};

const projects = PlaceHolderImages.map((img, i) => ({
  ...img,
  category: ['All', i % 2 === 0 ? 'Web Design' : 'App Development', i % 3 === 0 ? 'E-commerce' : 'UI/UX'][i % 4],
}));

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">A Glimpse Into the Experiences We've Crafted</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              We take pride in our work. Explore a selection of projects that showcase our commitment to quality, innovation, and client success.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Note: Filtering functionality would require client-side state */}
                <div className="flex justify-center mb-12 space-x-1 sm:space-x-2">
                    <Button variant="ghost">All</Button>
                    <Button variant="ghost">Web Design</Button>
                    <Button variant="ghost">App Development</Button>
                    <Button variant="ghost">E-commerce</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ScrollFadeIn key={project.id} delay={`${index * 100}ms`}>
                            <Card className="bg-card border-border overflow-hidden group transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-2">
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
                                 <div className="p-6">
                                    <h3 className="font-semibold text-xl">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                                </div>
                            </Card>
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
