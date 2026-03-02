import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            flash?: {
                notification?: {
                    type?: 'success' | 'error' | 'info' | 'warning';
                    title?: string;
                    message?: string;
                } | null;
                status?: string | null;
            };
            [key: string]: unknown;
        };
    }
}
