import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Footer from '@marketing/components/layout/Footer';
import Navbar from '@marketing/components/layout/Navbar';
import { ThemeProvider } from '@marketing/components/theme/ThemeProvider';
import { Toaster } from '@marketing/components/ui/toaster';
import { MarketingBridgeProvider } from '@marketing/context/MarketingBridgeContext';
import { SiteSettingsProvider } from '@marketing/context/SiteSettingsContext';
import NotFound from '@marketing/pages/NotFound';

const RouterBridge = ({ children }) => {
  if (typeof window === 'undefined') {
    return <StaticRouter location="/__not-found__">{children}</StaticRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

const LegacyMarketingNotFoundShell = ({ siteSettings }) => (
  <div className="legacy-marketing dark">
    <MarketingBridgeProvider currentPath="/__not-found__" siteSettings={siteSettings}>
      <HelmetProvider>
        <SiteSettingsProvider>
          <RouterBridge>
            <ThemeProvider defaultTheme="dark" storageKey="techtower-theme">
              <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
                <Toaster />
                <Navbar />
                <main className="flex-grow">
                  <NotFound />
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </RouterBridge>
        </SiteSettingsProvider>
      </HelmetProvider>
    </MarketingBridgeProvider>
  </div>
);

export default LegacyMarketingNotFoundShell;
