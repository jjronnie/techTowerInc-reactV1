import React from 'react';
import { motion } from 'framer-motion';
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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/siteData';

const iconMap = {
  'web-development': Globe,
  'mobile-app-development': Smartphone,
  'system-development-architecture': Database,
  'cloud-solutions-devops': Cloud,
  'cybersecurity-services': Shield,
  'digital-transformation-consulting': Zap,
  'ai-machine-learning': Brain,
  'iot-solutions-development': Cpu,
};

const ServicesPage = () => {
  const fadeInProps = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div className="bg-background text-foreground pt-24 md:pt-32 pb-16">
      <header className="next-container next-section-padding text-center">
        <motion.div {...fadeInProps()} className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            Service catalog
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-balance">
            Technology services designed to move your business faster.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            TechTower Inc blends strategy, design, and engineering to deliver web, mobile,
            data, and cloud solutions with measurable impact.
          </p>
        </motion.div>
      </header>

      <section className="next-section-padding pt-0">
        <div className="next-container">
          <div className="grid md:grid-cols-1 gap-8 md:gap-10">
            {servicesData.map((service, index) => {
              const Icon = iconMap[service.id] || Code;
              return (
              <motion.div
                key={service.id}
                id={service.id}
                className="next-card p-6 md:p-8 group"
                {...fadeInProps(index * 0.1)}
              >
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-0 mb-4 md:mr-6 md:mb-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-3 text-foreground">{service.title}</h2>
                    <p className="text-muted-foreground mb-5 text-base leading-relaxed">{service.description}</p>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {service.highlights.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <Button asChild variant="outline" size="sm" className="next-button-outline text-xs">
                        <Link to={`/services/${service.id}`}>View Service Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      <section className="next-section-padding">
        <div className="next-container text-center">
            <motion.div {...fadeInProps()}>
                <Code className="w-12 h-12 text-foreground mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                    Ready to map your next release?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 text-balance">
                    Share your goals and we will design the right delivery plan to accelerate impact.
                </p>
                <Button size="lg" asChild className="next-button rounded-full px-10">
                    <Link to="/contact">Book a Strategy Call</Link>
                </Button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
