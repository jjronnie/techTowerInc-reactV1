import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { create, destroy, edit, index } from '@/routes/admin/categories';

type Category = {
    id: number;
    name: string;
    slug: string;
    portfolios_count: number;
    posts_count: number;
};

type CategoriesIndexProps = {
    categories: Category[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Categories', href: index().url },
];

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
    const handleDelete = (category: Category) => {
        if (!window.confirm(`Delete "${category.name}"?`)) {
            return;
        }

        router.delete(destroy(category.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Categories"
                        description="Shared categories for both posts and portfolio items."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Category</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[760px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Slug</th>
                                <th className="px-4 py-3 text-left">Portfolio</th>
                                <th className="px-4 py-3 text-left">Posts</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {category.name}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {category.slug}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {category.portfolios_count}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {category.posts_count}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={edit(category.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(category)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!categories.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No categories yet.
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
