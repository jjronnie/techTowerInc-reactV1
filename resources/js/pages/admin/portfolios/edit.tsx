import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/portfolios';
import PortfolioForm, {
    type PortfolioFormData,
    type PortfolioOption,
    type TechnologyOption,
} from './portfolio-form';

type Portfolio = {
    id: number;
    title: string;
    type: string | null;
    slug: string;
    summary: string | null;
    excerpt: string | null;
    description: string | null;
    client_id: number | null;
    category_ids: number[] | null;
    technology_ids: number[] | null;
    project_url: string | null;
    started_at: string | null;
    completed_at: string | null;
    sort_order: number | null;
    is_featured: boolean;
    is_active: boolean;
    featured_image_url: string | null;
    og_image_url: string | null;
    gallery_images: string[] | null;
    gallery_image_urls: { path: string; url: string }[] | null;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
};

type EditPortfolioProps = {
    portfolio: Portfolio;
    categories: PortfolioOption[];
    clients: PortfolioOption[];
    technologies: TechnologyOption[];
};

export default function EditPortfolio({
    portfolio,
    categories,
    clients,
    technologies,
}: EditPortfolioProps) {
    const form = useForm<PortfolioFormData>({
        title: portfolio.title ?? '',
        type: portfolio.type ?? '',
        slug: portfolio.slug ?? '',
        summary: portfolio.summary ?? '',
        excerpt: portfolio.excerpt ?? '',
        description: portfolio.description ?? '',
        client_id: portfolio.client_id ?? null,
        category_ids: portfolio.category_ids ?? [],
        technology_ids: portfolio.technology_ids ?? [],
        project_url: portfolio.project_url ?? '',
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
        { title: 'Dashboard', href: dashboard().url },
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
                    categories={categories}
                    clients={clients}
                    technologies={technologies}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                    availableGalleryImages={portfolio.gallery_image_urls ?? []}
                    currentFeaturedImageUrl={portfolio.featured_image_url}
                    currentOgImageUrl={portfolio.og_image_url}
                />
            </div>
        </AppLayout>
    );
}
