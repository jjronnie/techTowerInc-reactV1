import { fileURLToPath, URL } from 'node:url';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
            '@marketing': fileURLToPath(
                new URL('./resources/marketing/src', import.meta.url),
            ),
            react: fileURLToPath(
                new URL('./node_modules/react', import.meta.url),
            ),
            'react/jsx-runtime': fileURLToPath(
                new URL('./node_modules/react/jsx-runtime.js', import.meta.url),
            ),
            'react/jsx-dev-runtime': fileURLToPath(
                new URL(
                    './node_modules/react/jsx-dev-runtime.js',
                    import.meta.url,
                ),
            ),
            'react-dom': fileURLToPath(
                new URL('./node_modules/react-dom', import.meta.url),
            ),
        },
    },
});
