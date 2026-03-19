import PublicSeo from '@/components/public/public-seo';
import type { PublicPageProps, SiteSettings } from '@/types';
import RawLegacyMarketingNotFoundShell from '@marketing/bridge/LegacyMarketingNotFoundShell';
import type { ComponentType } from 'react';

const LegacyMarketingNotFoundShell =
    RawLegacyMarketingNotFoundShell as unknown as ComponentType<{
        siteSettings: SiteSettings;
    }>;

type NotFoundPageProps = PublicPageProps;

export default function PublicNotFoundPage({
    siteSettings,
    seo,
}: NotFoundPageProps) {
    return (
        <>
            <PublicSeo seo={seo} siteSettings={siteSettings} />
            <LegacyMarketingNotFoundShell siteSettings={siteSettings} />
        </>
    );
}
