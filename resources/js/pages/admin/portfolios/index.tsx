import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { create, destroy, edit, index } from '@/routes/admin/portfolios';

type Portfolio = {
    id: number;
    title: string;
    type: string;
    slug: string;
    is_featured: boolean;
    is_active: boolean;
    client?: {
        name: string;
    } | null;
    categories?: Array<{
        id: number;
        name: string;
    }>;
};

type PortfoliosIndexProps = {
    portfolios: Portfolio[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Portfolios', href: index().url },
];

export default function PortfoliosIndex({ portfolios }: PortfoliosIndexProps) {
    const handleDelete = (portfolio: Portfolio) => {
        if (!window.confirm(`Delete "${portfolio.title}"?`)) {
            return;
        }

        router.delete(destroy(portfolio.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portfolio" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Portfolio"
                        description="Manage portfolio projects, clients, and linked categories."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Portfolio</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[880px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Type</th>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Categories</th>
                                <th className="px-4 py-3 text-left">Featured</th>
                                <th className="px-4 py-3 text-left">Active</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolios.map((portfolio) => (
                                <tr
                                    key={portfolio.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3">
                                        <div className="grid gap-1">
                                            <span className="font-medium">
                                                {portfolio.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {portfolio.slug}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {portfolio.type}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {portfolio.client?.name ?? 'No client'}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {portfolio.categories?.length
                                            ? portfolio.categories
                                                  .map((category) => category.name)
                                                  .join(', ')
                                            : 'Uncategorized'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {portfolio.is_featured ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {portfolio.is_active ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={edit(portfolio.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(portfolio)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!portfolios.length && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No portfolio entries yet.
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
