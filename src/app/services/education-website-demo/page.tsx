
import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart, Users, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ScrollFadeIn from '@/components/scroll-fade-in';


export const metadata: Metadata = {
    title: 'FutureLearn Academy | Online Courses for the Future',
    description: 'Join FutureLearn Academy and master in-demand skills. Explore courses in Data Science, AI, Web Development, and more.',
};

const courses = [
    {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEYXRhJTIwU2NpZW5jZXxlbnwwfHx8fDE3NjU1OTA3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'The Data Science Bootcamp',
        description: 'Master Python, Machine Learning, and data visualization.',
        level: 'Beginner to Advanced',
        duration: '12 Weeks',
    },
    {
        image: 'https://images.unsplash.com/photo-1620712943543-285f7267a808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxBaSUyMGdyYXBoaWN8ZW58MHx8fHwxNzY1NTkwODcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'AI & Machine Learning',
        description: 'Dive deep into neural networks, NLP, and computer vision.',
        level: 'Intermediate',
        duration: '8 Weeks',
    },
    {
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjU1OTA5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Full-Stack Web Development',
        description: 'Learn React, Node.js, and everything in between to build modern web apps.',
        level: 'Beginner',
        duration: '16 Weeks',
    },
]

const instructors = [
    { name: 'Dr. Evelyn Reed', role: 'Lead Data Scientist', avatar: 'https://picsum.photos/seed/evelyn/200' },
    { name: 'Marcus Chen', role: 'AI Research Engineer', avatar: 'https://picsum.photos/seed/marcus/200' },
    { name: 'Sofia Rodriguez', role: 'Senior Software Architect', avatar: 'https://picsum.photos/seed/sofia/200' },
];

export default function EducationDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDB8fHx8fDE3NjU1OTA1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students collaborating and learning online"
                fill
                className="object-cover"
                priority
            />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter drop-shadow-lg animate-fade-in-up">Unlock Your Future.</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
                    Master the most in-demand tech skills with our expert-led online courses. Start your learning journey today.
                </p>
                <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
                    <Button size="lg" asChild>
                        <Link href="#courses">Explore Courses</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="courses" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Courses</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Handpicked courses to launch your career in tech.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                       <ScrollFadeIn key={course.title} delay={`${index*100}ms`}>
                            <Card className="bg-background border-border overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                                <CardContent className="p-0 relative">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        width={600}
                                        height={400}
                                        className="object-cover w-full h-[250px] group-hover:scale-105 transition-transform duration-500"
                                    />
                                </CardContent>
                                <CardHeader>
                                <CardTitle className="text-xl">{course.title}</CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <span className="font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded">{course.level}</span>
                                        <span>{course.duration}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full group" variant="outline">
                                        <Link href="#">Learn More <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                       </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="instructors" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Learn From Industry Experts</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our instructors are leaders in their fields, bringing real-world experience to every lesson.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {instructors.map((instructor, index) => (
                        <ScrollFadeIn key={instructor.name} delay={`${index*100}ms`} className="text-center flex flex-col items-center">
                            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4 border-4 border-primary">
                                <AvatarImage src={instructor.avatar} alt={`Avatar of ${instructor.name}`} />
                                <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg sm:text-xl">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">{instructor.role}</p>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>

        <section id="contact" className="py-16 sm:py-24 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to Start Learning?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Join thousands of successful students and transform your career. Your future starts now.
                    </p>
                </div>
                <div className="mt-8">
                     <Button size="lg" asChild>
                        <Link href="#">Enroll in a Course</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
