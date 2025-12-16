
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


export default function HomeClient({ statsData }: { statsData?: any }) {
    const isMobile = useIsMobile();

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

