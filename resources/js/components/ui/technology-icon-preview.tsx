import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const technologyIconAliases: Record<string, string> = {
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

export function cleanTechnologyIconName(iconName?: string | null): string {
    return (iconName ?? '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function normalizeTechnologyIconName(iconName?: string | null): string {
    const cleaned = cleanTechnologyIconName(iconName);

    if (!cleaned) {
        return '';
    }

    return technologyIconAliases[cleaned] ?? cleaned;
}

export function getTechnologyIconPreviewUrl(
    iconName?: string | null,
): string | null {
    const normalized = normalizeTechnologyIconName(iconName);

    if (!normalized) {
        return null;
    }

    return `https://cdn.simpleicons.org/${normalized}`;
}

type TechnologyIconPreviewProps = {
    iconName?: string | null;
    label?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
    sm: {
        container: 'h-9 w-9 rounded-lg',
        icon: 'h-4 w-4',
        image: 'h-4 w-4',
    },
    md: {
        container: 'h-10 w-10 rounded-xl',
        icon: 'h-4 w-4',
        image: 'h-5 w-5',
    },
    lg: {
        container: 'h-12 w-12 rounded-xl',
        icon: 'h-5 w-5',
        image: 'h-6 w-6',
    },
} as const;

export function TechnologyIconPreview({
    iconName,
    label,
    className,
    size = 'md',
}: TechnologyIconPreviewProps) {
    const [hasError, setHasError] = useState(false);
    const normalized = normalizeTechnologyIconName(iconName);
    const source = getTechnologyIconPreviewUrl(iconName);
    const classes = sizeClasses[size];

    useEffect(() => {
        setHasError(false);
    }, [source]);

    return (
        <div className={cn('inline-flex items-center gap-3', className)}>
            <span
                className={cn(
                    'flex items-center justify-center border border-sidebar-border/70 bg-muted/40',
                    classes.container,
                )}
            >
                {source && !hasError ? (
                    <img
                        src={source}
                        alt={normalized || label || 'Technology icon'}
                        className={classes.image}
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <Code2 className={cn('text-muted-foreground', classes.icon)} />
                )}
            </span>
            {label && (
                <div className="grid gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                        {label}
                    </span>
                    {normalized && (
                        <span className="text-xs text-muted-foreground">
                            {normalized}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
