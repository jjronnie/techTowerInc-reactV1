import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { servicesData } from '@/data/siteData';

const serviceMeta = {
  'web-development': {
    timeline: '6-10 weeks',
    deliverables: ['UX research', 'UI design system', 'Frontend build', 'CMS integration', 'Launch support'],
  },
  'mobile-app-development': {
    timeline: '8-14 weeks',
    deliverables: ['Product strategy', 'Mobile UI/UX', 'App build', 'QA + testing', 'Store launch'],
  },
  'system-development-architecture': {
    timeline: '10-16 weeks',
    deliverables: ['System architecture', 'API design', 'Database modeling', 'Infrastructure setup', 'Monitoring'],
  },
  'cloud-solutions-devops': {
    timeline: '4-8 weeks',
    deliverables: ['Cloud audit', 'Migration plan', 'CI/CD pipeline', 'Infrastructure as code', 'Security hardening'],
  },
  'cybersecurity-services': {
    timeline: '3-6 weeks',
    deliverables: ['Security assessment', 'Penetration testing', 'Compliance reporting', 'Mitigation roadmap', 'Training'],
  },
  'digital-transformation-consulting': {
    timeline: '4-8 weeks',
    deliverables: ['Discovery workshops', 'Process mapping', 'Tech roadmap', 'Change enablement', 'Success metrics'],
  },
  'ai-machine-learning': {
    timeline: '8-12 weeks',
    deliverables: ['Data strategy', 'Model development', 'MVP deployment', 'Performance tuning', 'Monitoring'],
  },
  'iot-solutions-development': {
    timeline: '8-14 weeks',
    deliverables: ['Device integration', 'Edge computing', 'Data pipelines', 'IoT dashboard', 'Security model'],
  },
};

const ServiceShowPage = () => {
  const { serviceId } = useParams();
  const service = servicesData.find((item) => item.id === serviceId);

  if (!service) {
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

  const meta = serviceMeta[service.id] || { timeline: '6-10 weeks', deliverables: [] };

  return (
    <div className="bg-background text-foreground pt-28 pb-16">
      <div className="next-container">
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
          <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
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
