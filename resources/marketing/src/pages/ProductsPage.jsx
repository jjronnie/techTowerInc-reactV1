import React from 'react';
import { Button } from '@marketing/components/ui/button';
import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';

const ProductsPage = () => {
    const { settings } = useSiteSettings();
    const { data, loading, error } = useApi('/products');
    const products = data?.data || [];
    const pageCopy = settings?.products_page || {};

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <Seo
                title={pageCopy.header_title || 'Products'}
                description={pageCopy.header_subtitle}
            />
            <header className="next-container next-section-padding text-center">
                <div className="mx-auto max-w-3xl">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {pageCopy.header_label || 'Products'}
                    </span>
                    <h1 className="mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                        {pageCopy.header_title ||
                            'Software products built to scale alongside your business.'}
                    </h1>
                    <p className="text-lg text-balance text-muted-foreground md:text-xl">
                        {pageCopy.header_subtitle ||
                            'Explore the suite of platforms we design and deliver for teams that need speed, reliability, and measurable impact.'}
                    </p>
                </div>
            </header>

            <section className="next-section-padding pt-0">
                <div className="next-container">
                    {loading && (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={`product-skeleton-${index}`}
                                    className="next-card space-y-4"
                                >
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
                        <div className="text-sm text-red-400">
                            Unable to load products right now.
                        </div>
                    )}
                    {!loading && !error && (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product, index) => (
                                <div key={product.id} className="next-card">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                            {product.category}
                                        </span>
                                        <Boxes className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <h2 className="mb-3 text-xl font-semibold text-foreground">
                                        {product.name}
                                    </h2>
                                    <p className="mb-6 text-sm text-muted-foreground">
                                        {product.short_description ||
                                            product.description}
                                    </p>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="next-button-outline text-xs"
                                    >
                                        <Link
                                            to={
                                                product.slug
                                                    ? `/products/${product.slug}`
                                                    : '/products'
                                            }
                                        >
                                            View details
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
