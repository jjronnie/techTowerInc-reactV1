import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@marketing/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Database, Globe, Shield, Smartphone, Cloud, Brain, Cpu } from 'lucide-react';
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
    features: (service.highlights || []).slice(0, 3),
  }));
  const intro = settings?.home_services_intro || {};

  return (
    <section className="next-section-padding bg-background">
      <div className="next-container">
        <motion.div
          className="text-left mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase text-muted-foreground tracking-[0.2em]">
            {intro.label || 'Services'}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground mt-3">
            {intro.heading || 'Built to accelerate your roadmap.'}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {intro.subheading ||
              'We design, engineer, and launch modern platforms across web, mobile, data, and security.'}
          </p>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`service-preview-skeleton-${index}`} className="next-card flex flex-col">
                <div className="shimmer h-12 w-12 rounded-xl mb-5" />
                <div className="shimmer h-5 w-3/4 rounded mb-3" />
                <div className="shimmer h-4 w-full rounded mb-2" />
                <div className="shimmer h-4 w-5/6 rounded mb-5" />
                <div className="space-y-2 mb-6">
                  {Array.from({ length: 3 }).map((__, featureIndex) => (
                    <div key={`preview-feature-${featureIndex}`} className="shimmer h-3 rounded" />
                  ))}
                </div>
                <div className="shimmer h-4 w-24 rounded mt-auto" />
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="text-sm text-red-400">Unable to load services right now.</div>
        )}
        {!loading && !error && (
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-3 rounded-xl bg-white/10 mb-5 inline-block self-start">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 flex-grow">
                  {service.short_description || service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="link" asChild className="p-0 h-auto text-sm mt-auto self-start text-primary">
                  <Link to={`/services/${service.slug}`}>Learn More <ArrowRight className="ml-1 w-4 h-4" /></Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div 
          className="text-left mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Button asChild size="lg" variant="outline" className="next-button-outline">
            <Link to="/services">Explore All Services <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
