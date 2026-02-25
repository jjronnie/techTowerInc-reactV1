import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props as { name?: string };
    const appName = name ?? 'TechTower Innovations';

    return (
        <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-6" />
            </div>
            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {appName}
                </span>
            </div>
        </div>
    );
}
