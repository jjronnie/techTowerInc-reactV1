import React from 'react';
import Seo from '@marketing/components/Seo';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import HeroSection from '@marketing/components/home/HeroSection';
import StatsSection from '@marketing/components/home/StatsSection';
import PortfolioPreviewSection from '@marketing/components/home/PortfolioPreviewSection';
import TechnologiesSection from '@marketing/components/home/TechnologiesSection';
import FeaturesSection from '@marketing/components/home/FeaturesSection';
import ServicesPreviewSection from '@marketing/components/home/ServicesPreviewSection';
import TestimonialsSection from '@marketing/components/home/TestimonialsSection';
import FaqSection from '@marketing/components/home/FaqSection';
import CtaSection from '@marketing/components/home/CtaSection';

const HomePage = () => {
    const { settings } = useSiteSettings();

    return (
        <>
            <Seo
                title="Website Design & SEO Services in Uganda | TechTower"
                description={settings?.default_seo_description}
                image={settings?.default_og_image_url}
                appendAppName={false}
            />
            <HeroSection />
            <StatsSection />
            <TechnologiesSection />
            <PortfolioPreviewSection />
            <FeaturesSection />
            <ServicesPreviewSection />
            <TestimonialsSection />
            <FaqSection />
            <CtaSection />
        </>
    );
};

export default HomePage;
