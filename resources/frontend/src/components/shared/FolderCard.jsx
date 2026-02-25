import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const FolderCard = ({ project }) => {
  return (
    <div className="relative group">
      <div className="absolute -top-4 left-6 flex items-center gap-2 rounded-t-sm rounded-br-sm bg-card border border-border px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>{project.label || 'Case File'}</span>
        <ChevronDown className="w-3 h-3" />
      </div>
      <div className="relative rounded-sm bg-card border border-border p-6 pt-12 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold text-black"
              style={{ backgroundColor: project.badgeColor || '#ffffff' }}
            >
              {project.badgeText || project.title?.[0]}
            </span>
            <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-4">{project.category}</p>
          <p className="text-sm text-muted-foreground mt-4">{project.summary}</p>
        </div>
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.resultLabel}</p>
          <p className="text-xl font-semibold text-foreground mt-2">{project.resultValue}</p>
        </div>
        <button
          type="button"
          className="absolute bottom-4 right-4 h-9 w-9 rounded-full border border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40 transition"
          aria-label="Open case file"
        >
          <Plus className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default FolderCard;
