import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/technologies';
import TechnologyForm, { type TechnologyFormData } from './technology-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Technologies', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateTechnology() {
    const form = useForm<TechnologyFormData>({
        name: '',
        slug: '',
        icon_name: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Technology" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create Technology"
                    description="Add a technology to reuse across portfolio projects and the homepage marquee."
                />
                <TechnologyForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Technology"
                />
            </div>
        </AppLayout>
    );
}
