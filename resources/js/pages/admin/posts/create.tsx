import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { index, store } from '@/routes/admin/posts';
import PostForm, { type PostFormData } from './post-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Posts', href: index().url },
    { title: 'Create', href: index().url },
];

export default function CreatePost() {
    const form = useForm<PostFormData>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        status: 'draft',
        published_at: '',
        reading_time: '',
        categories: [],
        tags: [],
        featured_image: null,
        remove_featured_image: false,
        image_alt: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        canonical_url: '',
        robots: '',
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
            <Head title="Create Post" />
            <div className="flex flex-col gap-6 p-4">
                <Heading title="Create Post" description="Publish a new blog post." />
                <PostForm
                    data={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    onChange={form.setData}
                    onSubmit={submit}
                    submitLabel="Create Post"
                />
            </div>
        </AppLayout>
    );
}
