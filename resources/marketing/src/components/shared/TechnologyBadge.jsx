import React, { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '@marketing/lib/utils';

const technologyIconAliases = {
  aws: 'amazonwebservices',
  next: 'nextdotjs',
  node: 'nodedotjs',
  nodejs: 'nodedotjs',
  nuxt: 'nuxtdotjs',
  postgres: 'postgresql',
  postgre: 'postgresql',
  tailwind: 'tailwindcss',
  vue: 'vuedotjs',
};

const normalizeTechnologyIconName = (iconName = '') => {
  const cleaned = String(iconName).trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  if (!cleaned) {
    return '';
  }

  return technologyIconAliases[cleaned] || cleaned;
};

const resolveTechnologyIconUrl = (iconName) => {
  const normalized = normalizeTechnologyIconName(iconName);

  if (!normalized) {
    return null;
  }

  return `https://cdn.simpleicons.org/${normalized}`;
};

const variantClasses = {
  marquee: {
    container: 'marquee-item',
    iconWrap: 'inline-flex items-center justify-center text-white/70',
    icon: 'h-6 w-6',
    image: 'h-6 w-6 opacity-70',
    label: 'text-sm font-medium text-white/70',
  },
  pill: {
    container: 'inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-sm text-foreground',
    iconWrap: 'inline-flex items-center justify-center text-primary',
    icon: 'h-4 w-4',
    image: 'h-4 w-4',
    label: 'text-sm font-medium text-foreground',
  },
};

const TechnologyBadge = ({ technology, variant = 'pill', className }) => {
  const [hasIconError, setHasIconError] = useState(false);
  const styles = variantClasses[variant] || variantClasses.pill;
  const normalizedIconName = normalizeTechnologyIconName(technology?.icon_name);
  const iconUrl = resolveTechnologyIconUrl(technology?.icon_name);

  useEffect(() => {
    setHasIconError(false);
  }, [iconUrl]);

  return (
    <div className={cn(styles.container, className)}>
      <span className={styles.iconWrap}>
        {iconUrl && !hasIconError ? (
          <img
            src={iconUrl}
            alt={normalizedIconName || technology?.name || 'Technology icon'}
            className={styles.image}
            onError={() => setHasIconError(true)}
            style={variant === 'marquee' ? { filter: 'brightness(0) invert(1)' } : undefined}
            loading="lazy"
          />
        ) : (
          <Code2 className={cn(styles.icon, 'text-muted-foreground')} />
        )}
      </span>
      <span className={styles.label}>{technology?.name}</span>
    </div>
  );
};

export default TechnologyBadge;
