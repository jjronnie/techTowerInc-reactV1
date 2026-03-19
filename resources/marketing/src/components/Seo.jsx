import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useSiteSettings } from '@marketing/context/SiteSettingsContext';

const buildTitle = (title, siteName, defaultTitle) => {
  if (!title) {
    return defaultTitle || siteName;
  }

  if (siteName && title.toLowerCase().includes(siteName.toLowerCase())) {
    return title;
  }

  return siteName ? `${title} | ${siteName}` : title;
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
  publishedTime,
  modifiedTime,
}) => {
  const { settings } = useSiteSettings();
  const location = useLocation();
  const siteName = settings?.site_name || 'TechTower Inc';
  const defaultTitle = settings?.default_seo_title || siteName;
  const defaultDescription = settings?.default_seo_description || '';
  const defaultImage = settings?.default_og_image_url || null;
  const verificationMeta = Array.isArray(settings?.verification_meta)
    ? settings.verification_meta
    : [];

  const metaTitle = buildTitle(title, siteName, defaultTitle);
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${origin}${canonical}`
    : `${origin}${location.pathname}`;
  const robotsContent =
    robots || (noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  const metaKeywords = keywords || null;

  const verificationTags = verificationMeta.map((meta, index) => {
    const key = meta?.name;
    const value = meta?.content;

    if (!key || !value) {
      return null;
    }

    if (key.startsWith('property:')) {
      return (
        <meta key={`${key}-${index}`} property={key.replace('property:', '')} content={value} />
      );
    }

    if (key.startsWith('http-equiv:')) {
      return (
        <meta key={`${key}-${index}`} httpEquiv={key.replace('http-equiv:', '')} content={value} />
      );
    }

    return <meta key={`${key}-${index}`} name={key} content={value} />;
  });

  return (
    <Helmet>
      <title>{metaTitle}</title>
      {metaDescription && (
        <meta name="description" content={metaDescription} />
      )}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {robotsContent && <meta name="robots" content={robotsContent} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={metaTitle} />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      {metaImage && <meta name="twitter:image" content={metaImage} />}
      {verificationTags}
    </Helmet>
  );
};

export default Seo;
