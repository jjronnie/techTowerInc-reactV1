import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  ExternalLink,
  Layers3,
} from 'lucide-react';
import { Button } from '@marketing/components/ui/button';
import { useApi } from '@marketing/hooks/useApi';
import Seo from '@marketing/components/Seo';
import TechnologyBadge from '@marketing/components/shared/TechnologyBadge';

const formatDate = (value) => {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PortfolioShowPage = () => {
  const { slug } = useParams();
  const { data, loading, error } = useApi(slug ? `/portfolio/${slug}` : null, {
    skip: !slug,
  });
  const project = data?.data;
  const categories = project?.categories || [];
  const technologies = project?.technologies || [];
  const galleryImages = (project?.gallery_images || []).filter(Boolean);
  const startedAt = formatDate(project?.started_at);
  const completedAt = formatDate(project?.completed_at);
  const timelineLabel = startedAt && completedAt
    ? `${startedAt} → ${completedAt}`
    : startedAt
      ? `Started ${startedAt}`
      : completedAt
        ? `Completed ${completedAt}`
        : null;

  if (loading) {
    return (
      <div className="bg-background pb-16 pt-28 text-foreground">
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
            </div>
            <div className="next-card space-y-4">
              <div className="shimmer h-5 w-1/2 rounded" />
              <div className="shimmer h-6 w-2/3 rounded" />
              <div className="shimmer h-4 w-full rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-background pb-16 pt-28 text-foreground">
        <div className="next-container">
          <h1 className="mb-4 text-3xl font-semibold">Project not found</h1>
          <p className="mb-6 text-muted-foreground">
            The project you are looking for does not exist yet. Explore our full portfolio.
          </p>
          <Button asChild className="next-button rounded-full px-8">
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-16 pt-28 text-foreground">
      <div className="next-container">
        <Seo
          title={project.seo?.title || project.title}
          description={project.seo?.description || project.summary || project.description}
          image={project.seo?.og_image_url || project.featured_image_url}
          keywords={project.seo?.keywords}
          canonical={`/project/${project.slug}`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/portfolio/category/${category.slug}`}
                className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
            {project.title}
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            {project.summary || project.excerpt || project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {project.project_url && (
              <Button asChild className="next-button rounded-full px-8">
                <a href={project.project_url} target="_blank" rel="noreferrer">
                  View project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 overflow-hidden rounded-xl border border-border/60 bg-muted/20"
        >
          {project.featured_image_url ? (
            <img
              src={project.featured_image_url}
              alt={project.title}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex min-h-[20rem] items-center justify-center bg-gradient-to-br from-muted via-muted/60 to-background">
              <Layers3 className="h-12 w-12 text-muted-foreground/60" />
            </div>
          )}
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="next-card">
              <h2 className="mb-4 text-xl font-semibold">Project details</h2>
              {project.description ? (
                <div
                  className="legacy-prose legacy-prose-lg max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {project.summary || project.excerpt}
                </p>
              )}

              {technologies.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((technology) => (
                      <TechnologyBadge
                        key={technology.id}
                        technology={technology}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {galleryImages.length > 0 && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">Project gallery</h2>
                  <p className="text-sm text-muted-foreground">
                    More visuals from the delivery.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {galleryImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-xl border border-border/60 bg-muted/20"
                    >
                      <img
                        src={image}
                        alt={`${project.title} gallery ${index + 1}`}
                        className="aspect-[4/3] h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="next-card">
            <h2 className="mb-4 text-xl font-semibold">Project snapshot</h2>
            <div className="space-y-5 text-sm text-muted-foreground">
              {project.client && (
                <div className="flex items-start gap-3">
                  <Building2 className="mt-1 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Client
                    </p>
                    <Link
                      to={`/clients/${project.client.slug}`}
                      className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition hover:text-primary"
                    >
                      {project.client.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {timelineLabel && (
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Timeline
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {timelineLabel}
                    </p>
                  </div>
                </div>
              )}

              {project.project_url && (
                <div>
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80"
                  >
                    View project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="next-button-outline rounded-full px-8">
            <Link to="/portfolio">
              Back to Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowPage;
