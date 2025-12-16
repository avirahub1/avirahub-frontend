
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, GitMerge, Zap, ShieldCheck, Layers, Bot } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Expert Frontend Developer Near Me | Hire React/Next.js Devs',
    description: 'Looking for a frontend developer near you? Avira Hub has expert React/Next.js developers ready to build fast, scalable, and beautiful user interfaces for your project.',
};

const features = [
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        title: "React & Next.js Mastery",
        description: "Expert-level development using the most powerful and modern frontend frameworks for optimal performance and scalability."
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Performance Optimization",
        description: "We obsess over speed, optimizing rendering, asset loading, and interactions for a lightning-fast user experience."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Pixel-Perfect Implementation",
        description: "Meticulous conversion of UI/UX designs into high-quality, responsive code that matches the vision perfectly."
    },
    {
        icon: <GitMerge className="h-8 w-8 text-primary" />,
        title: "API Integration",
        description: "Seamless integration with your backend services, REST APIs, and GraphQL endpoints for dynamic, data-driven applications."
    },
     {
        icon: <Bot className="h-8 w-8 text-primary" />,
        title: "AI & GenAI Integration",
        description: "Experience in connecting frontend applications to GenAI models and flows for intelligent, next-gen features."
    },
    {
        icon: <Check className="h-8 w-8 text-primary" />,
        title: "Testing & Quality Assurance",
        description: "Rigorous testing practices to ensure your application is bug-free, robust, and reliable across all browsers."
    }
]

const faqs = [
    {
        question: "What is your frontend technology stack?",
        answer: "We specialize in the React ecosystem, primarily using Next.js for its performance and scalability benefits. Our stack also includes TypeScript for type safety, Tailwind CSS for styling, and Genkit for AI integrations."
    },
    {
        question: "Can you work with our existing backend team?",
        answer: "Absolutely. We excel in collaborative environments. We can seamlessly integrate with your backend developers, follow your API specifications, and use shared tools like Git and Jira to ensure smooth project execution."
    },
    {
        question: "How do you handle project management and communication?",
        answer: "We believe in transparent and frequent communication. You'll have a dedicated point of contact, regular progress updates, and access to our project management tools. We're always available for calls and meetings to ensure alignment."
    },
    {
        question: "What are your hiring models? Can we hire a dedicated developer?",
        answer: "We offer flexible engagement models, including project-based contracts and dedicated developer retainers. We can tailor a plan that fits your specific needs and budget. Contact us to discuss your project."
    }
]

export default function FrontendDeveloperServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Expert Frontend Developer Near You</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              We build beautiful, fast, and scalable user interfaces with React and Next.js that bring your vision to life.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Hire a Frontend Developer</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">From Design to Deployment, We Deliver Excellence</h2>
                        <p className="text-muted-foreground">Finding reliable, expert frontend talent can be challenging. You need a partner who understands modern web architecture and can translate complex designs into intuitive, high-performance applications. That's where we come in.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Ship features faster with our experienced developers.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Ensure a flawless user experience for your customers.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build a scalable and maintainable codebase.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Integrate seamlessly with your existing infrastructure.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/frontend/600/400"
                            alt="Developer writing React code on a modern computer setup."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="developer code"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Frontend Development Expertise</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A comprehensive suite of services for modern web applications.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="bg-card border-border hover:-translate-y-2 transition-transform duration-300">
                           <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                {feature.icon}
                                <div className="flex-1">
                                    <CardTitle>{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map(faq => (
                            <AccordionItem key={faq.question} value={faq.question}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

    