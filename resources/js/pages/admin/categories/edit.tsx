import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/categories';
import CategoryForm, { type CategoryFormData } from './category-form';

type Category = {
    id: number;
    name: string;
    slug: string;
};

type EditCategoryProps = {
    category: Category;
};

export default function EditCategory({ category }: EditCategoryProps) {
    const form = useForm<CategoryFormData>({
        name: category.name ?? '',
        slug: category.slug ?? '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(category.id).url);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Categories', href: index().url },
        { title: category.name, href: update(category.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${category.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${category.name}`} />
                <CategoryForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Save Changes"
                />
            </div>
        </AppLayout>
    );
}
