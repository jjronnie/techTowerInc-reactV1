import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useApi } from '@marketing/hooks/useApi';
import Seo from '@marketing/components/Seo';
import {
    getServiceSeoContent,
    pickRelatedPostsForService,
    pickRelatedProjectsForService,
} from '@marketing/data/seoSupport';

const ServiceShowPage = () => {
    const { serviceId } = useParams();
    const { data, loading, error } = useApi(
        serviceId ? `/services/${serviceId}` : null,
        { skip: !serviceId },
    );
    const { data: postsData } = useApi('/posts?per_page=6');
    const { data: projectsData } = useApi('/portfolio?featured=1&sort=latest');
    const service = data?.data;
    const relatedPosts = useMemo(
        () =>
            pickRelatedPostsForService(service?.slug, postsData?.data || [], 3),
        [postsData?.data, service?.slug],
    );
    const relatedProjects = useMemo(
        () =>
            pickRelatedProjectsForService(
                service?.slug,
                projectsData?.data || [],
                2,
            ),
        [projectsData?.data, service?.slug],
    );

    if (loading) {
        return (
            <div className="bg-background pt-28 pb-16 text-foreground">
                <div className="next-container space-y-6">
                    <div className="shimmer mx-auto h-4 w-32 rounded" />
                    <div className="shimmer mx-auto h-10 w-2/3 rounded" />
                    <div className="shimmer mx-auto h-5 w-3/4 rounded" />
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="shimmer h-10 w-40 rounded-full" />
                        <div className="shimmer h-10 w-32 rounded-full" />
                    </div>
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="next-card space-y-4">
                            <div className="shimmer h-5 w-1/2 rounded" />
                            <div className="shimmer h-4 w-full rounded" />
                            <div className="shimmer h-4 w-5/6 rounded" />
                            <div className="space-y-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={`deliverable-${index}`}
                                        className="shimmer h-4 w-3/4 rounded"
                                    />
                                ))}
                            </div>
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

    if (error || !service) {
        return (
            <div className="bg-background pt-28 pb-16 text-foreground">
                <div className="next-container">
                    <h1 className="mb-4 text-3xl font-semibold">
                        Service not found
                    </h1>
                    <p className="mb-6 text-muted-foreground">
                        The service you are looking for does not exist yet.
                        Explore our full catalog.
                    </p>
                    <Button asChild className="next-button rounded-full px-8">
                        <Link to="/services">Back to Services</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const meta = {
        timeline: service.timeline || '6-10 weeks',
        deliverables: Array.isArray(service.deliverables)
            ? service.deliverables
            : [],
    };
    const seoContent = getServiceSeoContent(service.slug);

    return (
        <div className="bg-background pt-28 pb-16 text-foreground">
            <div className="next-container">
                <Seo
                    title={service.seo?.title || service.title}
                    description={
                        service.seo?.description ||
                        service.short_description ||
                        service.description
                    }
                    image={service.seo?.og_image_url}
                    keywords={service.seo?.keywords}
                />
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        Service details
                    </span>
                    <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
                        {service.title}
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground">
                        {service.short_description || service.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            className="next-button rounded-full px-8"
                        >
                            <Link to="/contact">
                                Start a Project{' '}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="next-button-outline rounded-full px-8"
                        >
                            <Link to="/services">View All Services</Link>
                        </Button>
                    </div>
                </motion.div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="next-card">
                        <h2 className="mb-4 text-xl font-semibold">
                            What we deliver
                        </h2>
                        <p className="mb-6 text-sm text-muted-foreground">
                            A curated scope built around your business
                            priorities, with weekly updates and clear
                            milestones.
                        </p>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {meta.deliverables.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="next-card">
                        <h2 className="mb-4 text-xl font-semibold">
                            Project snapshot
                        </h2>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <div>
                                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                    Estimated timeline
                                </p>
                                <p className="text-lg font-semibold text-foreground">
                                    {meta.timeline}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                    Team mix
                                </p>
                                <p>
                                    Product lead, design, engineering, QA,
                                    delivery manager.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                    Engagement model
                                </p>
                                <p>
                                    Dedicated squad with weekly demos and
                                    roadmap check-ins.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="next-card">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Why businesses invest in this service
                        </h2>
                        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                            {seoContent.overview.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8">
                        <div className="next-card">
                            <h2 className="mb-4 text-xl font-semibold">
                                Ideal for
                            </h2>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {seoContent.idealFor.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="next-card">
                            <h2 className="mb-4 text-xl font-semibold">
                                Expected outcomes
                            </h2>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {seoContent.outcomes.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="mb-6 text-2xl font-semibold">
                        How delivery works
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {seoContent.process.map((step, index) => (
                            <div key={step.title} className="next-card">
                                <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                                    Step {index + 1}
                                </p>
                                <h3 className="mb-3 text-xl font-semibold text-foreground">
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-7 text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {relatedProjects.length > 0 && (
                    <section className="mt-12">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Related case studies
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Examples of delivery work that support this
                                    service area.
                                </p>
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                className="next-button-outline rounded-full px-6"
                            >
                                <Link to="/portfolio">Explore portfolio</Link>
                            </Button>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            {relatedProjects.map((project) => (
                                <article
                                    key={project.id}
                                    className="next-card flex h-full flex-col"
                                >
                                    <p className="mb-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                        Case study
                                    </p>
                                    <h3 className="mb-3 text-2xl font-semibold text-foreground">
                                        {project.title}
                                    </h3>
                                    <p className="mb-6 text-sm leading-7 text-muted-foreground">
                                        {project.summary ||
                                            project.excerpt ||
                                            project.description}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-3">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="next-button-outline"
                                        >
                                            <Link
                                                to={`/project/${project.slug}`}
                                            >
                                                View project
                                            </Link>
                                        </Button>
                                        {project.client?.slug && (
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="px-0 text-primary"
                                            >
                                                <Link
                                                    to={`/clients/${project.client.slug}`}
                                                >
                                                    Client profile
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {relatedPosts.length > 0 && (
                    <section className="mt-12">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Helpful insights
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Articles that help buyers understand the
                                    strategy behind this service.
                                </p>
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                className="next-button-outline rounded-full px-6"
                            >
                                <Link to="/news">Browse all articles</Link>
                            </Button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedPosts.map((post) => (
                                <article key={post.slug} className="next-card">
                                    <p className="mb-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                        Insight article
                                    </p>
                                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                                        <Link
                                            to={`/news/${post.slug}`}
                                            className="transition hover:text-primary"
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mb-5 text-sm leading-7 text-muted-foreground">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        to={`/news/${post.slug}`}
                                        className="text-sm font-medium text-primary"
                                    >
                                        Read article
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-12">
                    <h2 className="mb-6 text-2xl font-semibold">
                        Frequently asked questions
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {seoContent.faqs.map((faq) => (
                            <article key={faq.question} className="next-card">
                                <h3 className="mb-3 text-lg font-semibold text-foreground">
                                    {faq.question}
                                </h3>
                                <p className="text-sm leading-7 text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServiceShowPage;
