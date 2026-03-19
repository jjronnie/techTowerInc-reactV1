import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import HomePortfolioShowcaseTile from '@marketing/components/home/HomePortfolioShowcaseTile';

const showcaseGridClass =
  'grid min-w-[62rem] grid-cols-[16rem_12rem_16rem_16rem] gap-3 md:min-w-[90rem] md:grid-cols-[23rem_18rem_23rem_23rem] md:gap-5';
const showcaseColumnHeightClass = 'h-[26rem] md:h-[40rem]';
const showcaseFadeClass =
  'pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-black/45 to-background md:h-40';

const PortfolioPreviewSection = () => {
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi('/portfolio?featured=1&sort=latest&home_showcase=1');
  const showcaseProjects = useMemo(
    () => (data?.data || []).filter((project) => project.home_featured_image_url).slice(0, 8),
    [data?.data]
  );
  const hasPortfolioProjects = showcaseProjects.length > 0;

  const intro = settings?.home_portfolio_intro || {};
  const renderEmptyTile = (key, className = '') => (
    <div key={key} className={className} />
  );
  const renderSkeletonTile = (key, className = '') => (
    <div key={key} className={className}>
      <div className="h-full overflow-hidden border border-white/10 bg-card/40 p-0">
        <div className="shimmer h-full w-full" />
      </div>
    </div>
  );
  const renderProjectTile = (project, key, className = '') => {
    if (!project) {
      return renderEmptyTile(key, className);
    }

    return (
      <HomePortfolioShowcaseTile
        key={project.id}
        project={project}
        className={className}
      />
    );
  };

  return (
    <section className="next-section-padding bg-background">
      <div className="mx-auto w-[90vw] max-w-[90vw]">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {intro.label || 'Portfolio'}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-4 text-foreground">
            {intro.heading || 'A closer look at the products and platforms we have shipped.'}
          </h2>
        </motion.div>

        {loading && (
          <div className="relative overflow-hidden">
            <div className="scrollbar-soft overflow-x-auto pb-8">
              <div className="mx-auto w-max px-1">
                <div className={showcaseGridClass}>
                  <div className={`grid grid-rows-2 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderSkeletonTile('portfolio-preview-skeleton-0')}
                    {renderSkeletonTile('portfolio-preview-skeleton-1')}
                  </div>

                  <div className={showcaseColumnHeightClass}>
                    {renderSkeletonTile('portfolio-preview-skeleton-2', 'h-full')}
                  </div>

                  <div className={`grid grid-cols-2 grid-rows-4 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderSkeletonTile('portfolio-preview-skeleton-3', 'col-span-2 row-span-2')}
                    {renderSkeletonTile('portfolio-preview-skeleton-4', 'row-span-2')}
                    {renderSkeletonTile('portfolio-preview-skeleton-5', 'row-span-2')}
                  </div>

                  <div className={`grid grid-rows-2 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderSkeletonTile('portfolio-preview-skeleton-6')}
                    {renderSkeletonTile('portfolio-preview-skeleton-7')}
                  </div>
                </div>
              </div>
              <div className={showcaseFadeClass} />
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-sm text-red-400">Unable to load portfolio right now.</div>
        )}
        {!loading && !error && hasPortfolioProjects && (
          <div className="relative overflow-hidden">
            <div className="scrollbar-soft overflow-x-auto pb-8">
              <div className="mx-auto w-max px-1">
                <div className={showcaseGridClass}>
                  <div className={`grid grid-rows-2 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderProjectTile(showcaseProjects[0], 'portfolio-slot-0')}
                    {renderProjectTile(showcaseProjects[1], 'portfolio-slot-1')}
                  </div>

                  <div className={showcaseColumnHeightClass}>
                    {renderProjectTile(showcaseProjects[2], 'portfolio-slot-2', 'h-full')}
                  </div>

                  <div className={`grid grid-cols-2 grid-rows-4 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderProjectTile(showcaseProjects[3], 'portfolio-slot-3', 'col-span-2 row-span-2')}
                    {renderProjectTile(showcaseProjects[4], 'portfolio-slot-4', 'row-span-2')}
                    {renderProjectTile(showcaseProjects[5], 'portfolio-slot-5', 'row-span-2')}
                  </div>

                  <div className={`grid grid-rows-2 gap-3 md:gap-5 ${showcaseColumnHeightClass}`}>
                    {renderProjectTile(showcaseProjects[6], 'portfolio-slot-6')}
                    {renderProjectTile(showcaseProjects[7], 'portfolio-slot-7')}
                  </div>
                </div>
              </div>
              <div className={showcaseFadeClass} />
            </div>
          </div>
        )}
        {!loading && !error && !hasPortfolioProjects && (
          <div className="next-card flex min-h-40 items-center justify-center text-center text-sm text-muted-foreground">
            Featured projects with home showcase images will appear here soon.
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-balance">
            {intro.subheading ||
              'Browse a curated wall of featured work, arranged to spotlight the digital experiences we are most proud of right now.'}
          </p>
          <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
            <Link to="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreviewSection;
