import { Head } from '@inertiajs/react';
import type { SeoData, SiteSettings } from '@/types';

type PublicSeoProps = {
    seo: SeoData;
    siteSettings: SiteSettings;
};

export default function PublicSeo({ seo, siteSettings }: PublicSeoProps) {
    const siteName = siteSettings.site_name || 'TechTower Innovations';
    const description =
        seo.description ||
        siteSettings.default_seo_description ||
        'TechTower Inc delivers premium website design, SEO services, product strategy, and automation to help businesses in Uganda launch faster and grow.';
    const image = seo.image || siteSettings.default_og_image_url || undefined;
    const robots = seo.robots || 'index, follow, max-image-preview:large';
    const title =
        seo.title ||
        siteSettings.default_seo_title ||
        siteSettings.site_name ||
        'TechTower Innovations';
    const headTitle =
        seo.appendAppName === false ? `__RAW_TITLE__::${title}` : title;
    const verificationMeta = Array.isArray(siteSettings.verification_meta)
        ? siteSettings.verification_meta
        : [];

    return (
        <Head title={headTitle}>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            {seo.keywords && <meta name="keywords" content={seo.keywords} />}
            {seo.canonical && <link rel="canonical" href={seo.canonical} />}
            {siteSettings.favicon_url && (
                <link rel="icon" href={siteSettings.favicon_url} />
            )}

            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={seo.type || 'website'} />
            {seo.canonical && (
                <meta property="og:url" content={seo.canonical} />
            )}
            {image && <meta property="og:image" content={image} />}
            {seo.publishedTime && (
                <meta
                    property="article:published_time"
                    content={seo.publishedTime}
                />
            )}
            {seo.modifiedTime && (
                <meta
                    property="article:modified_time"
                    content={seo.modifiedTime}
                />
            )}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {seo.canonical && (
                <meta name="twitter:url" content={seo.canonical} />
            )}
            {image && <meta name="twitter:image" content={image} />}

            {verificationMeta.map((meta, index) => {
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

                return (
                    <meta key={`${key}-${index}`} name={key} content={value} />
                );
            })}

            {(seo.structuredData || []).map((entry, index) => (
                <script
                    key={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(entry),
                    }}
                />
            ))}
        </Head>
    );
}
