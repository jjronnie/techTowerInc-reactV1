import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@marketing/components/ui/button';
import { useApi } from '@marketing/hooks/useApi';
import Seo from '@marketing/components/Seo';

const ProductShowPage = () => {
  const { slug } = useParams();
  const { data, loading, error } = useApi(slug ? `/products/${slug}` : null, { skip: !slug });
  const product = data?.data;

  if (loading) {
    return (
      <div className="bg-background text-foreground pt-28 pb-16">
        <div className="next-container space-y-6">
          <div className="shimmer h-4 w-32 rounded mx-auto" />
          <div className="shimmer h-10 w-2/3 rounded mx-auto" />
          <div className="shimmer h-5 w-3/4 rounded mx-auto" />
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="shimmer h-10 w-40 rounded-full" />
            <div className="shimmer h-10 w-32 rounded-full" />
          </div>
          <div className="shimmer h-64 w-full rounded" />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="next-card space-y-4">
              <div className="shimmer h-5 w-1/2 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
            </div>
            <div className="next-card space-y-4">
              <div className="shimmer h-5 w-1/2 rounded" />
              <div className="shimmer h-6 w-2/3 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-background text-foreground pt-28 pb-16">
        <div className="next-container">
          <h1 className="text-3xl font-semibold mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you are looking for does not exist yet. Explore our full product lineup.
          </p>
          <Button asChild className="next-button rounded-full px-8">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const summary = product.short_description || product.description || '';
  const fullDescription = product.description || product.short_description || '';
  const categoryLabel = product.category || 'Product details';

  return (
    <div className="bg-background text-foreground pt-28 pb-16">
      <div className="next-container">
        <Seo
          title={product.seo?.title || product.name}
          description={product.seo?.description || summary}
          image={product.seo?.og_image_url || product.image_url}
          keywords={product.seo?.keywords}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            {categoryLabel}
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-8">{summary}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {product.purchase_url && (
              <Button asChild className="next-button rounded-full px-8">
                <a href={product.purchase_url} target="_blank" rel="noreferrer">
                  Visit product <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </motion.div>

        {product.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full rounded-xl border border-border/60 object-cover shadow-lg"
            />
          </motion.div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">Product details</h2>
            <p className="text-sm text-muted-foreground mb-6">{fullDescription}</p>
          </div>

          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">Product snapshot</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              {product.category && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</p>
                  <p className="text-lg font-semibold text-foreground">{product.category}</p>
                </div>
              )}
              {product.price && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting price</p>
                  <p className="text-2xl font-semibold text-foreground mt-2">{product.price}</p>
                </div>
              )}
              {product.purchase_url && (
                <div>
                  <a
                    href={product.purchase_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                  >
                    Open product link <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
            <Link to="/products">Back to Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowPage;
