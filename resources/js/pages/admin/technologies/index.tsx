import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { TechnologyIconPreview } from '@/components/ui/technology-icon-preview';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { create, destroy, edit, index } from '@/routes/admin/technologies';

type Technology = {
    id: number;
    name: string;
    slug: string;
    icon_name: string;
    portfolios_count: number;
};

type TechnologiesIndexProps = {
    technologies: Technology[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Technologies', href: index().url },
];

export default function TechnologiesIndex({
    technologies,
}: TechnologiesIndexProps) {
    const handleDelete = (technology: Technology) => {
        if (!window.confirm(`Delete "${technology.name}"?`)) {
            return;
        }

        router.delete(destroy(technology.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Technologies" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Technologies"
                        description="Reusable technologies for portfolio projects and the homepage marquee."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Technology</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[760px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Icon</th>
                                <th className="px-4 py-3 text-left">Projects</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technologies.map((technology) => (
                                <tr
                                    key={technology.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3">
                                        <div className="grid gap-1">
                                            <span className="font-medium">
                                                {technology.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {technology.slug}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <TechnologyIconPreview
                                            iconName={technology.icon_name}
                                            label={technology.icon_name}
                                            size="sm"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {technology.portfolios_count}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link
                                                    href={edit(technology.id)}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(technology)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!technologies.length && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No technologies yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
