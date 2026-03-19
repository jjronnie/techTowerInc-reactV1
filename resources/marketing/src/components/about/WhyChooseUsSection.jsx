import React from 'react';
import { motion } from 'framer-motion';

const fallbackConfig = {
  badge_text: 'Why Choose Us',
  heading: 'Reasons businesses choose TechTower to build and grow online.',
  body: 'We combine thoughtful design, dependable engineering, and growth-focused execution so your digital presence does more than look good. It helps your business move.',
  image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
  image_alt: 'TechTower team collaborating in a strategy session',
  items: [
    {
      title: 'Professional Delivery',
      description: 'We communicate clearly, ship on time, and keep every project grounded in real business goals.',
      accent_color: '#6d5dfc',
    },
    {
      title: 'Quality That Performs',
      description: 'Our websites are fast, responsive, secure, and built to convert across devices.',
      accent_color: '#ff9f43',
    },
    {
      title: 'Growth-Focused Thinking',
      description: 'We pair design and engineering with SEO and conversion strategy so your investment keeps working.',
      accent_color: '#38b86b',
    },
  ],
};

const WhyChooseUsSection = ({ config }) => {
  const content = {
    ...fallbackConfig,
    ...config,
    items:
      Array.isArray(config?.items) && config.items.length > 0
        ? config.items
        : fallbackConfig.items,
  };

  return (
    <section className="next-section-padding">
      <div className="next-container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              {content.badge_text}
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {content.heading}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              {content.body}
            </p>
            <div className="next-card overflow-hidden p-0">
              <img
                src={content.image_url}
                alt={content.image_alt}
                className="aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-y-5"
          >
            {content.items.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="next-card border-white/10 bg-background/70 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    <span
                      className="mt-4 block h-1 w-20 rounded-full"
                      style={{
                        backgroundColor:
                          item.accent_color || fallbackConfig.items[index % fallbackConfig.items.length].accent_color,
                      }}
                    />
                  </div>
                  <span
                    className="mt-2 h-3.5 w-3.5 rounded-full"
                    style={{
                      backgroundColor:
                        item.accent_color || fallbackConfig.items[index % fallbackConfig.items.length].accent_color,
                    }}
                  />
                </div>
                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
