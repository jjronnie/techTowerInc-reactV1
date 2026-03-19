import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const RAW_TITLE_PREFIX = '__RAW_TITLE__::';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => {
            const appName =
                (typeof page.props.name === 'string' && page.props.name) ||
                import.meta.env.VITE_APP_NAME ||
                'App';

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
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
