import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const isInertiaMode = () =>
    typeof document !== 'undefined' &&
    !!document.querySelector('title[inertia]');

const getAppName = () =>
    document
        .querySelector('meta[name="application-name"]')
        ?.getAttribute('content') || 'App';

const buildTitle = (title, appName, defaultTitle, appendAppName = true) => {
    if (!title) {
        return defaultTitle || appName;
    }

    if (!appendAppName) {
        return title;
    }

    if (appName && title.toLowerCase().includes(appName.toLowerCase())) {
        return title;
    }

    return appName ? `${title} | ${appName}` : title;
};

const Seo = ({
    title,
    description,
    image,
    canonical,
    noIndex = false,
    robots,
    keywords,
    type = 'website',
    appendAppName = true,
    publishedTime,
    modifiedTime,
}) => {
    const { settings } = useSiteSettings();
    const location = useLocation();
    const inertiaMode = useMemo(() => isInertiaMode(), []);

    const siteName = settings?.site_name || 'TechTower Inc';
    const appName = getAppName();
    const defaultTitle = settings?.default_seo_title || siteName;
    const defaultDescription =
        settings?.default_seo_description ||
        'TechTower Inc delivers premium website design, SEO services, product strategy, and automation to help businesses in Uganda launch faster and grow.';
    const defaultImage = settings?.default_og_image_url || null;
    const verificationMeta = Array.isArray(settings?.verification_meta)
        ? settings.verification_meta
        : [];

    const metaTitle = buildTitle(title, appName, defaultTitle, appendAppName);
    const metaDescription = description || defaultDescription;
    const metaImage = image || defaultImage;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = canonical
        ? canonical.startsWith('http')
            ? canonical
            : `${origin}${canonical}`
        : `${origin}${location.pathname}`;
    const robotsContent =
        robots ||
        (noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large');
    const metaKeywords = keywords || null;

    useEffect(() => {
        if (inertiaMode || typeof document === 'undefined') {
            return;
        }

        document.title = metaTitle;
    }, [metaTitle, inertiaMode]);

    const verificationTags = verificationMeta.map((meta, index) => {
        const key = meta?.name;
        const value = meta?.content;

        if (!key || !value) {
            return null;
        }

        if (key.startsWith('property:')) {
            return (
                <meta
                    key={`${key}-${index}`}
                    property={key.replace('property:', '')}
                    content={value}
                />
            );
        }

        if (key.startsWith('http-equiv:')) {
            return (
                <meta
                    key={`${key}-${index}`}
                    httpEquiv={key.replace('http-equiv:', '')}
                    content={value}
                />
            );
        }

        return <meta key={`${key}-${index}`} name={key} content={value} />;
    });

    if (inertiaMode) {
        return null;
    }

    return (
        <Helmet>
            <title>{metaTitle}</title>
            {metaDescription && (
                <meta name="description" content={metaDescription} />
            )}
            {metaKeywords && <meta name="keywords" content={metaKeywords} />}
            {robotsContent && <meta name="robots" content={robotsContent} />}
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" href={canonicalUrl} hrefLang="en" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={metaTitle} />
            {metaDescription && (
                <meta property="og:description" content={metaDescription} />
            )}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            {metaImage && <meta property="og:image" content={metaImage} />}
            {metaImage && <meta property="og:image:width" content="1200" />}
            {metaImage && <meta property="og:image:height" content="630" />}
            <meta property="og:locale" content="en_US" />
            {publishedTime && (
                <meta
                    property="article:published_time"
                    content={publishedTime}
                />
            )}
            {modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            {metaDescription && (
                <meta name="twitter:description" content={metaDescription} />
            )}
            {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
            {metaImage && <meta name="twitter:image" content={metaImage} />}
            {verificationTags}
        </Helmet>
    );
};

export default Seo;
