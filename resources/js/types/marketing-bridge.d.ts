import type { SiteSettings } from '@/types/public';
import type { ComponentType } from 'react';

declare module '@marketing/bridge/LegacyMarketingShell' {
    type LegacyMarketingShellProps = {
        apiCache?: Record<string, unknown>;
        path?: string;
        siteSettings: SiteSettings;
    };

    const LegacyMarketingShell: ComponentType<LegacyMarketingShellProps>;

    export default LegacyMarketingShell;
}

declare module '@marketing/bridge/LegacyMarketingNotFoundShell' {
    type LegacyMarketingNotFoundShellProps = {
        siteSettings: SiteSettings;
    };

    const LegacyMarketingNotFoundShell: ComponentType<LegacyMarketingNotFoundShellProps>;

    export default LegacyMarketingNotFoundShell;
}
