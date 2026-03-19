import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';

const BlogPage = () => {
  const { categorySlug } = useParams();
  const { settings } = useSiteSettings();
  const activeCategory = categorySlug || null;
  const apiPath = activeCategory
    ? `/posts?category=${encodeURIComponent(activeCategory)}`
    : '/posts';
  const { data, loading, error } = useApi(apiPath);
  const blogPosts = data?.data || [];
  const pageCopy = settings?.blog_page || {};
  const activeCategoryLabel = activeCategory
    ? activeCategory
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : null;

  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <Seo
        title={pageCopy.header_title || 'News'}
        description={pageCopy.header_subtitle}
      />
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <div className="mb-4 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {pageCopy.header_label || 'Tech Insights'}
            </span>
            {activeCategoryLabel && (
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary/12"
              >
                {activeCategoryLabel}
                <span className="text-[10px] text-primary/70">Clear</span>
              </Link>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
           {pageCopy.header_title || 'Stories, insights, and engineering breakthroughs.'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {pageCopy.header_subtitle ||
              'Fresh perspectives from the TechTower team on building, scaling, and operating modern products.'}
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
          {loading && (
            <div className="grid md:grid-cols-2  gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`post-skeleton-${index}`} className="next-card flex flex-col overflow-hidden">
                  <div className="shimmer h-40 w-full" />
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="shimmer h-3 w-16 rounded" />
                      <div className="shimmer h-3 w-10 rounded" />
                    </div>
                    <div className="shimmer h-5 w-4/5 rounded" />
                    <div className="shimmer h-4 w-full rounded" />
                    <div className="shimmer h-4 w-5/6 rounded" />
                    <div className="flex items-center justify-between mt-auto">
                      <div className="shimmer h-3 w-24 rounded" />
                      <div className="shimmer h-3 w-20 rounded" />
                    </div>
                    <div className="shimmer h-4 w-24 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-400">Unable to load posts right now.</div>
          )}
          {!loading && !error && (
            <div className="grid md:grid-cols-2  gap-8">
              {blogPosts.map((post, index) => {
                const categories = post.categories || [];
                const primaryCategory = post.primary_category || categories[0] || null;

                return (
                <motion.article
                  key={post.slug}
                  className="next-card flex flex-col overflow-hidden group"
                  {...fadeInProps(index * 0.1)}
                >
                  <Link to={`/news/${post.slug}`} className="block aspect-video overflow-hidden">
                    <img
                      src={post.featured_image_url || 'https://images.unsplash.com/photo-1504983875-d3b163aba9e6'}
                      alt={post.image_alt || post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {primaryCategory ? (
                        <Link
                          to={`/news/category/${primaryCategory.slug}`}
                          className="transition hover:text-foreground"
                        >
                          {primaryCategory.name}
                        </Link>
                      ) : (
                        <span>Insight</span>
                      )}
                      <span>Insight</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-foreground">
                      <Link to={`/news/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground text-sm mb-5 flex-grow">{post.excerpt}</p>
                    {categories.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2">
                        {categories.slice(0, 3).map((category) => (
                          <Link
                            key={`${post.id}-${category.id}`}
                            to={`/news/category/${category.slug}`}
                            className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        <UserCircle className="w-3.5 h-3.5 mr-1.5" />
                        <span>{post.author_name || 'TechTower'}</span>
                      </div>
                      {post.published_at && (
                        <div className="flex items-center">
                          <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                          <time dateTime={post.published_at}>
                            {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                        </div>
                      )}
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-sm mt-5 self-start text-primary">
                      <Link to={`/news/${post.slug}`}>
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.article>
              )})}
            </div>
          )}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="next-card text-center">
              <p className="text-lg text-foreground">No posts match this category yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another category or browse the full news archive.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
