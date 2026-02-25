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
  const marqueeItems = [...techStack, ...techStack];

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
