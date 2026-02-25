import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiBootstrap,
  SiNodedotjs,
  SiPython,
  SiAmazonwebservices,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiFigma,
} from 'react-icons/si';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const techStack = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Vue', icon: SiVuedotjs },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'AWS', icon: SiAmazonwebservices },
  { name: 'Docker', icon: SiDocker },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Figma', icon: SiFigma },
];

const TechnologiesSection = () => {
  const { settings } = useSiteSettings();
  const iconMap = {
    react: SiReact,
    nextjs: SiNextdotjs,
    vue: SiVuedotjs,
    bootstrap: SiBootstrap,
    nodejs: SiNodedotjs,
    python: SiPython,
    aws: SiAmazonwebservices,
    docker: SiDocker,
    postgresql: SiPostgresql,
    mongodb: SiMongodb,
    figma: SiFigma,
  };
  const dynamicTech = settings?.home_technologies?.length
    ? settings.home_technologies.map((tech) => ({
        name: tech.name,
        icon: iconMap[tech.icon_key] || SiReact,
      }))
    : techStack;
  const marqueeItems = [...dynamicTech, ...dynamicTech];

  return (
    <section className="bg-black py-8 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track">
          {marqueeItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="marquee-item"
            >
              <tech.icon className="h-6 w-6 text-white/70" />
              <span className="text-sm font-medium text-white/70">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
