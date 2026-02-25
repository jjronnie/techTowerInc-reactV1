import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/siteData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';

const ProductsPage = () => {
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Products
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            Software products built to scale alongside your business.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Explore the suite of platforms we design and deliver for teams that need speed,
            reliability, and measurable impact.
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
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
                <p className="text-sm text-muted-foreground mb-6">{product.description}</p>
                <Button asChild variant="outline" size="sm" className="next-button-outline text-xs">
                  <Link to="/contact">Request a Demo</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
