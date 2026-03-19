import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/clients';
import ClientForm, { type ClientFormData } from './client-form';

type Client = {
    id: number;
    name: string;
    slug: string;
    website_url: string | null;
    description: string | null;
    logo_url: string | null;
};

type EditClientProps = {
    client: Client;
};

export default function EditClient({ client }: EditClientProps) {
    const form = useForm<ClientFormData>({
        name: client.name ?? '',
        slug: client.slug ?? '',
        website_url: client.website_url ?? '',
        description: client.description ?? '',
        logo: null,
        remove_logo: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(client.id).url, { forceFormData: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Clients', href: index().url },
        { title: client.name, href: update(client.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${client.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${client.name}`} />
                <ClientForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    currentLogoUrl={client.logo_url}
                />
            </div>
        </AppLayout>
    );
}
