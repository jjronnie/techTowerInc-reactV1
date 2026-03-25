import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import App from '@marketing/App';
import { SiteSettingsProvider } from '@marketing/context/SiteSettingsContext';
import { MarketingBridgeProvider } from '@marketing/context/MarketingBridgeContext';

class MarketingErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[MarketingShell] Render error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: '2rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                        color: '#e5e7eb',
                    }}
                >
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        Something went wrong
                    </h1>
                    <p style={{ marginBottom: '1rem', opacity: 0.7 }}>
                        The page could not be rendered. Please try refreshing.
                    </p>
                    <pre
                        style={{
                            background: '#1f2937',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                            fontSize: '0.85rem',
                            maxHeight: '200px',
                        }}
                    >
                        {this.state.error?.message || 'Unknown error'}
                    </pre>
                    <a
                        href="/"
                        style={{
                            color: '#60a5fa',
                            marginTop: '1rem',
                            display: 'inline-block',
                        }}
                    >
                        Back to Home
                    </a>
                </div>
            );
        }

        return this.props.children;
    }
}

const RouterBridge = ({ children, path }) => {
    if (typeof window === 'undefined') {
        return <StaticRouter location={path}>{children}</StaticRouter>;
    }

    return <BrowserRouter>{children}</BrowserRouter>;
};

const MarketingShellContent = ({ apiCache, path, siteSettings }) => (
    <MarketingErrorBoundary>
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
    </MarketingErrorBoundary>
);

const LegacyMarketingShell = ({
    apiCache = {},
    path = '/',
    siteSettings = null,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="legacy-marketing dark">
            {mounted ? (
                <MarketingShellContent
                    apiCache={apiCache}
                    path={path}
                    siteSettings={siteSettings}
                />
            ) : (
                <div style={{ minHeight: '100vh' }} />
            )}
        </div>
    );
};

export default LegacyMarketingShell;
