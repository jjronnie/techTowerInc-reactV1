import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes/admin';
import { index, update } from '@/routes/admin/posts';
import PostForm, { type PostFormData } from './post-form';

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    status: string;
    published_at: string | null;
    reading_time: number | null;
    categories: string[] | null;
    tags: string[] | null;
    image_alt: string | null;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    canonical_url: string | null;
    robots: string | null;
};

type EditPostProps = {
    post: Post;
};

const formatDatetimeLocal = (value: string | null) => {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);

    return local.toISOString().slice(0, 16);
};

export default function EditPost({ post }: EditPostProps) {
    const form = useForm<PostFormData>({
        title: post.title ?? '',
        slug: post.slug ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        status: post.status ?? 'draft',
        published_at: formatDatetimeLocal(post.published_at),
        reading_time: post.reading_time ?? '',
        categories: post.categories ?? [],
        tags: post.tags ?? [],
        featured_image: null,
        remove_featured_image: false,
        image_alt: post.image_alt ?? '',
        seo_title: post.seo_title ?? '',
        seo_description: post.seo_description ?? '',
        seo_keywords: post.seo_keywords ?? '',
        canonical_url: post.canonical_url ?? '',
        robots: post.robots ?? '',
        og_image: null,
        remove_og_image: false,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.put(update(post.id).url, { forceFormData: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', href: dashboard().url },
        { title: 'Posts', href: index().url },
        { title: post.title, href: update(post.id).url },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${post.title}`} />
            <div className="flex flex-col gap-6 p-4">
                <Heading title={`Edit ${post.title}`} />
                <PostForm
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
