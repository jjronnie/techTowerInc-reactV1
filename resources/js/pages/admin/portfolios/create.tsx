import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/portfolios';
import PortfolioForm, {
    type PortfolioFormData,
    type PortfolioOption,
    type TechnologyOption,
} from './portfolio-form';

type CreatePortfolioProps = {
    projectTypes: PortfolioOption[];
    categories: PortfolioOption[];
    clients: PortfolioOption[];
    technologies: TechnologyOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Portfolios', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreatePortfolio({
    projectTypes,
    categories,
    clients,
    technologies,
}: CreatePortfolioProps) {
    const form = useForm<PortfolioFormData>({
        title: '',
        slug: '',
        summary: '',
        excerpt: '',
        description: '',
        client_id: null,
        type_ids: [],
        category_ids: [],
        technology_ids: [],
        project_url: '',
        started_at: '',
        completed_at: '',
        sort_order: 0,
        is_featured: false,
        is_active: true,
        featured_image: null,
        remove_featured_image: false,
        home_featured_image: null,
        remove_home_featured_image: false,
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
                <Heading
                    title="Create Portfolio"
                    description="Add a new project with relational content selections."
                />
                <PortfolioForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    projectTypes={projectTypes}
                    categories={categories}
                    clients={clients}
                    technologies={technologies}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Portfolio"
                />
            </div>
        </AppLayout>
    );
}
