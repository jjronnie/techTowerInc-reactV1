import React from 'react';
import {
    Code,
    Cpu,
    Database,
    Globe,
    Layers,
    Shield,
    Users,
    Zap,
} from 'lucide-react';
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
                  description:
                      "Crafting responsive, high-performance websites and PWA's using the latest technologies.",
              },
              {
                  icon: Layers,
                  title: 'Scalable System Architecture',
                  description:
                      'Designing robust and scalable systems that grow with your business needs.',
              },
              {
                  icon: Cpu,
                  title: 'AI & ML Integration',
                  description:
                      'Leveraging artificial intelligence to build smarter, more efficient applications.',
              },
              {
                  icon: Shield,
                  title: 'Cybersecurity Focused',
                  description:
                      'Prioritizing security in every layer of development to protect your digital assets.',
              },
              {
                  icon: Database,
                  title: 'Data-Driven Insights',
                  description:
                      'Unlock the power of your data with advanced analytics and business intelligence.',
              },
              {
                  icon: Zap,
                  title: 'Agile Development',
                  description:
                      'Iterative and flexible approach to deliver high-quality software faster.',
              },
          ];

    return (
        <section className="next-section-padding bg-background">
            <div className="next-container">
                <div className="mb-16 max-w-2xl text-left">
                    <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {featuresConfig.label || 'Why TechTower'}
                    </span>
                    <h2 className="mt-3 mb-4 text-3xl font-semibold text-foreground md:text-4xl">
                        {featuresConfig.heading ||
                            'Rank higher on Google and attract customers actively searching for your services.'}
                    </h2>
                    <p className="text-lg text-balance text-muted-foreground">
                        {featuresConfig.subheading ||
                            'From search engine optimization to modern web development, we help your business get found, get clicks, and get customers.'}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="next-card flex flex-col items-start text-left"
                            >
                                <div className="mb-4 rounded-xl bg-white/10 p-3">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="flex-grow text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
