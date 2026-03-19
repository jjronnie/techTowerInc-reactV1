import React from 'react';
import { Code2 } from 'lucide-react';
import {
  SiAmazonwebservices,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

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

const iconMap = {
  amazonwebservices: SiAmazonwebservices,
  docker: SiDocker,
  figma: SiFigma,
  flutter: SiFlutter,
  git: SiGit,
  html5: SiHtml5,
  javascript: SiJavascript,
  laravel: SiLaravel,
  mongodb: SiMongodb,
  mysql: SiMysql,
  nextdotjs: SiNextdotjs,
  nodedotjs: SiNodedotjs,
  nuxtdotjs: SiNuxtdotjs,
  php: SiPhp,
  postgresql: SiPostgresql,
  react: SiReact,
  redis: SiRedis,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  vuedotjs: SiVuedotjs,
};

const normalizeTechnologyIconName = (iconName = '') => {
  const cleaned = String(iconName).trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  if (!cleaned) {
    return '';
  }

  return technologyIconAliases[cleaned] || cleaned;
};

const resolveTechnologyIcon = (iconName) => iconMap[normalizeTechnologyIconName(iconName)] || null;

const variantClasses = {
  marquee: {
    container: 'marquee-item',
    iconWrap: 'inline-flex items-center justify-center text-white/70',
    icon: 'h-6 w-6',
    label: 'text-sm font-medium text-white/70',
  },
  pill: {
    container: 'inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-sm text-foreground',
    iconWrap: 'inline-flex items-center justify-center text-primary',
    icon: 'h-4 w-4',
    label: 'text-sm font-medium text-foreground',
  },
};

const TechnologyBadge = ({ technology, variant = 'pill', className }) => {
  const styles = variantClasses[variant] || variantClasses.pill;
  const Icon = resolveTechnologyIcon(technology?.icon_name);

  return (
    <div className={cn(styles.container, className)}>
      <span className={styles.iconWrap}>
        {Icon ? (
          <Icon className={styles.icon} />
        ) : (
          <Code2 className={cn(styles.icon, 'text-muted-foreground')} />
        )}
      </span>
      <span className={styles.label}>{technology?.name}</span>
    </div>
  );
};

export default TechnologyBadge;
