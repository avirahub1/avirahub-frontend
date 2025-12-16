import ScrollFadeIn from '@/components/scroll-fade-in';
import { Server, Settings, Search, RefreshCw } from 'lucide-react';

const offers = [
    {
        icon: <Server className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />,
        title: '1 Year Free Hosting',
        description: 'Get your project online with a full year of free, high-performance hosting on us.'
    },
    {
        icon: <Settings className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />,
        title: '1 Year Expert Support',
        description: 'Enjoy peace of mind with one year of dedicated expert support for your project.'
    },
    {
        icon: <Search className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
        title: 'Free SEO',
        description: 'We will optimize your site for search engines to help you get discovered by more customers.'
    },
    {
        icon: <RefreshCw className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg]" />,
        title: 'Unlimited Revisions',
        description: 'We work with you until you are 100% satisfied. We offer unlimited revisions on our designs.'
    }
];

export default function WhyUsSection() {
    return (
        <section id="why-us" className="py-16 sm:py-32 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollFadeIn>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">Why Choose Avira Hub?</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
                        We provide exceptional value to kickstart your project and ensure its success.
                    </p>
                </ScrollFadeIn>
                <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offers.map((offer, index) => (
                        <ScrollFadeIn key={offer.title} delay={`${index * 150}ms`} className="animate-slide-in-left">
                            <div className="h-full p-6 border border-border rounded-lg bg-background/50 group transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                                <div className="mb-4">{offer.icon}</div>
                                <h3 className="text-lg font-semibold">{offer.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
