import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { Layers } from 'lucide-react';
import FolderCard from '@marketing/components/shared/FolderCard';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';

const PortfolioPage = () => {
  const { categorySlug } = useParams();
  const { settings } = useSiteSettings();
  const activeCategory = categorySlug || null;
  const apiPath = activeCategory
    ? `/portfolio?category=${encodeURIComponent(activeCategory)}`
    : '/portfolio';
  const { data, loading, error } = useApi(apiPath);
  const portfolioProjects = data?.data || [];
  const pageCopy = settings?.portfolio_page || {};
  const [activeTypeSlug, setActiveTypeSlug] = useState('all');
  const activeCategoryLabel = activeCategory
    ? activeCategory
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : null;
  const availableTypes = useMemo(() => {
    const typeMap = new Map();

    portfolioProjects.forEach((project) => {
      (project.types || []).forEach((type) => {
        if (!type?.slug || typeMap.has(type.slug)) {
          return;
        }

        typeMap.set(type.slug, type);
      });
    });

    return Array.from(typeMap.values());
  }, [portfolioProjects]);
  const filteredProjects = useMemo(() => {
    if (activeTypeSlug === 'all') {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) =>
      (project.types || []).some((type) => type.slug === activeTypeSlug)
    );
  }, [activeTypeSlug, portfolioProjects]);

  useEffect(() => {
    if (
      activeTypeSlug !== 'all' &&
      !availableTypes.some((type) => type.slug === activeTypeSlug)
    ) {
      setActiveTypeSlug('all');
    }
  }, [activeTypeSlug, availableTypes]);

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
          <div className="mb-4 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {pageCopy.header_label || 'Portfolio vault'}
            </span>
            {activeCategoryLabel && (
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary/12"
              >
                {activeCategoryLabel}
                <span className="text-[10px] text-primary/70">Clear</span>
              </Link>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            {pageCopy.header_title || 'Projects that show how we deliver outcomes.'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {pageCopy.header_subtitle || 'A selection of projects crafted with performance, clarity, and long-term scale in mind.'}
          </p>
        </motion.div>

        {!loading && !error && availableTypes.length > 0 && (
          <motion.div
            {...fadeInProps(0.1)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          >
            <button
              type="button"
              onClick={() => setActiveTypeSlug('all')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeTypeSlug === 'all'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Projects
            </button>
            {availableTypes.map((type) => (
              <button
                key={type.slug}
                type="button"
                onClick={() => setActiveTypeSlug(type.slug)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  activeTypeSlug === type.slug
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'inline-flex items-center gap-3 text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`}
              >
                {activeTypeSlug !== type.slug && (
                  <span className="text-primary/50">+</span>
                )}
                <span>{type.name}</span>
              </button>
            ))}
          </motion.div>
        )}
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
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="h-full"
                  {...fadeInProps(index * 0.1)}
                >
                  <FolderCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="next-card text-center">
              <p className="text-lg text-foreground">No projects match this filter yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another type or explore the full portfolio.
              </p>
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
