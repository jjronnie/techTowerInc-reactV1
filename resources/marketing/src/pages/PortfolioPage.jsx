import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import FolderCard from '@/components/shared/FolderCard';
import { useApi } from '@/hooks/useApi';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import Seo from '@/components/Seo';

const PortfolioPage = () => {
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi('/portfolio');
  const portfolioProjects = data?.data || [];
  const pageCopy = settings?.portfolio_page || {};
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <Seo
        title={pageCopy.header_title || 'Portfolio'}
        description={pageCopy.header_subtitle}
      />
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            {pageCopy.header_label || 'Portfolio vault'}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            {pageCopy.header_title || 'Projects that show how we deliver outcomes.'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {pageCopy.header_subtitle || 'A selection of projects crafted with performance, clarity, and long-term scale in mind.'}
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
          {loading && (
            <div className="grid gap-8 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`portfolio-skeleton-${index}`} className="next-card space-y-4">
                  <div className="shimmer h-56 w-full rounded" />
                  <div className="shimmer h-5 w-1/2 rounded" />
                  <div className="shimmer h-4 w-5/6 rounded" />
                  <div className="shimmer h-4 w-2/3 rounded" />
                  <div className="shimmer h-8 w-32 rounded" />
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-400">Unable to load portfolio right now.</div>
          )}
          {!loading && !error && (
            <div className="grid gap-8 lg:grid-cols-2">
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  {...fadeInProps(index * 0.1)}
                >
                  <FolderCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="next-section-padding">
        <div className="next-container text-center">
            <motion.div {...fadeInProps()}>
                <Layers className="w-12 h-12 text-foreground mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                    {pageCopy.cta_heading || 'Have a project in mind?'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-balance">
                    {pageCopy.cta_body || "Let's map the right delivery plan and build something extraordinary together."}
                </p>
                <Button size="lg" asChild className="next-button rounded-full px-10">
                    <Link to={pageCopy.cta_button_href || '/contact'}>{pageCopy.cta_button_label || 'Start Your Project'}</Link>
                </Button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
