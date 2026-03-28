import React from 'react';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const CtaSection = () => {
    const { settings } = useSiteSettings();
    const cta = settings?.home_cta || {};

    return (
        <section className="next-section-padding bg-background">
            <div className="next-container">
                <div className="card-hover next-card relative overflow-hidden p-10 text-center md:p-16 lg:p-20">
                    <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
                        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 p-3 transition-transform duration-300 hover:scale-110">
                            <Zap className="h-7 w-7 text-foreground" />
                        </div>
                        <h2 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
                            {cta.heading ||
                                'Ready to grow your business with website design and SEO?'}
                        </h2>
                        <p className="mb-10 text-lg text-balance text-muted-foreground">
                            {cta.body ||
                                'Share your goals with us and get a tailored plan for website design, development, and search engine optimization that drives real results.'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                asChild
                                className="next-button rounded-full px-10"
                            >
                                <Link
                                    to={
                                        cta.primary_cta_href ||
                                        '/contact#get-quote'
                                    }
                                >
                                    {cta.primary_cta_label || 'Get a Quote'}{' '}
                                    <FileText className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="next-button-outline rounded-full px-10"
                            >
                                <Link
                                    to={cta.secondary_cta_href || '/portfolio'}
                                >
                                    {cta.secondary_cta_label || 'View Projects'}{' '}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
