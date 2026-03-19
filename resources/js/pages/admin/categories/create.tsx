import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/categories';
import CategoryForm, { type CategoryFormData } from './category-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Categories', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateCategory() {
    const form = useForm<CategoryFormData>({
        name: '',
        slug: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Create Category"
                    description="Add a reusable category for portfolio projects and posts."
                />
                <CategoryForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Category"
                />
            </div>
        </AppLayout>
    );
}
