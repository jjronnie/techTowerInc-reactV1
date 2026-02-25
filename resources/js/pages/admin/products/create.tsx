import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, store } from '@/routes/admin/products';
import ProductForm, { type ProductFormData } from './product-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: dashboard().url },
    { title: 'Products', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreateProduct() {
    const form = useForm<ProductFormData>({
        name: '',
        slug: '',
        category: '',
        short_description: '',
        description: '',
        price: '',
        purchase_url: '',
        sort_order: 0,
        is_active: true,
        image: null,
        remove_image: false,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        og_image: null,
        remove_og_image: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(store().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex flex-col gap-6 p-4">
                <Heading title="Create Product" />
                <ProductForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Product"
                />
            </div>
        </AppLayout>
    );
}
