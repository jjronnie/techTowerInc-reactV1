import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle,
    Code,
    Database,
    Globe,
    Shield,
    Smartphone,
    Cloud,
    Brain,
    Cpu,
} from 'lucide-react';
import { useApi } from '@marketing/hooks/useApi';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const iconMap = {
    globe: Globe,
    smartphone: Smartphone,
    database: Database,
    shield: Shield,
    code: Code,
    cloud: Cloud,
    brain: Brain,
    cpu: Cpu,
    zap: Globe,
};

const ServicesPreviewSection = () => {
    const { settings } = useSiteSettings();
    const { data, loading, error } = useApi('/services');
    const servicesData = data?.data || [];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const previewServices = servicesData.slice(0, 3).map((service) => ({
        ...service,
        icon: iconMap[service.icon] || Globe,
        features: Array.isArray(service.highlights)
            ? service.highlights.slice(0, 3)
            : [],
    }));
    const intro = settings?.home_services_intro || {};

    return (
        <section className="next-section-padding bg-background">
            <div className="next-container">
                <motion.div
                    className="mb-16 max-w-2xl text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {intro.label || 'Services'}
                    </span>
                    <h2 className="mt-3 mb-4 text-3xl font-semibold text-foreground md:text-4xl">
                        {intro.heading || 'Built to accelerate your roadmap.'}
                    </h2>
                    <p className="text-lg text-balance text-muted-foreground">
                        {intro.subheading ||
                            'We design, engineer, and launch modern platforms across web, mobile, data, and security.'}
                    </p>
                </motion.div>

                {loading && (
                    <div className="grid gap-8 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={`service-preview-skeleton-${index}`}
                                className="next-card flex flex-col"
                            >
                                <div className="shimmer mb-5 h-12 w-12 rounded-xl" />
                                <div className="shimmer mb-3 h-5 w-3/4 rounded" />
                                <div className="shimmer mb-2 h-4 w-full rounded" />
                                <div className="shimmer mb-5 h-4 w-5/6 rounded" />
                                <div className="mb-6 space-y-2">
                                    {Array.from({ length: 3 }).map(
                                        (__, featureIndex) => (
                                            <div
                                                key={`preview-feature-${featureIndex}`}
                                                className="shimmer h-3 rounded"
                                            />
                                        ),
                                    )}
                                </div>
                                <div className="shimmer mt-auto h-4 w-24 rounded" />
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
                    <motion.div
                        className="grid gap-8 md:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {previewServices.map((service) => (
                            <motion.div
                                key={service.id}
                                className="next-card flex flex-col"
                                variants={itemVariants}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <div className="mb-5 inline-block self-start rounded-xl bg-white/10 p-3">
                                    <service.icon className="h-6 w-6 text-foreground" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-foreground">
                                    {service.title}
                                </h3>
                                <p className="mb-5 flex-grow text-sm text-muted-foreground">
                                    {service.short_description ||
                                        service.description}
                                </p>
                                <ul className="mb-6 space-y-2">
                                    {service.features.map(
                                        (feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-center text-xs text-muted-foreground"
                                            >
                                                <CheckCircle className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                                                {feature}
                                            </li>
                                        ),
                                    )}
                                </ul>
                                <Button
                                    variant="link"
                                    asChild
                                    className="mt-auto h-auto self-start p-0 text-sm text-primary"
                                >
                                    <Link to={`/services/${service.slug}`}>
                                        Learn More{' '}
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                <motion.div
                    className="mt-16 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="next-button-outline"
                    >
                        <Link to="/services">
                            Explore All Services{' '}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesPreviewSection;
