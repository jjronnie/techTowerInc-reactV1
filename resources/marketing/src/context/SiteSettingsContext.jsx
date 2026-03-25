import React, { createContext, useContext } from 'react';
import { useApi } from '@marketing/hooks/useApi';
import { useMarketingBridge } from '@marketing/context/MarketingBridgeContext';

const SiteSettingsContext = createContext({
    settings: null,
    loading: true,
    error: null,
});

export const SiteSettingsProvider = ({ children }) => {
    const bridge = useMarketingBridge();
    const bridgeSettings = bridge?.siteSettings ?? null;
    const hasBridgeSettings =
        bridgeSettings !== null &&
        typeof bridgeSettings === 'object' &&
        Object.keys(bridgeSettings).length > 0;
    const skipApi = hasBridgeSettings || typeof window === 'undefined';
    const { data, loading, error } = useApi('/site-settings', {
        skip: skipApi,
    });
    const settings = bridgeSettings || data?.data || null;

    return (
        <SiteSettingsContext.Provider
            value={{
                settings,
                loading: hasBridgeSettings ? false : loading,
                error,
            }}
        >
            {children}
        </SiteSettingsContext.Provider>
    );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
