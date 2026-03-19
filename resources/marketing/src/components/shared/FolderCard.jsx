import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightSquare, Building2, Layers3 } from 'lucide-react';

const FolderCard = ({ project }) => {
  const summary = (project.summary || project.excerpt || project.description || '').replace(/<[^>]+>/g, '');
  const categories = project.categories || [];
  const types = project.types || [];
  const client = project.client || null;
  const primaryCategory = categories[0] || null;
  const primaryType = project.primary_type || types[0] || null;

  return (
    <article className="next-card group relative flex h-full w-full min-w-0 max-w-full cursor-pointer flex-col overflow-hidden p-0">
      <Link
        to={`/project/${project.slug}`}
        aria-label={`Open ${project.title}`}
        className="absolute inset-0 z-10 rounded-[inherit]"
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/70 bg-muted/30">
        {project.featured_image_url ? (
          <img
            src={project.featured_image_url}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted via-muted/60 to-background">
            <Layers3 className="h-10 w-10 text-muted-foreground/60" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col space-y-5 p-6">
        <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {primaryType?.name || 'Project'}
          </span>
          {client && (
            client.slug ? (
              <Link
                to={`/clients/${client.slug}`}
                onClick={(event) => event.stopPropagation()}
                className="relative z-20 inline-flex w-full min-w-0 max-w-full items-center gap-2 overflow-hidden text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground sm:w-auto"
              >
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
                  {client.logo_url ? (
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                      <Building2 className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="max-w-full truncate sm:max-w-[12rem]">{client.name}</span>
              </Link>
            ) : (
              <div className="inline-flex w-full min-w-0 max-w-full items-center gap-2 overflow-hidden text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:w-auto">
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
                  {client.logo_url ? (
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                      <Building2 className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="max-w-full truncate sm:max-w-[12rem]">{client.name}</span>
              </div>
            )
          )}
        </div>

        <div className="min-w-0 space-y-3">
          <h3 className="break-words text-2xl font-semibold text-foreground transition group-hover:text-primary">
            {project.title}
          </h3>
          <p className="flex-1 break-words text-sm text-muted-foreground">
            {summary}
          </p>
        </div>

        <div className="mt-auto flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          {primaryCategory ? (
            <div className="relative z-20 flex min-w-0 flex-wrap gap-2">
              <Link
                to={`/portfolio/category/${primaryCategory.slug}`}
                onClick={(event) => event.stopPropagation()}
                className="block max-w-full truncate rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                {primaryCategory.name}
              </Link>
            </div>
          ) : (
            <span />
          )}
          <span className="pointer-events-none inline-flex h-11 w-11 self-end items-center justify-center rounded-2xl border border-border/70 bg-muted/30 text-muted-foreground transition group-hover:border-primary/40 group-hover:text-primary sm:self-auto">
            <ArrowUpRightSquare className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default FolderCard;
