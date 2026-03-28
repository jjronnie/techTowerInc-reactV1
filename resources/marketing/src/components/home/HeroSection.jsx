import React from 'react';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import {
    SiReact,
    SiNextdotjs,
    SiVuedotjs,
    SiBootstrap,
    SiNodedotjs,
    SiPython,
    SiDocker,
    SiPostgresql,
    SiMongodb,
    SiFigma,
} from 'react-icons/si';

const HeroSection = () => {
    const { settings } = useSiteSettings();
    const hero = settings?.home_hero || {};
    const headlineText =
        hero.headline ||
        'Website design, SEO, and software that outshine competitors and drive revenue.';
    const emphasisText = hero.headline_emphasis || 'outshine competitors';
    const headlineParts = headlineText.split(emphasisText);
    const techIcons = [
        {
            Icon: SiReact,
            top: '12%',
            left: '8%',
            size: 42,
            delay: '0s',
            duration: '14s',
        },
        {
            Icon: SiNextdotjs,
            top: '18%',
            right: '12%',
            size: 40,
            delay: '2s',
            duration: '16s',
        },
        {
            Icon: SiVuedotjs,
            top: '45%',
            left: '4%',
            size: 36,
            delay: '1s',
            duration: '18s',
        },
        {
            Icon: SiBootstrap,
            top: '62%',
            left: '18%',
            size: 34,
            delay: '3s',
            duration: '15s',
        },
        {
            Icon: SiNodedotjs,
            top: '70%',
            right: '18%',
            size: 38,
            delay: '1s',
            duration: '17s',
        },
        {
            Icon: SiPython,
            top: '32%',
            right: '4%',
            size: 36,
            delay: '4s',
            duration: '19s',
        },
        {
            Icon: SiDocker,
            top: '78%',
            left: '50%',
            size: 40,
            delay: '2s',
            duration: '16s',
        },
        {
            Icon: SiPostgresql,
            top: '28%',
            left: '42%',
            size: 32,
            delay: '3s',
            duration: '20s',
        },
        {
            Icon: SiMongodb,
            top: '58%',
            right: '38%',
            size: 34,
            delay: '5s',
            duration: '18s',
        },
        {
            Icon: SiFigma,
            top: '40%',
            right: '26%',
            size: 30,
            delay: '2s',
            duration: '14s',
        },
    ];

    return (
        <section className="next-section-padding relative overflow-hidden bg-background pt-28 text-foreground md:pt-36">
            <div className="pointer-events-none absolute inset-0">
                {techIcons.map(
                    ({ Icon, size, delay, duration, ...position }, index) => (
                        <Icon
                            key={index}
                            className="float absolute text-white/10"
                            style={{
                                ...position,
                                width: `${size}px`,
                                height: `${size}px`,
                                animationDelay: delay,
                                animationDuration: duration,
                            }}
                        />
                    ),
                )}
            </div>

            <div className="next-container relative z-10 text-center">
                <h1 className="text-shadow-soft mt-6 text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
                    {headlineParts.length > 1 ? (
                        <>
                            {headlineParts[0]}
                            <span className="font-serif font-medium italic">
                                {emphasisText}
                            </span>
                            {headlineParts.slice(1).join(emphasisText)}
                        </>
                    ) : (
                        headlineText
                    )}
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    {hero.subheadline ||
                        'TechTower Inc delivers premium website design, SEO services, product strategy, and automation to help businesses in Uganda launch faster, engage users, and stay ahead of change.'}
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                        size="lg"
                        asChild
                        className="next-button rounded-full px-8"
                    >
                        <Link to={hero.primary_cta_href || '/contact'}>
                            {hero.primary_cta_label || 'Plan a Project'}{' '}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="next-button-outline rounded-full px-8"
                    >
                        <Link to={hero.secondary_cta_href || '/portfolio'}>
                            <PlayCircle className="mr-2 h-5 w-5" />{' '}
                            {hero.secondary_cta_label || 'View Portfolio'}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
