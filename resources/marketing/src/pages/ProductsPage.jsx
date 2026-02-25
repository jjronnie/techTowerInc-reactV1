import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import Seo from '@/components/Seo';

const ProductsPage = () => {
  const { settings } = useSiteSettings();
  const { data, loading, error } = useApi('/products');
  const products = data?.data || [];
  const pageCopy = settings?.products_page || {};
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <Seo
        title={pageCopy.header_title || 'Products'}
        description={pageCopy.header_subtitle}
      />
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            {pageCopy.header_label || 'Products'}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            {pageCopy.header_title || 'Software products built to scale alongside your business.'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {pageCopy.header_subtitle ||
              'Explore the suite of platforms we design and deliver for teams that need speed, reliability, and measurable impact.'}
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`product-skeleton-${index}`} className="next-card space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="shimmer h-3 w-20 rounded" />
                    <div className="shimmer h-5 w-5 rounded" />
                  </div>
                  <div className="shimmer h-5 w-2/3 rounded" />
                  <div className="shimmer h-4 w-full rounded" />
                  <div className="shimmer h-4 w-5/6 rounded" />
                  <div className="shimmer h-8 w-32 rounded" />
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-400">Unable to load products right now.</div>
          )}
          {!loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="next-card"
                  {...fadeInProps(index * 0.1)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</span>
                    <Boxes className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">{product.name}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{product.short_description || product.description}</p>
                  <Button asChild variant="outline" size="sm" className="next-button-outline text-xs">
                    <Link to="/contact">Request a Demo</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
