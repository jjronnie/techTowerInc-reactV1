import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FolderCard from '@/components/shared/FolderCard';
import { useApi } from '@/hooks/useApi';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const PortfolioPreviewSection = () => {
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi('/portfolio?featured=1&sort=latest');
  const portfolioProjects = data?.data || [];
  const sectionRef = useRef(null);
  const sliderViewportRef = useRef(null);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDistance, setSlideDistance] = useState(0);
  const hasPortfolioProjects = portfolioProjects.length > 0;
  const shouldAnimate = portfolioProjects.length > 1;
  const sliderProjects = useMemo(() => {
    if (!shouldAnimate) {
      return portfolioProjects;
    }

    return [...portfolioProjects, ...portfolioProjects, ...portfolioProjects];
  }, [portfolioProjects, shouldAnimate]);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSliderActive(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const viewportElement = sliderViewportRef.current;

    if (!viewportElement) {
      return;
    }

    const updateSlideDistance = () => {
      const firstCard = viewportElement.querySelector('[data-portfolio-slide]');

      if (!firstCard) {
        setSlideDistance(0);
        return;
      }

      setSlideDistance(firstCard.getBoundingClientRect().width);
    };

    updateSlideDistance();

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            updateSlideDistance();
          });

    resizeObserver?.observe(viewportElement);

    const firstCard = viewportElement.querySelector('[data-portfolio-slide]');
    if (firstCard) {
      resizeObserver?.observe(firstCard);
    }

    window.addEventListener('resize', updateSlideDistance);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateSlideDistance);
    };
  }, [sliderProjects.length]);

  useEffect(() => {
    const viewportElement = sliderViewportRef.current;

    if (!viewportElement || !shouldAnimate || slideDistance === 0) {
      return;
    }

    viewportElement.scrollLeft = slideDistance * portfolioProjects.length;
  }, [portfolioProjects.length, shouldAnimate, slideDistance]);

  useEffect(() => {
    const viewportElement = sliderViewportRef.current;

    if (!viewportElement || !shouldAnimate || slideDistance === 0) {
      return;
    }

    const duplicateWidth = slideDistance * portfolioProjects.length;

    const normalizeScrollPosition = () => {
      if (viewportElement.scrollLeft < duplicateWidth * 0.5) {
        viewportElement.scrollLeft += duplicateWidth;
      } else if (viewportElement.scrollLeft > duplicateWidth * 1.5) {
        viewportElement.scrollLeft -= duplicateWidth;
      }
    };

    let settleTimeout;

    const handleScroll = () => {
      window.clearTimeout(settleTimeout);
      settleTimeout = window.setTimeout(() => {
        normalizeScrollPosition();
      }, 140);
    };

    viewportElement.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.clearTimeout(settleTimeout);
      viewportElement.removeEventListener('scroll', handleScroll);
    };
  }, [portfolioProjects.length, shouldAnimate, slideDistance]);

  useEffect(() => {
    const viewportElement = sliderViewportRef.current;

    if (
      !viewportElement ||
      !shouldAnimate ||
      !isSliderActive ||
      isHovered ||
      slideDistance === 0
    ) {
      return;
    }

    const slideInterval = window.setInterval(() => {
      viewportElement.scrollTo({
        left: viewportElement.scrollLeft + slideDistance,
        behavior: 'smooth',
      });
    }, 2800);

    return () => {
      window.clearInterval(slideInterval);
    };
  }, [isHovered, isSliderActive, portfolioProjects.length, shouldAnimate, slideDistance]);

  const intro = settings?.home_portfolio_intro || {};

  return (
    <section ref={sectionRef} className="next-section-padding bg-background">
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
            {intro.heading || 'Latest projects we have delivered.'}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {intro.subheading ||
              'Our most recent projects, built with performance, clarity, and long-term scale in mind.'}
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-nowrap items-stretch gap-6 overflow-hidden pb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`portfolio-preview-skeleton-${index}`}
                className="w-[min(86vw,26rem)] shrink-0 self-stretch"
              >
                <div className="next-card h-full space-y-4">
                  <div className="shimmer h-44 w-full rounded" />
                  <div className="shimmer h-5 w-1/2 rounded" />
                  <div className="shimmer h-4 w-5/6 rounded" />
                  <div className="shimmer h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="text-sm text-red-400">Unable to load portfolio right now.</div>
        )}
        {!loading && !error && hasPortfolioProjects && (
          <div
            ref={sliderViewportRef}
            className="portfolio-slider scrollbar-soft"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="portfolio-slider-track">
              {sliderProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  data-portfolio-slide
                  className="portfolio-slider-card"
                >
                  <FolderCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && !error && !hasPortfolioProjects && (
          <div className="next-card flex min-h-40 items-center justify-center text-sm text-muted-foreground">
            Featured projects will appear here soon.
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
