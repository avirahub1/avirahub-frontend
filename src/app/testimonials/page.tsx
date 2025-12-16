
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import ScrollFadeIn from '@/components/scroll-fade-in';

export const metadata: Metadata = {
    title: 'What Our Clients Say | Avira Hub Testimonials & Reviews',
    description: 'Read reviews from happy clients across India. See why businesses trust Avira Hub for their web development needs.',
};

const reviews = [
  {
    name: 'Priya Sharma',
    company: 'CEO of Tech-Innovate',
    avatar: 'https://picsum.photos/seed/101/100/100',
    review: 'Avira Hub delivered a product that exceeded our wildest expectations. Their attention to detail and creative vision are unparalleled. The final result feels less like a website and more like an experience.',
    rating: 5,
  },
  {
    name: 'Rohan Mehra',
    company: 'Founder of Creative Solutions',
    avatar: 'https://picsum.photos/seed/102/100/100',
    review: 'The team\'s technical expertise is top-notch. They tackled complex challenges with ease and delivered a high-performance application that our users love. A truly collaborative and inspiring partnership.',
    rating: 5,
  },
  {
    name: 'Anjali Patel',
    company: 'Marketing Director, Future Co.',
    avatar: 'https://picsum.photos/seed/103/100/100',
    review: 'What impressed me most was their commitment to the user experience. The design is not only beautiful but also incredibly intuitive. Our engagement metrics have skyrocketed since launch.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    company: 'Owner, FitLife Gym',
    avatar: 'https://picsum.photos/seed/104/100/100',
    review: 'The new website has been a game-changer for my gym. Online bookings have tripled, and our members love the new class schedule feature. Highly recommended!',
    rating: 5,
  },
    {
    name: 'Sameer Khan',
    company: 'Restaurateur, The Spice Route',
    avatar: 'https://picsum.photos/seed/105/100/100',
    review: 'Our online orders have increased by 200% since Avira Hub redesigned our website. The online menu is fantastic and so easy for our customers to use.',
    rating: 5,
  },
    {
    name: 'Neha Gupta',
    company: 'Owner, Glow Salon & Spa',
    avatar: 'https://picsum.photos/seed/106/100/100',
    review: 'I am so happy with my new salon website. It looks so elegant and professional. My clients are constantly complimenting it, and the online booking is a lifesaver.',
    rating: 5,
  },
];


export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">Trusted by Innovators and Visionaries</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
              We are proud to partner with businesses of all sizes to help them achieve their digital goals. Here's what some of them have to say.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <ScrollFadeIn key={index} delay={`${index * 100}ms`}>
                        <Card className="h-full flex flex-col justify-between bg-card/50 border-border p-6 shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2">
                            <div>
                            <div className="flex mb-4">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <CardContent className="p-0">
                                <p className="text-muted-foreground italic">"{review.review}"</p>
                            </CardContent>
                            </div>
                            <div className="mt-6 flex items-center">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={review.avatar} alt={review.name} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="font-semibold">{review.name}</p>
                                <p className="text-sm text-muted-foreground">{review.company}</p>
                            </div>
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
