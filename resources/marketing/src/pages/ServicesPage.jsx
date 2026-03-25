import React from 'react';
import {
    Globe,
    Smartphone,
    Database,
    Cloud,
    Shield,
    CheckCircle,
    Brain,
    Code,
    Zap,
    Cpu,
} from 'lucide-react';
import { Button } from '@marketing/components/ui/button';
import { Link } from 'react-router-dom';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';
import Seo from '@marketing/components/Seo';
import { useReveal } from '@marketing/hooks/useReveal';

const iconMap = {
    globe: Globe,
    smartphone: Smartphone,
    database: Database,
    cloud: Cloud,
    shield: Shield,
    zap: Zap,
    brain: Brain,
    cpu: Cpu,
    code: Code,
};

const ServiceCard = ({ service, index }) => {
    const Icon = iconMap[service.icon] || Code;
    const ref = useReveal();

    return (
        <div
            ref={ref}
            id={service.slug}
            className={`reveal next-card card-hover group p-6 md:p-8`}
        >
            <div className="flex flex-col md:flex-row md:items-start">
                <div className="mr-0 mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-110 md:mr-6 md:mb-0">
                    <Icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-grow">
                    <h2 className="mb-3 text-2xl font-semibold text-foreground">
                        {service.title}
                    </h2>
                    <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                        {service.short_description || service.description}
                    </p>
                    <h3 className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        Key Features
                    </h3>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                        {(Array.isArray(service.highlights)
                            ? service.highlights
                            : []
                        ).map((feature, featureIndex) => (
                            <li
                                key={featureIndex}
                                className="flex items-center text-xs text-muted-foreground"
                            >
                                <CheckCircle className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="next-button-outline text-xs"
                        >
                            <Link to={`/services/${service.slug}`}>
                                View Service Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServicesPage = () => {
    const { settings } = useSiteSettings();
    const { data, loading, error } = useApi('/services');
    const servicesData = data?.data || [];
    const pageCopy = settings?.services_page || {};
    const headerRef = useReveal();
    const ctaRef = useReveal();

    return (
        <div className="bg-background pt-24 pb-16 text-foreground md:pt-32">
            <Seo
                title={pageCopy.header_title || 'Services'}
                description={pageCopy.header_subtitle}
            />
            <header className="next-container next-section-padding text-center">
                <div ref={headerRef} className="reveal mx-auto max-w-3xl">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {pageCopy.header_label || 'Service catalog'}
                    </span>
                    <h1 className="mb-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                        {pageCopy.header_title ||
                            'Technology services designed to move your business faster.'}
                    </h1>
                    <p className="text-lg text-balance text-muted-foreground md:text-xl">
                        {pageCopy.header_subtitle ||
                            'TechTower Inc blends strategy, design, and engineering to deliver web, mobile, data, and cloud solutions with measurable impact.'}
                    </p>
                </div>
            </header>

            <section className="next-section-padding pt-0">
                <div className="next-container">
                    {loading && (
                        <div className="grid gap-8 md:grid-cols-1 md:gap-10">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={`skeleton-${index}`}
                                    className="next-card p-6 md:p-8"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start">
                                        <div className="shimmer mb-4 h-12 w-12 rounded-xl md:mr-6 md:mb-0" />
                                        <div className="flex-grow space-y-3">
                                            <div className="shimmer h-6 w-1/3 rounded" />
                                            <div className="shimmer h-4 w-full rounded" />
                                            <div className="shimmer h-4 w-5/6 rounded" />
                                            <div className="shimmer mt-4 h-3 w-1/4 rounded" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {error && (
                        <div className="text-sm text-red-400">
                            Unable to load services right now.
                        </div>
                    )}
                    {!loading && !error && (
                        <div className="grid gap-8 md:grid-cols-1 md:gap-10">
                            {servicesData.map((service, index) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="next-section-padding">
                <div className="next-container text-center">
                    <div ref={ctaRef} className="reveal">
                        <Code className="mx-auto mb-6 h-12 w-12 text-foreground" />
                        <h2 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
                            {pageCopy.cta_heading ||
                                'Ready to map your next release?'}
                        </h2>
                        <p className="mx-auto mb-10 max-w-xl text-lg text-balance text-muted-foreground">
                            {pageCopy.cta_body ||
                                'Share your goals and we will design the right delivery plan to accelerate impact.'}
                        </p>
                        <Button
                            size="lg"
                            asChild
                            className="next-button rounded-full px-10"
                        >
                            <Link to={pageCopy.cta_button_href || '/contact'}>
                                {pageCopy.cta_button_label ||
                                    'Book a Strategy Call'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
