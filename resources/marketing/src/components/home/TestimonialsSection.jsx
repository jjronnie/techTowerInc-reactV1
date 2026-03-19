import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const ELFSIGHT_CACHE_KEY = 'techtower-elfsight-reviews-v2';
const ELFSIGHT_CACHE_TTL = 1000 * 60 * 60 * 5;
const ELFSIGHT_LOADED_SELECTOR = 'iframe';

const isWidgetLoaded = (html) => html && html.includes('<iframe');

const TestimonialsSection = () => {
  const { settings } = useSiteSettings();
  const testimonialConfig = settings?.home_testimonials || {};
  const [cachedMarkup, setCachedMarkup] = useState('');
  const [useCache, setUseCache] = useState(false);
  const [cacheChecked, setCacheChecked] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(ELFSIGHT_CACHE_KEY) || 'null');
      const isFresh =
        cached?.html &&
        cached?.timestamp &&
        Date.now() - cached.timestamp < ELFSIGHT_CACHE_TTL &&
        isWidgetLoaded(cached.html);

      if (isFresh) {
        setCachedMarkup(cached.html);
        setUseCache(true);
      } else if (cached?.html) {
        localStorage.removeItem(ELFSIGHT_CACHE_KEY);
      }
    } catch (error) {
      console.warn('Unable to read cached reviews widget', error);
    }
    setCacheChecked(true);
  }, []);

  useEffect(() => {
    if (!cacheChecked || useCache) {
      return;
    }

    const container = widgetRef.current;
    if (!container) {
      return;
    }

    const existingScript = document.querySelector('script[data-elfsight]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.dataset.elfsight = 'true';
      document.body.appendChild(script);
    }

    const observer = new MutationObserver(() => {
      const html = container.innerHTML || '';
      if (!html.trim().length) {
        return;
      }

      if (!container.querySelector(ELFSIGHT_LOADED_SELECTOR)) {
        return;
      }

      try {
        localStorage.setItem(
          ELFSIGHT_CACHE_KEY,
          JSON.stringify({ html, timestamp: Date.now() }),
        );
        setCachedMarkup(html);
      } catch (error) {
        console.warn('Unable to cache reviews widget', error);
      }

      observer.disconnect();
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [cacheChecked, useCache]);

  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="text-left mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {testimonialConfig.label || 'Client stories'}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground mt-3">
            {testimonialConfig.heading || 'Trusted by product leaders and innovators.'}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {testimonialConfig.subheading || 'Hear how teams are growing faster with TechTower on their side.'}
          </p>
        </motion.div>

        <div className="next-card overflow-hidden p-0 animate-fade-up">
          {useCache ? (
            <div
              ref={widgetRef}
              className="bg-white p-2 md:p-4"
              dangerouslySetInnerHTML={{ __html: cachedMarkup }}
            />
          ) : (
            <div className="bg-white p-2 md:p-4">
              <div
                ref={widgetRef}
                className="elfsight-app-7a915025-6dc3-47d8-983f-4b0ffd89a2b4 min-h-[22rem]"
                data-elfsight-app-lazy
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
