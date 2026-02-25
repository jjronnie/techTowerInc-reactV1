import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    src,
    alt,
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={src ?? '/marketing/favicon.png'}
            alt={alt ?? 'TechTower icon'}
            className={className}
            {...props}
        />
    );
}
