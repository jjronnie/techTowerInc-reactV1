import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HomePortfolioShowcaseTile = ({ project, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!project?.home_featured_image_url) {
    return null;
  }

  return (
    <article
      className={`group relative overflow-hidden border border-white/10 bg-card/40 ${className}`}
    >
      {!isLoaded && <div className="shimmer absolute inset-0" />}
      <img
        src={project.home_featured_image_url}
        alt={project.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-full object-fill transition duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-75 transition duration-300 group-hover:opacity-90" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Link
          to={`/project/${project.slug}`}
          aria-label={`Open ${project.title}`}
          className="relative z-10 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <span className="flex items-center gap-3 rounded-sm border border-white/15 bg-black/45 px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <span>View</span>
            <span className="text-lg font-light text-white/60">|</span>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </article>
  );
};

export default HomePortfolioShowcaseTile;
