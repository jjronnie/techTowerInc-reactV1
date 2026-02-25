import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/services';
import ServiceForm, { type ServiceFormData } from './service-form';

type Service = {
    id: number;
    title: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    icon: string | null;
    highlights: string[] | null;
    timeline: string | null;
    deliverables: string[] | null;
    sort_order: number | null;
    is_active: boolean;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
};

type EditServiceProps = {
    service: Service;
};

export default function EditService({ service }: EditServiceProps) {
    const form = useForm<ServiceFormData>({
        title: service.title ?? '',
        slug: service.slug ?? '',
        short_description: service.short_description ?? '',
        description: service.description ?? '',
        icon: service.icon ?? '',
        highlights: service.highlights ?? [],
        timeline: service.timeline ?? '',
        deliverables: service.deliverables ?? [],
        sort_order: service.sort_order ?? 0,
        is_active: service.is_active ?? true,
        seo_title: service.seo_title ?? '',
        seo_description: service.seo_description ?? '',
        seo_keywords: service.seo_keywords ?? '',
        og_image: null,
        remove_og_image: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(service.id).url, {
            forceFormData: true,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: dashboard().url },
        { title: 'Services', href: index().url },
        { title: service.title, href: update(service.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${service.title}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${service.title}`} />
                <ServiceForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    showRemoveImage
                />
            </div>
        </AppLayout>
    );
}
