'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import ScrollFadeIn from '@/components/scroll-fade-in';
import TrustedBySection from '@/components/sections/trusted-by-section';
import { fetchCMS, fetchTeam } from '@/services/api';

const values = [
    "Innovation",
    "Client-Centricity",
    "Quality Craftsmanship",
    "Integrity & Transparency",
    "Continuous Learning",
    "Collaboration",
];

export default function AboutClient() {
    const [cmsData, setCmsData] = useState<any>({});
    const [teamHeaderData, setTeamHeaderData] = useState<any>({});
    const [statsData, setStatsData] = useState<any>({});
    const [teamMembers, setTeamMembers] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const [about, teamHeader, stats, team] = await Promise.all([
                    fetchCMS('about'),
                    fetchCMS('about_team'),
                    fetchCMS('about_stats'),
                    fetchTeam()
                ]);
                setCmsData(about || {});
                setTeamHeaderData(teamHeader || {});
                setStatsData(stats || {});
                setTeamMembers(team || []);
            } catch (err) {
                console.error('Failed to fetch about data', err);
            }
        };
        load();
    }, []);

    const title = cmsData.title || "We Build Digital Experiences That Drive Results";
    const description = cmsData.description ?
        cmsData.description.split('\n').map((para: string, i: number) => <p key={i} className="mt-4 text-muted-foreground">{para}</p>) :
        (<>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Avira Hub was born from a passion for technology and a desire to create digital solutions that are not only beautiful but also powerful, intuitive, and effective.
            </p>
        </>);
    const image = cmsData.image || "https://picsum.photos/seed/story/600/400";

    const teamTitle = teamHeaderData.title || "Meet the Team";
    const teamSubtitle = teamHeaderData.subtitle || "The creative minds and technical wizards behind your next project.";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
                <section className="py-20 sm:py-32 bg-background text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">{title}</h1>
                        {typeof description === 'string' ? <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground animate-fade-in-up">{description}</p> : description}
                    </div>
                </section>

                <section className="py-16 sm:py-24 bg-card">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                            <ScrollFadeIn>
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                                    {cmsData.description ? (
                                        <div className="mt-4 text-muted-foreground">
                                            {description}
                                        </div>
                                    ) : (
                                        <>
                                            <p className="mt-4 text-muted-foreground">
                                                Founded in a small home office, Avira Hub started with a simple goal: to help businesses in niche industries leverage the power of the web. We saw too many gyms, restaurants, and salons with outdated, ineffective websites. We knew we could do better.
                                            </p>
                                            <p className="mt-4 text-muted-foreground">
                                                Today, we are a thriving team of designers, developers, and strategists who have helped hundreds of businesses across India establish a strong digital presence. Our journey has been one of growth, learning, and an unwavering commitment to our clients' success.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </ScrollFadeIn>
                            <ScrollFadeIn delay="200ms">
                                <Image
                                    src={image}
                                    alt="The Avira Hub team"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-lg w-full h-auto"
                                    data-ai-hint="team collaboration"
                                />
                            </ScrollFadeIn>
                        </div>
                    </div>
                </section>

                <section className="py-16 sm:py-24 bg-background">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <ScrollFadeIn>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{teamTitle}</h2>
                                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{teamSubtitle}</p>
                            </ScrollFadeIn>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {teamMembers.length > 0 ? teamMembers.map((member, index) => (
                                <ScrollFadeIn key={member._id} delay={`${index * 100}ms`} className="text-center">
                                    <Image
                                        src={member.image}
                                        alt={`Avatar of ${member.name}`}
                                        width={150}
                                        height={150}
                                        className="rounded-full mx-auto mb-4 border-4 border-primary w-24 h-24 sm:w-32 sm:h-32 transition-transform duration-300 hover:scale-110 object-cover"
                                        data-ai-hint="professional headshot"
                                    />
                                    <h3 className="font-semibold text-lg">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </ScrollFadeIn>
                            )) : (
                                <div className="col-span-full text-center text-muted-foreground">
                                    <p>Team members are being updated. Check back soon!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 sm:py-24 bg-card">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <ScrollFadeIn>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Core Values</h2>
                                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">The principles that guide every project we undertake.</p>
                            </ScrollFadeIn>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto [perspective:1000px]">
                            {values.map((value, index) => (
                                <ScrollFadeIn key={value} delay={`${index * 100}ms`}>
                                    <Card className="bg-background p-4 transition-all duration-300 hover:shadow-primary/10 hover:[transform:rotateX(10deg)_translateY(-0.5rem)]">
                                        <CardContent className="flex items-center gap-4 p-0">
                                            <Check className="h-6 w-6 text-primary flex-shrink-0" />
                                            <span className="font-semibold">{value}</span>
                                        </CardContent>
                                    </Card>
                                </ScrollFadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                <TrustedBySection cmsData={statsData} />

            </main>
            <Footer />
        </div>
    );
}
