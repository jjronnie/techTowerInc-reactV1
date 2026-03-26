import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    CalendarDays,
    Tag,
    UserCircle,
    Facebook,
    Linkedin,
    Mail,
    Twitter,
    Copy,
} from 'lucide-react';
import { Button } from '@marketing/components/ui/button';
import { toast } from '@marketing/components/ui/use-toast';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';
import {
    pickRelatedProjectsForPost,
    pickRelatedServicesForPost,
} from '@marketing/data/seoSupport';

const SinglePostPage = () => {
    const { slug } = useParams();
    const { settings } = useSiteSettings();
    const { data, loading, error } = useApi(slug ? `/posts/${slug}` : null, {
        skip: !slug,
    });
    const { data: servicesData } = useApi('/services');
    const { data: projectsData } = useApi('/portfolio?featured=1&sort=latest');
    const post = data?.data;
    const relatedServices = useMemo(
        () => pickRelatedServicesForPost(post, servicesData?.data || [], 3),
        [post, servicesData?.data],
    );
    const relatedProjects = useMemo(
        () => pickRelatedProjectsForPost(post, projectsData?.data || [], 2),
        [post, projectsData?.data],
    );

    if (loading) {
        return (
            <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
                <div className="next-container space-y-6">
                    <div className="shimmer h-4 w-32 rounded" />
                    <div className="shimmer h-10 w-3/4 rounded" />
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="shimmer h-4 w-28 rounded" />
                        <div className="shimmer h-4 w-40 rounded" />
                    </div>
                    <div className="shimmer h-64 w-full rounded-lg" />
                    <div className="space-y-3">
                        <div className="shimmer h-4 w-full rounded" />
                        <div className="shimmer h-4 w-5/6 rounded" />
                        <div className="shimmer h-4 w-4/5 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="next-container next-section-padding text-center">
                <h1 className="text-3xl font-bold">Post not found</h1>
                <p className="mt-4 text-muted-foreground">
                    The news post you are looking for does not exist.
                </p>
                <Button asChild className="mt-8">
                    <Link to="/news">Back to News</Link>
                </Button>
            </div>
        );
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const siteName = settings?.site_name || 'TechTower Innovations';
    const shareText = `Check out this article from ${siteName}: ${post.title}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const socialLinks = [
        {
            label: 'Share on X',
            href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            icon: Twitter,
        },
        {
            label: 'Share on Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: Facebook,
        },
        {
            label: 'Share on LinkedIn',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: Linkedin,
        },
        {
            label: 'Share by email',
            href: `mailto:?subject=${encodedText}&body=${encodedUrl}`,
            icon: Mail,
        },
    ];

    const handleCopyLink = async () => {
        if (!shareUrl) {
            return;
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            toast({
                title: 'Link copied',
                description: 'The article link is ready to share.',
            });
        } catch (error) {
            console.error('Error copying link:', error);
            toast({
                title: 'Copy failed',
                description:
                    'We could not copy the link automatically. Please copy it manually.',
            });
        }
    };

    const categories = Array.isArray(post.categories) ? post.categories : [];
    const primaryCategory = post.primary_category || categories[0] || null;
    const ogImage = post.seo?.og_image_url || post.featured_image_url;
    const metaDescription = post.seo?.description || post.excerpt || '';

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <div className="next-container">
                <Seo
                    title={post.seo?.title || post.title}
                    description={metaDescription}
                    image={ogImage}
                    canonical={post.seo?.canonical_url}
                    robots={post.seo?.robots}
                    keywords={post.seo?.keywords}
                    type="article"
                    publishedTime={post.published_at}
                    modifiedTime={post.updated_at}
                />
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        asChild
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        <Link to="/news">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
                        </Link>
                    </Button>
                </div>

                <article>
                    <header className="mb-12 text-center">
                        <div>
                            {primaryCategory && (
                                <div className="mb-4 flex flex-wrap justify-center gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/news/category/${category.slug}`}
                                            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <h1 className="mb-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <UserCircle className="mr-1.5 h-4 w-4" />
                                    <span>
                                        {post.author_name || 'TechTower'}
                                    </span>
                                </div>
                                {post.published_at && (
                                    <div className="flex items-center">
                                        <CalendarDays className="mr-1.5 h-4 w-4" />
                                        <time dateTime={post.published_at}>
                                            {new Date(
                                                post.published_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="mb-12 aspect-[16/9] overflow-hidden rounded-lg shadow-lg md:aspect-[2/1]">
                        <img
                            alt={post.image_alt || post.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            src={
                                post.featured_image_url ||
                                'https://images.unsplash.com/photo-1504983875-d3b163aba9e6'
                            }
                        />
                    </div>

                    <div
                        className="legacy-prose legacy-prose-lg mx-auto max-w-none text-foreground"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <footer className="mt-12 border-t border-border pt-8">
                        <div className="mb-6 flex flex-wrap items-center">
                            <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
                            <span className="mr-2 text-sm font-semibold text-muted-foreground">
                                Tags:
                            </span>
                            {Array.isArray(post.tags) &&
                            post.tags.length > 0 ? (
                                post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="mr-2 mb-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">
                                    No tags added yet.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-semibold text-muted-foreground">
                                Share:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Button
                                            key={link.label}
                                            variant="outline"
                                            size="icon"
                                            asChild
                                            aria-label={link.label}
                                        >
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    );
                                })}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleCopyLink}
                                    aria-label="Copy link"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </footer>
                </article>

                {(relatedServices.length > 0 || relatedProjects.length > 0) && (
                    <section className="mt-16 space-y-10">
                        {relatedServices.length > 0 && (
                            <div>
                                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-foreground">
                                            Related services
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            If this topic matches your next
                                            project, these are the service pages
                                            to explore next.
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="next-button-outline rounded-full px-6"
                                    >
                                        <Link to="/services">All services</Link>
                                    </Button>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    {relatedServices.map((service) => (
                                        <article
                                            key={service.slug}
                                            className="next-card"
                                        >
                                            <p className="mb-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                                Service
                                            </p>
                                            <h3 className="mb-3 text-xl font-semibold text-foreground">
                                                <Link
                                                    to={`/services/${service.slug}`}
                                                    className="transition hover:text-primary"
                                                >
                                                    {service.title}
                                                </Link>
                                            </h3>
                                            <p className="mb-5 text-sm leading-7 text-muted-foreground">
                                                {service.short_description ||
                                                    service.description}
                                            </p>
                                            <Link
                                                to={`/services/${service.slug}`}
                                                className="text-sm font-medium text-primary"
                                            >
                                                View service
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {relatedProjects.length > 0 && (
                            <div>
                                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-foreground">
                                            Related case studies
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Recent project examples connected to
                                            the ideas covered in this article.
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="next-button-outline rounded-full px-6"
                                    >
                                        <Link to="/portfolio">Portfolio</Link>
                                    </Button>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    {relatedProjects.map((project) => (
                                        <article
                                            key={project.id}
                                            className="next-card"
                                        >
                                            <p className="mb-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                                Project
                                            </p>
                                            <h3 className="mb-3 text-2xl font-semibold text-foreground">
                                                <Link
                                                    to={`/project/${project.slug}`}
                                                    className="transition hover:text-primary"
                                                >
                                                    {project.title}
                                                </Link>
                                            </h3>
                                            <p className="mb-5 text-sm leading-7 text-muted-foreground">
                                                {project.summary ||
                                                    project.excerpt ||
                                                    project.description}
                                            </p>
                                            <Link
                                                to={`/project/${project.slug}`}
                                                className="text-sm font-medium text-primary"
                                            >
                                                View case study
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default SinglePostPage;
