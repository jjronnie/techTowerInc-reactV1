import { Head, Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { create, destroy, edit, index } from '@/routes/admin/clients';

type Client = {
    id: number;
    name: string;
    slug: string;
    website_url: string | null;
    logo_url: string | null;
    portfolios_count: number;
};

type ClientsIndexProps = {
    clients: Client[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Clients', href: index().url },
];

export default function ClientsIndex({ clients }: ClientsIndexProps) {
    const handleDelete = (client: Client) => {
        if (!window.confirm(`Delete "${client.name}"?`)) {
            return;
        }

        router.delete(destroy(client.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Clients"
                        description="Manage client profiles linked to portfolio projects."
                    />
                    <Button asChild>
                        <Link href={create()}>Add Client</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 bg-card">
                    <table className="min-w-[820px] w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Slug</th>
                                <th className="px-4 py-3 text-left">Website</th>
                                <th className="px-4 py-3 text-left">Projects</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr
                                    key={client.id}
                                    className="border-t border-sidebar-border/70"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 rounded-xl">
                                                <AvatarImage
                                                    src={client.logo_url ?? undefined}
                                                    alt={client.name}
                                                />
                                                <AvatarFallback className="rounded-xl text-xs font-semibold">
                                                    {client.name
                                                        .split(' ')
                                                        .map((part) =>
                                                            part.charAt(0),
                                                        )
                                                        .join('')
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {client.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {client.slug}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {client.website_url ?? 'Not set'}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {client.portfolios_count}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={edit(client.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(client)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!clients.length && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No clients yet.
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
