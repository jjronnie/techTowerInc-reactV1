import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const FolderCard = ({ project }) => {
  const label = project.label || 'Project';
  const summary = project.summary || project.excerpt || '';
  const resultLabel = project.result_label || project.resultLabel;
  const resultValue = project.result_value || project.resultValue;
  const badgeText = project.badge_text || project.badgeText || project.title?.[0];
  const badgeColor = project.badge_color || project.badgeColor || '#ffffff';

  return (
    <div className="relative group">
      <div className="absolute -top-4 left-6 flex items-center gap-2 rounded-t-sm rounded-br-sm bg-card border border-border px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>{label}</span>
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="relative rounded-sm bg-card border border-border p-6 pt-12 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold text-black"
              style={{ backgroundColor: badgeColor }}
            >
              {badgeText}
            </span>
            <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-4">{project.category}</p>
          <p className="text-sm text-muted-foreground mt-4">{summary}</p>
        </div>
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{resultLabel}</p>
          <p className="text-xl font-semibold text-foreground mt-2">{resultValue}</p>
        </div>
        <Link
          to={`/portfolio/${project.slug}`}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-muted-foreground transition hover:text-foreground hover:border-white/40"
          aria-label="Open project details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default FolderCard;
