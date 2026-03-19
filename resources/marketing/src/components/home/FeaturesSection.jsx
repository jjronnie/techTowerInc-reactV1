import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Database, Globe, Layers, Shield, Users, Zap } from 'lucide-react';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const FeaturesSection = () => {
  const { settings } = useSiteSettings();
  const iconMap = {
    globe: Globe,
    layers: Layers,
    cpu: Cpu,
    shield: Shield,
    database: Database,
    zap: Zap,
    code: Code,
    users: Users,
  };
  const featuresConfig = settings?.home_features || {};
  const features = featuresConfig.items?.length
    ? featuresConfig.items.map((feature) => ({
        icon: iconMap[feature.icon_key] || Globe,
        title: feature.title,
        description: feature.description,
      }))
    : [
        {
          icon: Globe,
          title: 'Modern Web Solutions',
          description: "Crafting responsive, high-performance websites and PWA's using the latest technologies.",
        },
        {
          icon: Layers,
          title: 'Scalable System Architecture',
          description: 'Designing robust and scalable systems that grow with your business needs.',
        },
        {
          icon: Cpu,
          title: 'AI & ML Integration',
          description: 'Leveraging artificial intelligence to build smarter, more efficient applications.',
        },
        {
          icon: Shield,
          title: 'Cybersecurity Focused',
          description: 'Prioritizing security in every layer of development to protect your digital assets.',
        },
        {
          icon: Database,
          title: 'Data-Driven Insights',
          description: 'Unlock the power of your data with advanced analytics and business intelligence.',
        },
        {
          icon: Zap,
          title: 'Agile Development',
          description: 'Iterative and flexible approach to deliver high-quality software faster.',
        },
      ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
            {featuresConfig.label || 'Why TechTower'}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-3 mb-4 text-foreground">
            {featuresConfig.heading || 'Modern product delivery with a relentless focus on outcomes.'}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {featuresConfig.subheading ||
              'We blend engineering, design, and growth strategy to help teams build faster, iterate smarter, and ship with confidence.'}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
            <motion.div
              key={index}
              className="next-card flex flex-col items-start text-left"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 rounded-xl bg-white/10 mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
