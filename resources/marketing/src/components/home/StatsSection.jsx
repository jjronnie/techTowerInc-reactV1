import React, { useState, useEffect, useRef } from 'react';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const initialStats = [
    { number: 220, label: 'Projects Delivered', suffix: '+' },
    { number: 475, label: 'Satisfied Clients', suffix: '+' },
    { number: 15, label: 'Expert Engineers', suffix: '+' },
    { number: 99.5, label: 'Client Retention', suffix: '%', decimals: 1 },
];

const StatsSection = () => {
    const { settings } = useSiteSettings();
    const stats = settings?.home_stats?.length
        ? settings.home_stats
        : initialStats;
    const [startCounter, setStartCounter] = useState(false);
    const statsSectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounter(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );

        if (statsSectionRef.current) {
            observer.observe(statsSectionRef.current);
        }

        return () => {
            if (statsSectionRef.current && observer) {
                observer.unobserve(statsSectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={statsSectionRef}
            className="next-section-padding bg-black"
        >
            <div className="next-container">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={stat.label}>
                            <div className="mb-2 text-3xl font-semibold text-white md:text-4xl">
                                {startCounter ? (
                                    <CountUp
                                        end={stat.number}
                                        duration={2.2}
                                        suffix={stat.suffix}
                                        decimals={stat.decimals || 0}
                                        separator=","
                                    />
                                ) : (
                                    `0${stat.suffix || ''}`
                                )}
                            </div>
                            <div className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
