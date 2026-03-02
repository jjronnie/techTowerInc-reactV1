import { ChangeEvent, FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Textarea } from '@/components/ui/textarea';

export type PostFormData = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    published_at: string;
    reading_time: number | string;
    categories: string[];
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
    onChange: (key: keyof PostFormData, value: PostFormData[keyof PostFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    showRemoveImage?: boolean;
    currentFeaturedImageUrl?: string | null;
    currentOgImageUrl?: string | null;
};

export default function PostForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    showRemoveImage = false,
    currentFeaturedImageUrl = null,
    currentOgImageUrl = null,
}: PostFormProps) {
    const updateArrayItem = (
        key: 'categories' | 'tags',
        index: number,
        value: string,
    ) => {
        const updated = [...data[key]];
        updated[index] = value;
        onChange(key, updated);
    };

    const addArrayItem = (key: 'categories' | 'tags') => {
        onChange(key, [...data[key], '']);
    };

    const removeArrayItem = (key: 'categories' | 'tags', index: number) => {
        onChange(
            key,
            data[key].filter((_, itemIndex) => itemIndex !== index),
        );
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <p className="text-sm text-muted-foreground">
                    The headline shown on the post page and blog listings.
                </p>
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
                <p className="text-sm text-muted-foreground">
                    URL-friendly identifier. Leave blank to auto-generate.
                </p>
                <Input
                    id="slug"
                    value={data.slug}
                    onChange={(event) => onChange('slug', event.target.value)}
                />
                <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <p className="text-sm text-muted-foreground">
                    Short summary for blog cards and meta previews.
                </p>
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
                <p className="text-sm text-muted-foreground">
                    Main body of the article.
                </p>
                <RichTextEditor
                    id="content"
                    value={data.content}
                    onChange={(value) => onChange('content', value)}
                    invalid={Boolean(errors.content)}
                />
                <InputError message={errors.content} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <p className="text-sm text-muted-foreground">
                    Draft posts are hidden. Published posts show on the site.
                </p>
                <select
                    id="status"
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
                    value={data.status}
                    onChange={(event) => onChange('status', event.target.value)}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <InputError message={errors.status} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="published_at">Publish date</Label>
                <p className="text-sm text-muted-foreground">
                    Used when the status is set to published.
                </p>
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

            <div className="grid gap-2">
                <Label htmlFor="reading_time">Reading time (minutes)</Label>
                <p className="text-sm text-muted-foreground">
                    Displayed on the post detail page.
                </p>
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
                <div className="flex items-center justify-between">
                    <Label>Categories</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('categories')}
                    >
                        Add category
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Used for filtering and grouping posts.
                </p>
                {data.categories.map((category, index) => (
                    <div className="flex gap-2" key={`category-${index}`}>
                        <Input
                            value={category}
                            onChange={(event) =>
                                updateArrayItem(
                                    'categories',
                                    index,
                                    event.target.value,
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                removeArrayItem('categories', index)
                            }
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <InputError message={errors.categories} />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center justify-between">
                    <Label>Tags</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('tags')}
                    >
                        Add tag
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Helps readers find related topics.
                </p>
                {data.tags.map((tag, index) => (
                    <div className="flex gap-2" key={`tag-${index}`}>
                        <Input
                            value={tag}
                            onChange={(event) =>
                                updateArrayItem(
                                    'tags',
                                    index,
                                    event.target.value,
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeArrayItem('tags', index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <InputError message={errors.tags} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="featured_image">Featured image</Label>
                <p className="text-sm text-muted-foreground">
                    Displayed on blog cards and at the top of the post.
                </p>
                <Input
                    id="featured_image"
                    type="file"
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(
                            'featured_image',
                            event.target.files?.[0] ?? null,
                        )
                    }
                />
                <InputError message={errors.featured_image} />
                {currentFeaturedImageUrl && !data.remove_featured_image && (
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <img
                            src={currentFeaturedImageUrl}
                            alt="Current featured"
                            className="h-12 w-20 rounded-md object-cover"
                        />
                        <span>Current featured image</span>
                    </div>
                )}
            </div>

            {showRemoveImage && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_featured_image"
                        checked={data.remove_featured_image}
                        onCheckedChange={(checked) =>
                            onChange('remove_featured_image', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_featured_image">
                        Remove current featured image
                    </Label>
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="image_alt">Image alt text</Label>
                <p className="text-sm text-muted-foreground">
                    Accessibility text for the featured image.
                </p>
                <Input
                    id="image_alt"
                    value={data.image_alt}
                    onChange={(event) => onChange('image_alt', event.target.value)}
                />
                <InputError message={errors.image_alt} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="seo_title">SEO title</Label>
                <p className="text-sm text-muted-foreground">
                    Overrides the default page title for search engines.
                </p>
                <Input
                    id="seo_title"
                    value={data.seo_title}
                    onChange={(event) => onChange('seo_title', event.target.value)}
                />
                <InputError message={errors.seo_title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="seo_description">SEO description</Label>
                <p className="text-sm text-muted-foreground">
                    Appears in search results and social previews.
                </p>
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
                <p className="text-sm text-muted-foreground">
                    Comma-separated keywords for search metadata.
                </p>
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
                <p className="text-sm text-muted-foreground">
                    Use this to prevent duplicate content issues.
                </p>
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
                <p className="text-sm text-muted-foreground">
                    Controls indexing (e.g. index, follow or noindex, nofollow).
                </p>
                <Input
                    id="robots"
                    value={data.robots}
                    onChange={(event) => onChange('robots', event.target.value)}
                    placeholder="index, follow"
                />
                <InputError message={errors.robots} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="og_image">SEO image</Label>
                <p className="text-sm text-muted-foreground">
                    Image used for social sharing cards.
                </p>
                <Input
                    id="og_image"
                    type="file"
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(
                            'og_image',
                            event.target.files?.[0] ?? null,
                        )
                    }
                />
                <InputError message={errors.og_image} />
                {currentOgImageUrl && !data.remove_og_image && (
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <img
                            src={currentOgImageUrl}
                            alt="Current SEO"
                            className="h-12 w-20 rounded-md object-cover"
                        />
                        <span>Current SEO image</span>
                    </div>
                )}
            </div>

            {showRemoveImage && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_og_image"
                        checked={data.remove_og_image}
                        onCheckedChange={(checked) =>
                            onChange('remove_og_image', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_og_image">
                        Remove current SEO image
                    </Label>
                </div>
            )}

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
