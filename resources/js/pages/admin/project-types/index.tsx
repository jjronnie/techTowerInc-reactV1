import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    create,
    destroy,
    edit,
    index,
} from '@/routes/admin/project-types';
import type { BreadcrumbItem } from '@/types';

type ProjectType = {
    id: number;
    name: string;
    slug: string;
    portfolios_count: number;
};

type ProjectTypesIndexProps = {
    projectTypes: ProjectType[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Project Types', href: index().url },
];

export default function ProjectTypesIndex({
    projectTypes,
}: ProjectTypesIndexProps) {
    const handleDelete = (projectType: ProjectType) => {
        if (!window.confirm(`Delete "${projectType.name}"?`)) {
            return;
        }

        router.delete(destroy(projectType.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Types" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Project Types"
                        description="Manage reusable portfolio types for cards and portfolio filters."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Project Type</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[720px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Slug</th>
                                <th className="px-4 py-3 text-left">Projects</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTypes.map((projectType) => (
                                <tr
                                    key={projectType.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {projectType.name}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {projectType.slug}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {projectType.portfolios_count}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Link href={edit(projectType.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(projectType)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!projectTypes.length && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No project types yet.
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
