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
  const { data, loading, error } = useApi('/site-settings');
  const settings = bridgeSettings || data?.data || null;

  return (
    <SiteSettingsContext.Provider
      value={{ settings, loading: bridgeSettings ? false : loading, error }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
