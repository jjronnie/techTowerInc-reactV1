import React, { createContext, useContext, useMemo } from 'react';

const MarketingBridgeContext = createContext({
  apiCache: {},
  currentPath: '/',
  siteSettings: null,
});

export const MarketingBridgeProvider = ({
  apiCache = {},
  children,
  currentPath = '/',
  siteSettings = null,
}) => {
  const value = useMemo(
    () => ({
      apiCache,
      currentPath,
      siteSettings,
    }),
    [apiCache, currentPath, siteSettings]
  );

  return (
    <MarketingBridgeContext.Provider value={value}>
      {children}
    </MarketingBridgeContext.Provider>
  );
};

export const useMarketingBridge = () => useContext(MarketingBridgeContext);
