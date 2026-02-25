import React from 'react';
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
  return (
    <>
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
