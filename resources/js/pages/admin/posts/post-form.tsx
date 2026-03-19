import { FormEvent } from 'react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Textarea } from '@/components/ui/textarea';
import { index as categoriesIndex } from '@/routes/admin/categories';

export type PostCategoryOption = {
    id: number;
    name: string;
    slug: string;
};

export type PostFormData = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    published_at: string;
    reading_time: number | string;
    category_ids: number[];
    tags: string[];
    featured_image: File | null;
    remove_featured_image: boolean;
    image_alt: string;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    canonical_url: string;
    robots: string;
    og_image: File | null;
    remove_og_image: boolean;
};

type PostFormProps = {
    data: PostFormData;
    errors: Record<string, string>;
    processing: boolean;
    categories: PostCategoryOption[];
    onChange: (key: keyof PostFormData, value: PostFormData[keyof PostFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    currentFeaturedImageUrl?: string | null;
    currentOgImageUrl?: string | null;
};

export default function PostForm({
    data,
    errors,
    processing,
    categories,
    onChange,
    onSubmit,
    submitLabel,
    currentFeaturedImageUrl = null,
    currentOgImageUrl = null,
}: PostFormProps) {
    const updateTag = (index: number, value: string) => {
        const updated = [...data.tags];
        updated[index] = value;
        onChange('tags', updated);
    };

    const addTag = () => {
        onChange('tags', [...data.tags, '']);
    };

    const removeTag = (index: number) => {
        onChange(
            'tags',
            data.tags.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const toggleCategory = (id: number, checked: boolean) => {
        const nextCategories = checked
            ? [...data.category_ids, id]
            : data.category_ids.filter((categoryId) => categoryId !== id);

        onChange('category_ids', nextCategories);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="grid gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        Post content
                    </h2>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(event) => onChange('title', event.target.value)}
                        required
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={data.slug}
                        onChange={(event) => onChange('slug', event.target.value)}
                        placeholder="Leave blank to auto-generate"
                    />
                    <InputError message={errors.slug} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        value={data.excerpt}
                        onChange={(event) => onChange('excerpt', event.target.value)}
                        rows={3}
                    />
                    <InputError message={errors.excerpt} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <RichTextEditor
                        id="content"
                        value={data.content}
                        onChange={(value) => onChange('content', value)}
                        invalid={Boolean(errors.content)}
                    />
                    <InputError message={errors.content} />
                </div>
            </div>

            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            Publishing
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Pick the status, categories, and publication details
                            for this article.
                        </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href={categoriesIndex()}>Manage categories</Link>
                    </Button>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs"
                            value={data.status}
                            onChange={(event) =>
                                onChange('status', event.target.value)
                            }
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <InputError message={errors.status} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="published_at">Publish date</Label>
                        <Input
                            id="published_at"
                            type="datetime-local"
                            value={data.published_at}
                            onChange={(event) =>
                                onChange('published_at', event.target.value)
                            }
                        />
                        <InputError message={errors.published_at} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="reading_time">Reading time (minutes)</Label>
                    <Input
                        id="reading_time"
                        type="number"
                        value={data.reading_time}
                        onChange={(event) =>
                            onChange('reading_time', event.target.value)
                        }
                    />
                    <InputError message={errors.reading_time} />
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label>Categories</Label>
                        <p className="text-sm text-muted-foreground">
                            Choose one or more categories from the database.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background px-4 py-3"
                            >
                                <Checkbox
                                    checked={data.category_ids.includes(
                                        category.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                        toggleCategory(
                                            category.id,
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <span className="text-sm font-medium text-foreground">
                                    {category.name}
                                </span>
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.category_ids} />
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label>Tags</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTag}
                        >
                            Add tag
                        </Button>
                    </div>
                    {data.tags.map((tag, index) => (
                        <div className="flex gap-2" key={`tag-${index}`}>
                            <Input
                                value={tag}
                                onChange={(event) =>
                                    updateTag(index, event.target.value)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeTag(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <InputError message={errors.tags} />
                </div>
            </div>

            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="grid gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        Images
                    </h2>
                </div>

                <ImageUploadField
                    id="featured_image"
                    label="Featured image"
                    description="Displayed on blog cards and at the top of the article."
                    file={data.featured_image}
                    onChange={(file) => onChange('featured_image', file)}
                    currentImageUrl={currentFeaturedImageUrl}
                    error={errors.featured_image}
                    removeCurrent={data.remove_featured_image}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_featured_image', value)
                    }
                />

                <div className="grid gap-2">
                    <Label htmlFor="image_alt">Image alt text</Label>
                    <Input
                        id="image_alt"
                        value={data.image_alt}
                        onChange={(event) =>
                            onChange('image_alt', event.target.value)
                        }
                    />
                    <InputError message={errors.image_alt} />
                </div>

                <ImageUploadField
                    id="og_image"
                    label="SEO image"
                    description="Used for social sharing previews."
                    file={data.og_image}
                    onChange={(file) => onChange('og_image', file)}
                    currentImageUrl={currentOgImageUrl}
                    error={errors.og_image}
                    removeCurrent={data.remove_og_image}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_og_image', value)
                    }
                />
            </div>

            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="grid gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        SEO
                    </h2>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="seo_title">SEO title</Label>
                    <Input
                        id="seo_title"
                        value={data.seo_title}
                        onChange={(event) => onChange('seo_title', event.target.value)}
                    />
                    <InputError message={errors.seo_title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="seo_description">SEO description</Label>
                    <Textarea
                        id="seo_description"
                        value={data.seo_description}
                        onChange={(event) =>
                            onChange('seo_description', event.target.value)
                        }
                        rows={3}
                    />
                    <InputError message={errors.seo_description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="seo_keywords">SEO keywords</Label>
                    <Textarea
                        id="seo_keywords"
                        value={data.seo_keywords}
                        onChange={(event) =>
                            onChange('seo_keywords', event.target.value)
                        }
                        rows={2}
                    />
                    <InputError message={errors.seo_keywords} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="canonical_url">Canonical URL</Label>
                    <Input
                        id="canonical_url"
                        value={data.canonical_url}
                        onChange={(event) =>
                            onChange('canonical_url', event.target.value)
                        }
                    />
                    <InputError message={errors.canonical_url} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="robots">Robots</Label>
                    <Input
                        id="robots"
                        value={data.robots}
                        onChange={(event) => onChange('robots', event.target.value)}
                        placeholder="index, follow"
                    />
                    <InputError message={errors.robots} />
                </div>
            </div>

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
