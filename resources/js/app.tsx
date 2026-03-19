import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import '../css/legacy-marketing.css';
import { initializeTheme } from './hooks/use-appearance';

const getAppName = () =>
    document
        .querySelector('meta[name="application-name"]')
        ?.getAttribute('content') || document.title || 'App';

const RAW_TITLE_PREFIX = '__RAW_TITLE__::';

createInertiaApp({
    title: (title) => {
        const appName = getAppName();

        if (!title) {
            return appName;
        }

        if (title.startsWith(RAW_TITLE_PREFIX)) {
            return title.slice(RAW_TITLE_PREFIX.length);
        }

        return `${title} | ${appName}`;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
