import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import App from '@marketing/App';
import { SiteSettingsProvider } from '@marketing/context/SiteSettingsContext';
import { MarketingBridgeProvider } from '@marketing/context/MarketingBridgeContext';

const RouterBridge = ({ children, path }) => {
  if (typeof window === 'undefined') {
    return <StaticRouter location={path}>{children}</StaticRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

const LegacyMarketingShell = ({ apiCache = {}, path = '/', siteSettings = null }) => (
  <div className="legacy-marketing dark">
    <MarketingBridgeProvider
      apiCache={apiCache}
      currentPath={path}
      siteSettings={siteSettings}
    >
      <HelmetProvider>
        <SiteSettingsProvider>
          <RouterBridge path={path}>
            <App />
          </RouterBridge>
        </SiteSettingsProvider>
      </HelmetProvider>
    </MarketingBridgeProvider>
  </div>
);

export default LegacyMarketingShell;
