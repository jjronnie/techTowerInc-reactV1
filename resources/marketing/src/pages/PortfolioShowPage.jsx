import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Calendar, ExternalLink, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import Seo from '@/components/Seo';

const PortfolioShowPage = () => {
  const { slug } = useParams();
  const { data, loading, error } = useApi(slug ? `/portfolio/${slug}` : null, { skip: !slug });
  const project = data?.data;

  if (loading) {
    return (
      <div className="bg-background text-foreground pt-28 pb-16">
        <div className="next-container space-y-6">
          <div className="shimmer h-4 w-32 rounded" />
          <div className="shimmer h-10 w-2/3 rounded" />
          <div className="shimmer h-5 w-3/4 rounded" />
          <div className="shimmer h-64 w-full rounded" />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="next-card space-y-4">
              <div className="shimmer h-5 w-1/2 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-5/6 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`project-detail-${index}`} className="shimmer h-4 w-3/4 rounded" />
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

  if (error || !project) {
    return (
      <div className="bg-background text-foreground pt-28 pb-16">
        <div className="next-container">
          <h1 className="text-3xl font-semibold mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-6">
            The project you are looking for does not exist yet. Explore our full portfolio.
          </p>
          <Button asChild className="next-button rounded-full px-8">
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const details = {
    label: project.label || 'Project',
    summary: project.summary || project.excerpt || '',
    resultLabel: project.result_label || project.resultLabel,
    resultValue: project.result_value || project.resultValue,
    technologies: project.technologies || [],
    startedAt: project.started_at,
    completedAt: project.completed_at,
  };

  return (
    <div className="bg-background text-foreground pt-28 pb-16">
      <div className="next-container">
        <Seo
          title={project.seo?.title || project.title}
          description={project.seo?.description || project.summary || project.description}
          image={project.seo?.og_image_url || project.featured_image_url}
          keywords={project.seo?.keywords}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground border border-border/60 rounded-full mb-4">
            {details.label}
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {details.summary || project.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {project.project_url && (
              <Button asChild className="next-button rounded-full px-8">
                <a href={project.project_url} target="_blank" rel="noreferrer">
                  Visit project <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </motion.div>

        {project.featured_image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12"
          >
            <img
              src={project.featured_image_url}
              alt={project.title}
              className="w-full rounded-xl border border-border/60 object-cover shadow-lg"
            />
          </motion.div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">Project details</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {project.description || details.summary}
            </p>
            {details.technologies.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="next-card">
            <h2 className="text-xl font-semibold mb-4">Project snapshot</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              {project.client_name && (
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-foreground" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Client</p>
                    <p className="text-lg font-semibold text-foreground">{project.client_name}</p>
                  </div>
                </div>
              )}
              {(details.startedAt || details.completedAt) && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Timeline</p>
                    <p className="text-lg font-semibold text-foreground">
                      {details.startedAt || '—'}{details.completedAt ? ` → ${details.completedAt}` : ''}
                    </p>
                  </div>
                </div>
              )}
              {details.resultLabel && details.resultValue && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{details.resultLabel}</p>
                  <p className="text-2xl font-semibold text-foreground mt-2">{details.resultValue}</p>
                </div>
              )}
              {project.project_url && (
                <div>
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                  >
                    Open project link <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
            <Link to="/portfolio">Back to Portfolio <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowPage;
