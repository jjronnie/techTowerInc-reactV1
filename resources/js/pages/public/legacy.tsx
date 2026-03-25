import PublicSeo from '@/components/public/public-seo';
import type { PublicPageProps, SiteSettings } from '@/types';
import RawLegacyMarketingShell from '@marketing/bridge/LegacyMarketingShell';
import { type ComponentType } from 'react';

const LegacyMarketingShell =
    RawLegacyMarketingShell as unknown as ComponentType<{
        apiCache?: Record<string, unknown>;
        path?: string;
        siteSettings: SiteSettings;
    }>;

type PublicLegacyPageProps = PublicPageProps & {
    legacyApiCache?: Record<string, unknown>;
    legacyPath: string;
};

export default function PublicLegacyPage({
    legacyApiCache = {},
    legacyPath,
    seo,
    siteSettings,
}: PublicLegacyPageProps) {
    return (
        <>
            <PublicSeo seo={seo} siteSettings={siteSettings} />
            <LegacyMarketingShell
                apiCache={legacyApiCache}
                path={legacyPath}
                siteSettings={siteSettings}
            />
        </>
    );
}
