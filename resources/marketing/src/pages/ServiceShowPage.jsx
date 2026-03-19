import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useApi } from '@marketing/hooks/useApi';
import Seo from '@marketing/components/Seo';

const ServiceShowPage = () => {
  const { serviceId } = useParams();
  const { data, loading, error } = useApi(serviceId ? `/services/${serviceId}` : null, { skip: !serviceId });
  const service = data?.data;

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
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="next-card space-y-4">
              <div className="shimmer h-5 w-1/2 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`deliverable-${index}`} className="shimmer h-4 w-3/4 rounded" />
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
      <div className="bg-background text-foreground pt-28 pb-16">
        <div className="next-container">
          <h1 className="text-3xl font-semibold mb-4">Service not found</h1>
          <p className="text-muted-foreground mb-6">
            The service you are looking for does not exist yet. Explore our full catalog.
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
    deliverables: service.deliverables || [],
  };

  return (
    <div className="bg-background text-foreground pt-28 pb-16">
      <div className="next-container">
        <Seo
          title={service.seo?.title || service.title}
          description={service.seo?.description || service.short_description || service.description}
          image={service.seo?.og_image_url}
          keywords={service.seo?.keywords}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Service details
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">{service.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{service.short_description || service.description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="next-button rounded-full px-8">
              <Link to="/contact">Start a Project <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">What we deliver</h2>
            <p className="text-sm text-muted-foreground mb-6">
              A curated scope built around your business priorities, with weekly updates and clear milestones.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {meta.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">Project snapshot</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estimated timeline</p>
                <p className="text-lg font-semibold text-foreground">{meta.timeline}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Team mix</p>
                <p>Product lead, design, engineering, QA, delivery manager.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Engagement model</p>
                <p>Dedicated squad with weekly demos and roadmap check-ins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowPage;
