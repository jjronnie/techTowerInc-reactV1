import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/portfolios';
import PortfolioForm, { type PortfolioFormData } from './portfolio-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Portfolios', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreatePortfolio() {
    const form = useForm<PortfolioFormData>({
        title: '',
        slug: '',
        label: '',
        summary: '',
        result_label: '',
        result_value: '',
        category: '',
        badge_text: '',
        badge_color: '',
        excerpt: '',
        description: '',
        client_name: '',
        project_url: '',
        technologies: [],
        started_at: '',
        completed_at: '',
        sort_order: 0,
        is_featured: false,
        is_active: true,
        featured_image: null,
        remove_featured_image: false,
        existing_gallery_images: [],
        gallery_images: null,
        clear_gallery_images: false,
        og_image: null,
        remove_og_image: false,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Portfolio" />
            <div className="flex flex-col gap-6 p-4">
                <Heading title="Create Portfolio" />
                <PortfolioForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Portfolio"
                />
            </div>
        </AppLayout>
    );
}
