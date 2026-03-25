import React from 'react';
import {
    Award,
    Briefcase,
    Code,
    Eye,
    Lightbulb,
    Target,
    Users,
    Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@marketing/components/ui/button';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';
import WhyChooseUsSection from '@marketing/components/about/WhyChooseUsSection';
import TeamShowcaseSection from '@marketing/components/about/TeamShowcaseSection';
import TestimonialsSection from '@marketing/components/home/TestimonialsSection';
import { useReveal } from '@marketing/hooks/useReveal';

const iconMap = {
    award: Award,
    briefcase: Briefcase,
    code: Code,
    eye: Eye,
    lightbulb: Lightbulb,
    target: Target,
    users: Users,
    zap: Zap,
};

const FocusCard = ({ card, index }) => {
    const Icon = iconMap[card.icon_key] || Code;
    const ref = useReveal();

    return (
        <div ref={ref} className={`reveal next-card card-hover p-8`}>
            <Icon className="mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-3 text-2xl font-semibold text-foreground">
                {card.title}
            </h3>
            <p className="leading-7 text-muted-foreground">
                {card.description}
            </p>
        </div>
    );
};

const AboutPage = () => {
    const { settings } = useSiteSettings();
    const header = settings?.about_header || {};
    const story = settings?.about_story || {};
    const cards = settings?.about_cards?.items || [];
    const whyChooseUs = settings?.about_why_choose_us || {};
    const team = settings?.about_team || {};
    const cta = settings?.about_cta || {};
    const headerRef = useReveal();
    const storyRef = useReveal();
    const ctaRef = useReveal();

    const focusCards =
        cards.length > 0
            ? cards.slice(0, 2)
            : [
                  {
                      title: 'Our Mission',
                      description:
                          'To empower businesses with transformative technology, fostering innovation and sustainable growth across Africa and beyond.',
                      icon_key: 'target',
                  },
                  {
                      title: 'Our Vision',
                      description:
                          'To be the leading digital innovation partner, recognized for excellence, impact, and shaping the future of technology.',
                      icon_key: 'eye',
                  },
              ];

    const storyParagraphs = Array.isArray(story.body_paragraphs)
        ? story.body_paragraphs
              .map((paragraph) => paragraph?.text || paragraph)
              .filter(Boolean)
        : [];

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <Seo
                title={header.headline || 'About'}
                description={header.subheadline}
                canonical="/about"
            />

            <header className="next-container next-section-padding text-center">
                <div ref={headerRef} className="reveal mx-auto max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {header.badge_text || 'Our Story'}
                    </span>
                    <h1 className="mt-4 mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                        {header.headline ||
                            'Pioneering digital solutions in Africa.'}
                    </h1>
                    <p className="text-lg text-balance text-muted-foreground md:text-xl">
                        {header.subheadline ||
                            'TechTower Innovations builds modern websites, products, and digital systems that help ambitious teams grow with confidence.'}
                    </p>
                </div>
            </header>

            <section className="next-section-padding">
                <div className="next-container">
                    <div
                        ref={storyRef}
                        className="reveal grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]"
                    >
                        <div className="order-2 lg:order-1">
                            <h2 className="mb-6 text-3xl font-semibold text-foreground">
                                {story.heading || 'From Vision to Reality'}
                            </h2>
                            {storyParagraphs.length > 0 ? (
                                storyParagraphs.map((paragraph, index) => (
                                    <p
                                        key={`${paragraph}-${index}`}
                                        className={`text-lg leading-8 text-muted-foreground ${index === storyParagraphs.length - 1 ? 'mb-6' : 'mb-4'}`}
                                    >
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <>
                                    <p className="mb-4 text-lg leading-8 text-muted-foreground">
                                        Founded with a passion for technology
                                        and a commitment to innovation,
                                        TechTower began as a collective of
                                        builders focused on solving real
                                        business challenges with dependable
                                        digital products.
                                    </p>
                                    <p className="mb-6 text-lg leading-8 text-muted-foreground">
                                        We work closely with every client to
                                        understand the problem clearly, shape
                                        the right solution, and deliver work
                                        that feels polished, practical, and
                                        ready for growth.
                                    </p>
                                </>
                            )}
                            <Button
                                asChild
                                className="next-button rounded-full px-8"
                            >
                                <Link to={story.cta_href || '/contact'}>
                                    {story.cta_label || 'Partner With Us'}
                                </Link>
                            </Button>
                        </div>

                        <div className="order-1 overflow-hidden rounded-[2rem] border border-border/60 bg-muted/20 shadow-[0_24px_80px_rgba(0,0,0,0.16)] lg:order-2">
                            <img
                                src={
                                    story.image_url ||
                                    'https://images.unsplash.com/photo-1637622124152-33adfabcc923?auto=format&fit=crop&w=1200&q=80'
                                }
                                alt={
                                    story.image_alt ||
                                    'TechTower team collaborating on a digital product strategy session'
                                }
                                className="aspect-[5/4] w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="next-section-padding pt-0">
                <div className="next-container">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {focusCards.map((card, index) => (
                            <FocusCard
                                key={`${card.title}-${index}`}
                                card={card}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <WhyChooseUsSection config={whyChooseUs} />
            <TeamShowcaseSection section={team} />
            <TestimonialsSection />

            <section className="next-section-padding">
                <div className="next-container text-center">
                    <div ref={ctaRef} className="reveal mx-auto max-w-3xl">
                        <Briefcase className="mx-auto mb-6 h-12 w-12 text-primary" />
                        <h2 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
                            {cta.heading || 'Join Us on Our Journey'}
                        </h2>
                        <p className="mb-10 text-lg text-balance text-muted-foreground">
                            {cta.body ||
                                "Whether you're building something new, improving what already exists, or planning your next phase of growth, we're ready to help."}
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="next-button rounded-full px-10"
                        >
                            <Link to={cta.cta_href || '/contact'}>
                                {cta.cta_label || "Let's Build Together"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
