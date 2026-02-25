import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, store } from '@/routes/admin/services';
import ServiceForm, { type ServiceFormData } from './service-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: dashboard().url },
    { title: 'Services', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateService() {
    const form = useForm<ServiceFormData>({
        title: '',
        slug: '',
        short_description: '',
        description: '',
        icon: '',
        highlights: [],
        timeline: '',
        deliverables: [],
        sort_order: 0,
        is_active: true,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        og_image: null,
        remove_og_image: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Service" />
            <div className="flex flex-col gap-6 p-4">
                <Heading title="Create Service" />
                <ServiceForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Service"
                />
            </div>
        </AppLayout>
    );
}
