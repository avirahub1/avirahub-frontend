
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, GraduationCap, Laptop, Users, Library, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Education & Coaching Website Development | Avira Hub',
    description: 'We build engaging websites and e-learning platforms for schools, colleges, and coaching centers. Manage students, courses, and content with a custom solution.',
};

const features = [
    {
        icon: <Laptop className="h-8 w-8 text-primary" />,
        title: "LMS Integration",
        description: "Integrate a powerful Learning Management System to host courses, track progress, and manage educational content seamlessly."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Student & Teacher Portals",
        description: "Secure portals for students to access materials and for teachers to manage classes and assignments."
    },
    {
        icon: <Library className="h-8 w-8 text-primary" />,
        title: "Online Course Management",
        description: "Easily create, update, and sell online courses with built-in payment gateway integrations."
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-primary" />,
        title: "Admission & Enrollment",
        description: "Streamline your admissions process with online application forms and fee payment solutions."
    },
     {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "High Performance",
        description: "A fast and reliable platform that ensures a smooth learning experience for all users."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Secure & Scalable",
        description: "Robust security measures to protect student data and a scalable architecture to grow with your institution."
    }
]

const faqs = [
    {
        question: "Can you integrate with specific payment gateways for Indian students?",
        answer: "Yes, we can integrate with all major Indian payment gateways like Razorpay, PayU, and Instamojo to make fee collection and course payments easy and secure."
    },
    {
        question: "How long does it take to develop an educational website?",
        answer: "The timeline depends on the complexity. A standard informational website might take 4-6 weeks, while a custom e-learning platform with an LMS could take 8-12 weeks or more."
    },
    {
        question: "Do you provide support and maintenance after the website is launched?",
        answer: "Absolutely. We offer comprehensive support and maintenance packages to ensure your platform runs smoothly, stays updated, and remains secure."
    },
    {
        question: "Will the platform be mobile-friendly for students using phones?",
        answer: "Yes, a mobile-first approach is central to our design process. We guarantee a seamless and intuitive experience for students and faculty on all devices, including smartphones and tablets."
    }
]

export default function EducationWebsitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20 sm:py-24 bg-background text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Engaging Websites for Education & E-Learning</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              We create modern, intuitive, and feature-rich digital platforms for schools, colleges, and coaching institutes that enhance the learning experience.
            </p>
             <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact">Request a Custom Demo</Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Empower Learning in the Digital Age</h2>
                        <p className="text-muted-foreground">An outdated website can be a barrier to attracting new students and delivering effective education. You need a dynamic digital campus that serves your students, faculty, and administrative staff efficiently.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Boost student admissions with a compelling online presence.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Deliver online courses and expand your reach.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Automate administrative tasks and improve efficiency.</li>
                            <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Build a strong, reputable brand for your institution.</li>
                        </ul>
                    </div>
                    <div>
                         <Image 
                            src="https://picsum.photos/seed/education/600/400"
                            alt="An e-learning platform displayed on a laptop."
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto"
                            data-ai-hint="e-learning platform"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Core Features for Modern Educational Platforms</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">We equip your digital campus with the tools needed for success.</p>
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
