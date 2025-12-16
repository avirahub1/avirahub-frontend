
import { Button } from '@/components/ui/button';
import ScrollFadeIn from '@/components/scroll-fade-in';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Start Your Project</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have an idea? Let's turn it into something extraordinary.
              Reach out today for a free consultation and let's discuss how we can help you achieve your goals.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Get a Free Quote</Link>
                </Button>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
