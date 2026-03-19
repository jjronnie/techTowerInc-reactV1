import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/clients';
import ClientForm, { type ClientFormData } from './client-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Clients', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateClient() {
    const form = useForm<ClientFormData>({
        name: '',
        slug: '',
        website_url: '',
        description: '',
        logo: null,
        remove_logo: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Client" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create Client"
                    description="Add a client profile that can be attached to portfolio projects."
                />
                <ClientForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Client"
                />
            </div>
        </AppLayout>
    );
}
