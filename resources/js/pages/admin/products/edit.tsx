import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/admin/products';
import ProductForm, { type ProductFormData } from './product-form';

type Product = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    short_description: string | null;
    description: string | null;
    price: number | null;
    purchase_url: string | null;
    sort_order: number | null;
    is_active: boolean;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
};

type EditProductProps = {
    product: Product;
};

export default function EditProduct({ product }: EditProductProps) {
    const form = useForm<ProductFormData>({
        name: product.name ?? '',
        slug: product.slug ?? '',
        category: product.category ?? '',
        short_description: product.short_description ?? '',
        description: product.description ?? '',
        price: product.price ?? '',
        purchase_url: product.purchase_url ?? '',
        sort_order: product.sort_order ?? 0,
        is_active: product.is_active ?? true,
        image: null,
        remove_image: false,
        seo_title: product.seo_title ?? '',
        seo_description: product.seo_description ?? '',
        seo_keywords: product.seo_keywords ?? '',
        og_image: null,
        remove_og_image: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(product.id).url, { forceFormData: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Products', href: index().url },
        { title: product.name, href: update(product.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${product.name}`} />
                <ProductForm
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
