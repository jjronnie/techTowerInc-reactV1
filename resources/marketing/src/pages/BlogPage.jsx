import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';

const BlogPage = () => {
    const { categorySlug } = useParams();
    const location = useLocation();
    const { settings } = useSiteSettings();
    const activeCategory = categorySlug || null;
    const searchParams = new URLSearchParams(location.search);
    const parsedPage = Number(searchParams.get('page') || '1');
    const currentPage =
        Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const query = new URLSearchParams();

    if (activeCategory) {
        query.set('category', activeCategory);
    }

    if (currentPage > 1) {
        query.set('page', String(currentPage));
    }

    const apiPath = `/posts${query.toString() ? `?${query.toString()}` : ''}`;
    const { data, loading, error } = useApi(apiPath);
    const blogPosts = data?.data || [];
    const pagination = data?.meta || null;
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
        transition: { duration: 0.6, delay },
    });
    const buildPageUrl = (page) => {
        const params = new URLSearchParams();

        if (page > 1) {
            params.set('page', String(page));
        }

        const basePath = activeCategory
            ? `/news/category/${activeCategory}`
            : '/news';
        const nextQuery = params.toString();

        return nextQuery ? `${basePath}?${nextQuery}` : basePath;
    };

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <Seo
                title={
                    pageCopy.header_title || 'Tech News & Insights | TechTower'
                }
                description={pageCopy.header_subtitle}
            />
            <header className="next-container next-section-padding text-center">
                <motion.div {...fadeInProps()} className="mx-auto max-w-3xl">
                    <div className="mb-4 flex flex-wrap justify-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                            {pageCopy.header_label || 'Tech Insights'}
                        </span>
                        {activeCategoryLabel && (
                            <Link
                                to="/news"
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase transition hover:bg-primary/12"
                            >
                                {activeCategoryLabel}
                                <span className="text-[10px] text-primary/70">
                                    Clear
                                </span>
                            </Link>
                        )}
                    </div>
                    <h1 className="mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                        {pageCopy.header_title ||
                            'Stories, insights, and engineering breakthroughs.'}
                    </h1>
                    <p className="text-lg text-balance text-muted-foreground md:text-xl">
                        {pageCopy.header_subtitle ||
                            'Fresh perspectives from the TechTower team on building, scaling, and operating modern products.'}
                    </p>
                </motion.div>
            </header>

            <section className="next-section-padding pt-0">
                <div className="next-container">
                    {loading && (
                        <div className="grid gap-8 md:grid-cols-2">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={`post-skeleton-${index}`}
                                    className="next-card flex flex-col overflow-hidden"
                                >
                                    <div className="shimmer h-40 w-full" />
                                    <div className="flex flex-grow flex-col space-y-3 p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="shimmer h-3 w-16 rounded" />
                                            <div className="shimmer h-3 w-10 rounded" />
                                        </div>
                                        <div className="shimmer h-5 w-4/5 rounded" />
                                        <div className="shimmer h-4 w-full rounded" />
                                        <div className="shimmer h-4 w-5/6 rounded" />
                                        <div className="mt-auto flex items-center justify-between">
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
                        <div className="text-sm text-red-400">
                            Unable to load posts right now.
                        </div>
                    )}
                    {!loading && !error && (
                        <div className="grid gap-8 md:grid-cols-2">
                            {blogPosts.map((post, index) => {
                                const categories = Array.isArray(
                                    post.categories,
                                )
                                    ? post.categories
                                    : [];
                                const primaryCategory =
                                    post.primary_category ||
                                    categories[0] ||
                                    null;

                                return (
                                    <article
                                        key={post.slug}
                                        className="reveal next-card card-hover group flex flex-col overflow-hidden"
                                    >
                                        <Link
                                            to={`/news/${post.slug}`}
                                            className="block aspect-video overflow-hidden"
                                        >
                                            <img
                                                src={
                                                    post.featured_image_url ||
                                                    'https://images.unsplash.com/photo-1504983875-d3b163aba9e6'
                                                }
                                                alt={
                                                    post.image_alt || post.title
                                                }
                                                className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </Link>
                                        <div className="flex flex-grow flex-col p-6">
                                            <div className="mb-4 flex items-center justify-between text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
                                            <h2 className="mb-3 text-xl font-semibold text-foreground">
                                                <Link
                                                    to={`/news/${post.slug}`}
                                                    className="transition-colors hover:text-primary"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <p className="mb-5 flex-grow text-sm text-muted-foreground">
                                                {post.excerpt}
                                            </p>
                                            {categories.length > 0 && (
                                                <div className="mb-5 flex flex-wrap gap-2">
                                                    {categories
                                                        .slice(0, 3)
                                                        .map((category) => (
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
                                            <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                                                <div className="flex items-center">
                                                    <UserCircle className="mr-1.5 h-3.5 w-3.5" />
                                                    <span>
                                                        {post.author_name ||
                                                            'TechTower'}
                                                    </span>
                                                </div>
                                                {post.published_at && (
                                                    <div className="flex items-center">
                                                        <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                                                        <time
                                                            dateTime={
                                                                post.published_at
                                                            }
                                                        >
                                                            {new Date(
                                                                post.published_at,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </time>
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                asChild
                                                variant="link"
                                                className="mt-5 h-auto self-start p-0 text-sm text-primary"
                                            >
                                                <Link to={`/news/${post.slug}`}>
                                                    Read More{' '}
                                                    <ArrowRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                    {!loading && !error && blogPosts.length === 0 && (
                        <div className="next-card text-center">
                            <p className="text-lg text-foreground">
                                No posts match this category yet.
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Try another category or browse the full news
                                archive.
                            </p>
                        </div>
                    )}
                    {!loading && !error && pagination?.last_page > 1 && (
                        <div className="mt-12 flex flex-col items-center gap-4">
                            <p className="text-sm text-muted-foreground">
                                Page {pagination.current_page} of{' '}
                                {pagination.last_page}
                            </p>
                            <nav
                                aria-label="News pagination"
                                className="flex flex-wrap items-center justify-center gap-2"
                            >
                                {pagination.current_page > 1 && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="next-button-outline"
                                    >
                                        <Link
                                            to={buildPageUrl(
                                                pagination.current_page - 1,
                                            )}
                                        >
                                            Previous page
                                        </Link>
                                    </Button>
                                )}
                                {Array.from(
                                    { length: pagination.last_page },
                                    (_, index) => index + 1,
                                ).map((page) => (
                                    <Link
                                        key={`news-page-${page}`}
                                        to={buildPageUrl(page)}
                                        className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-4 text-sm transition ${
                                            page === pagination.current_page
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                                        }`}
                                        aria-current={
                                            page === pagination.current_page
                                                ? 'page'
                                                : undefined
                                        }
                                    >
                                        {page}
                                    </Link>
                                ))}
                                {pagination.current_page <
                                    pagination.last_page && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="next-button-outline"
                                    >
                                        <Link
                                            to={buildPageUrl(
                                                pagination.current_page + 1,
                                            )}
                                        >
                                            Next page
                                        </Link>
                                    </Button>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
