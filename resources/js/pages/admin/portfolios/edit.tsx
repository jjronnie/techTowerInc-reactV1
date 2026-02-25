import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/portfolios';
import PortfolioForm, { type PortfolioFormData } from './portfolio-form';

type Portfolio = {
    id: number;
    title: string;
    slug: string;
    label: string | null;
    summary: string | null;
    result_label: string | null;
    result_value: string | null;
    category: string | null;
    badge_text: string | null;
    badge_color: string | null;
    excerpt: string | null;
    description: string | null;
    client_name: string | null;
    project_url: string | null;
    technologies: string[] | null;
    started_at: string | null;
    completed_at: string | null;
    sort_order: number | null;
    is_featured: boolean;
    is_active: boolean;
    gallery_images: string[] | null;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
};

type EditPortfolioProps = {
    portfolio: Portfolio;
};

export default function EditPortfolio({ portfolio }: EditPortfolioProps) {
    const form = useForm<PortfolioFormData>({
        title: portfolio.title ?? '',
        slug: portfolio.slug ?? '',
        label: portfolio.label ?? '',
        summary: portfolio.summary ?? '',
        result_label: portfolio.result_label ?? '',
        result_value: portfolio.result_value ?? '',
        category: portfolio.category ?? '',
        badge_text: portfolio.badge_text ?? '',
        badge_color: portfolio.badge_color ?? '',
        excerpt: portfolio.excerpt ?? '',
        description: portfolio.description ?? '',
        client_name: portfolio.client_name ?? '',
        project_url: portfolio.project_url ?? '',
        technologies: portfolio.technologies ?? [],
        started_at: portfolio.started_at ?? '',
        completed_at: portfolio.completed_at ?? '',
        sort_order: portfolio.sort_order ?? 0,
        is_featured: portfolio.is_featured ?? false,
        is_active: portfolio.is_active ?? true,
        featured_image: null,
        remove_featured_image: false,
        existing_gallery_images: portfolio.gallery_images ?? [],
        gallery_images: null,
        clear_gallery_images: false,
        og_image: null,
        remove_og_image: false,
        seo_title: portfolio.seo_title ?? '',
        seo_description: portfolio.seo_description ?? '',
        seo_keywords: portfolio.seo_keywords ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(portfolio.id).url, { forceFormData: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: dashboard().url },
        { title: 'Portfolios', href: index().url },
        { title: portfolio.title, href: update(portfolio.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${portfolio.title}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${portfolio.title}`} />
                <PortfolioForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    showExistingGallery
                    showRemoveImage
                    availableGalleryImages={portfolio.gallery_images ?? []}
                />
            </div>
        </AppLayout>
    );
}
