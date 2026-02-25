import React from 'react';
import Seo from '@/components/Seo';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PortfolioPreviewSection from '@/components/home/PortfolioPreviewSection';
import TechnologiesSection from '@/components/home/TechnologiesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesPreviewSection from '@/components/home/ServicesPreviewSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import CtaSection from '@/components/home/CtaSection';


const HomePage = () => {
  const { settings } = useSiteSettings();

  return (
    <>
      <Seo
        title={settings?.default_seo_title || settings?.site_name}
        description={settings?.default_seo_description}
        image={settings?.default_og_image_url}
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
