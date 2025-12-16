import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Priya S.',
    company: 'CEO of Tech-Innovate',
    avatar: 'https://picsum.photos/seed/101/100/100',
    review: 'Avira Hub delivered a product that exceeded our wildest expectations. Their attention to detail and creative vision are unparalleled. The final result feels less like a website and more like an experience.',
    rating: 5,
  },
  {
    name: 'Rohan M.',
    company: 'Founder of Creative Solutions',
    avatar: 'https://picsum.photos/seed/102/100/100',
    review: 'The team\'s technical expertise is top-notch. They tackled complex challenges with ease and delivered a high-performance application that our users love. A truly collaborative and inspiring partnership.',
    rating: 5,
  },
  {
    name: 'Anjali P.',
    company: 'Marketing Director, Future Co.',
    avatar: 'https://picsum.photos/seed/103/100/100',
    review: 'What impressed me most was their commitment to the user experience. The design is not only beautiful but also incredibly intuitive. Our engagement metrics have skyrocketed since launch.',
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">What Our Clients Say</h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
            We are proud to partner with innovators and visionaries.
          </p>
        </ScrollFadeIn>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ScrollFadeIn key={index} delay={`${index * 150}ms`}>
              <Card className="h-full flex flex-col justify-between bg-card/50 border-border p-6 shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
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
  );
}
