import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FolderCard from '@/components/shared/FolderCard';
import { useApi } from '@/hooks/useApi';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const PortfolioPreviewSection = () => {
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi('/portfolio');
  const portfolioProjects = data?.data || [];
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let timeout;
    const handleScroll = () => {
      scroller.classList.add('is-scrolling');
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => scroller.classList.remove('is-scrolling'), 700);
    };
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeout);
    };
  }, []);

  const featured = portfolioProjects.slice(0, 2);
  const intro = settings?.home_portfolio_intro || {};

  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="text-left mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {intro.label || 'Portfolio'}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-4 text-foreground">
            {intro.heading || 'Latest case files from our delivery vault.'}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {intro.subheading ||
              'Two of our most recent builds, designed like the case file folders you saw in the inspiration screenshots.'}
          </p>
        </motion.div>

        {loading && (
          <div className="text-sm text-muted-foreground">Loading portfolio...</div>
        )}
        {error && (
          <div className="text-sm text-red-400">Unable to load portfolio right now.</div>
        )}
        {!loading && !error && (
          <div
            ref={scrollerRef}
            className="flex flex-nowrap gap-6 overflow-x-auto pb-6 scrollbar-soft"
          >
            {featured.map((project) => (
              <div key={project.id} className="min-w-[320px] sm:min-w-[420px] lg:flex-1">
                <FolderCard project={project} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
            <Link to="/portfolio">
              Explore Full Portfolio <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreviewSection;
