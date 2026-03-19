import React from 'react';
import { useApi } from '@/hooks/useApi';
import TechnologyBadge from '@/components/shared/TechnologyBadge';

const fallbackTechnologies = [
  { name: 'Laravel', icon_name: 'laravel' },
  { name: 'React', icon_name: 'react' },
  { name: 'TypeScript', icon_name: 'typescript' },
  { name: 'PostgreSQL', icon_name: 'postgresql' },
  { name: 'Docker', icon_name: 'docker' },
  { name: 'AWS', icon_name: 'aws' },
  { name: 'Figma', icon_name: 'figma' },
  { name: 'Node.js', icon_name: 'nodedotjs' },
  { name: 'MySQL', icon_name: 'mysql' },
  { name: 'Flutter', icon_name: 'flutter' },
];

const TechnologiesSection = () => {
  const { data } = useApi('/technologies');

  const technologies = data?.data?.length ? data.data : fallbackTechnologies;
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section className="overflow-hidden bg-black py-8">
      <div className="marquee">
        <div className="marquee-track">
          {marqueeItems.map((tech, index) => {
            return (
              <TechnologyBadge
                key={`${tech.name}-${index}`}
                technology={tech}
                variant="marquee"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
