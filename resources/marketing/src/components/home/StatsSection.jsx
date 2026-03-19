import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const initialStats = [
  { number: 220, label: 'Projects Delivered', suffix: '+' },
  { number: 475, label: 'Satisfied Clients', suffix: '+' },
  { number: 15, label: 'Expert Engineers', suffix: '+' },
  { number: 99.5, label: 'Client Retention', suffix: '%', decimals: 1 },
];

const StatsSection = () => {
  const { settings } = useSiteSettings();
  const stats = settings?.home_stats?.length ? settings.home_stats : initialStats;
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
      { threshold: 0.3 }
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
    <section ref={statsSectionRef} className="next-section-padding bg-black">
      <div className="next-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-semibold text-white mb-2">
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
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
