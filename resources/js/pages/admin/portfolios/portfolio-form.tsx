import { ChangeEvent, FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type PortfolioFormData = {
    title: string;
    slug: string;
    label: string;
    summary: string;
    result_label: string;
    result_value: string;
    category: string;
    badge_text: string;
    badge_color: string;
    excerpt: string;
    description: string;
    client_name: string;
    project_url: string;
    technologies: string[];
    started_at: string;
    completed_at: string;
    sort_order: number | string;
    is_featured: boolean;
    is_active: boolean;
    featured_image: File | null;
    remove_featured_image: boolean;
    existing_gallery_images: string[];
    gallery_images: File[] | null;
    clear_gallery_images: boolean;
    og_image: File | null;
    remove_og_image: boolean;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
};

type PortfolioFormProps = {
    data: PortfolioFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof PortfolioFormData, value: PortfolioFormData[keyof PortfolioFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    showExistingGallery?: boolean;
    showRemoveImage?: boolean;
    availableGalleryImages?: string[];
};

export default function PortfolioForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    showExistingGallery = false,
    showRemoveImage = false,
    availableGalleryImages = [],
}: PortfolioFormProps) {
    const updateTechnology = (index: number, value: string) => {
        const updated = [...data.technologies];
        updated[index] = value;
        onChange('technologies', updated);
    };

    const addTechnology = () => {
        onChange('technologies', [...data.technologies, '']);
    };

    const removeTechnology = (index: number) => {
        onChange(
            'technologies',
            data.technologies.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const toggleExistingGallery = (path: string, checked: boolean) => {
        if (checked) {
            onChange('existing_gallery_images', [
                ...data.existing_gallery_images,
                path,
            ]);
            return;
        }

        onChange(
            'existing_gallery_images',
            data.existing_gallery_images.filter((item) => item !== path),
        );
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
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
                />
                <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="label">Label</Label>
                <Input
                    id="label"
                    value={data.label}
                    onChange={(event) => onChange('label', event.target.value)}
                />
                <InputError message={errors.label} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                    id="summary"
                    value={data.summary}
                    onChange={(event) => onChange('summary', event.target.value)}
                    rows={3}
                />
                <InputError message={errors.summary} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="result_label">Result label</Label>
                <Input
                    id="result_label"
                    value={data.result_label}
                    onChange={(event) =>
                        onChange('result_label', event.target.value)
                    }
                />
                <InputError message={errors.result_label} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="result_value">Result value</Label>
                <Input
                    id="result_value"
                    value={data.result_value}
                    onChange={(event) =>
                        onChange('result_value', event.target.value)
                    }
                />
                <InputError message={errors.result_value} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    value={data.category}
                    onChange={(event) => onChange('category', event.target.value)}
                />
                <InputError message={errors.category} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="badge_text">Badge text</Label>
                <Input
                    id="badge_text"
                    value={data.badge_text}
                    onChange={(event) =>
                        onChange('badge_text', event.target.value)
                    }
                />
                <InputError message={errors.badge_text} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="badge_color">Badge color</Label>
                <Input
                    id="badge_color"
                    value={data.badge_color}
                    onChange={(event) =>
                        onChange('badge_color', event.target.value)
                    }
                    placeholder="#FFFFFF"
                />
                <InputError message={errors.badge_color} />
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(event) =>
                        onChange('description', event.target.value)
                    }
                    rows={5}
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="client_name">Client name</Label>
                <Input
                    id="client_name"
                    value={data.client_name}
                    onChange={(event) =>
                        onChange('client_name', event.target.value)
                    }
                />
                <InputError message={errors.client_name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="project_url">Project URL</Label>
                <Input
                    id="project_url"
                    value={data.project_url}
                    onChange={(event) =>
                        onChange('project_url', event.target.value)
                    }
                />
                <InputError message={errors.project_url} />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center justify-between">
                    <Label>Technologies</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addTechnology}
                    >
                        Add technology
                    </Button>
                </div>
                {data.technologies.map((tech, index) => (
                    <div className="flex gap-2" key={`tech-${index}`}>
                        <Input
                            value={tech}
                            onChange={(event) =>
                                updateTechnology(index, event.target.value)
                            }
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeTechnology(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <InputError message={errors.technologies} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="started_at">Started at</Label>
                <Input
                    id="started_at"
                    type="date"
                    value={data.started_at}
                    onChange={(event) =>
                        onChange('started_at', event.target.value)
                    }
                />
                <InputError message={errors.started_at} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="completed_at">Completed at</Label>
                <Input
                    id="completed_at"
                    type="date"
                    value={data.completed_at}
                    onChange={(event) =>
                        onChange('completed_at', event.target.value)
                    }
                />
                <InputError message={errors.completed_at} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="sort_order">Sort order</Label>
                <Input
                    id="sort_order"
                    type="number"
                    value={data.sort_order}
                    onChange={(event) =>
                        onChange('sort_order', event.target.value)
                    }
                />
                <InputError message={errors.sort_order} />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) =>
                        onChange('is_featured', Boolean(checked))
                    }
                />
                <Label htmlFor="is_featured">Featured</Label>
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) =>
                        onChange('is_active', Boolean(checked))
                    }
                />
                <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="featured_image">Featured image</Label>
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

            {showExistingGallery && (
                <div className="grid gap-2">
                    <Label>Existing gallery images</Label>
                    <div className="space-y-2">
                        {availableGalleryImages.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No gallery images yet.
                            </p>
                        )}
                        {availableGalleryImages.map((path) => (
                            <div
                                className="flex items-center gap-2"
                                key={path}
                            >
                                <Checkbox
                                    checked={data.existing_gallery_images.includes(path)}
                                    onCheckedChange={(checked) =>
                                        toggleExistingGallery(
                                            path,
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <span className="text-sm text-muted-foreground">
                                    {path}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="clear_gallery_images"
                            checked={data.clear_gallery_images}
                            onCheckedChange={(checked) =>
                                onChange('clear_gallery_images', Boolean(checked))
                            }
                        />
                        <Label htmlFor="clear_gallery_images">
                            Clear gallery images
                        </Label>
                    </div>
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="gallery_images">Gallery images</Label>
                <Input
                    id="gallery_images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(
                            'gallery_images',
                            event.target.files
                                ? Array.from(event.target.files)
                                : null,
                        )
                    }
                />
                <InputError message={errors.gallery_images} />
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
                <Label htmlFor="og_image">SEO image</Label>
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
