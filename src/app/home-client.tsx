
'use client';

import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import IndustriesSection from '@/components/sections/industries-section';
import GallerySection from '@/components/sections/gallery-section';
import WhyUsSection from '@/components/sections/why-us-section';
import TrustedBySection from '@/components/sections/trusted-by-section';
import ReviewsSection from '@/components/sections/reviews-section';
import ContactSection from '@/components/sections/contact-section';
import { useIsMobile } from '@/hooks/use-mobile';



import { useState, useEffect } from 'react';
import { fetchCMS } from '@/services/api';

export default function HomeClient() {
    const isMobile = useIsMobile();
    const [statsData, setStatsData] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCMS('about_stats');
                setStatsData(data);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, []);


    return (
        <>
            {isMobile ? (
                <>
                    <HeroSection />
                    <ServicesSection />
                </>
            ) : (
                <div className="relative h-[200vh]">
                    <HeroSection />
                    <ServicesSection />
                </div>
            )}
            <IndustriesSection />
            <GallerySection />
            <WhyUsSection />
            <TrustedBySection cmsData={statsData} />
            <ReviewsSection />
            <ContactSection />
        </>
    );
}

