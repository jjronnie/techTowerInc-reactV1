import { FormEvent } from 'react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { ImageGalleryUploadField } from '@/components/ui/image-gallery-upload-field';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TechnologyIconPreview } from '@/components/ui/technology-icon-preview';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as clientsIndex } from '@/routes/admin/clients';
import { index as projectTypesIndex } from '@/routes/admin/project-types';
import { index as technologiesIndex } from '@/routes/admin/technologies';

export type PortfolioOption = {
    id: number;
    name: string;
    slug: string;
};

export type TechnologyOption = PortfolioOption & {
    icon_name?: string;
};

export type PortfolioFormData = {
    title: string;
    slug: string;
    summary: string;
    excerpt: string;
    description: string;
    client_id: number | null;
    type_ids: number[];
    category_ids: number[];
    technology_ids: number[];
    project_url: string;
    started_at: string;
    completed_at: string;
    sort_order: number | string;
    is_featured: boolean;
    is_active: boolean;
    featured_image: File | null;
    remove_featured_image: boolean;
    home_featured_image: File | null;
    remove_home_featured_image: boolean;
    existing_gallery_images: string[];
    gallery_images: File[] | null;
    clear_gallery_images: boolean;
    og_image: File | null;
    remove_og_image: boolean;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
};

type GalleryImage = {
    path: string;
    url: string;
};

type PortfolioFormProps = {
    data: PortfolioFormData;
    errors: Record<string, string>;
    processing: boolean;
    projectTypes: PortfolioOption[];
    categories: PortfolioOption[];
    clients: PortfolioOption[];
    technologies: TechnologyOption[];
    onChange: (key: keyof PortfolioFormData, value: PortfolioFormData[keyof PortfolioFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    availableGalleryImages?: GalleryImage[];
    currentFeaturedImageUrl?: string | null;
    currentHomeFeaturedImageUrl?: string | null;
    currentOgImageUrl?: string | null;
};

export default function PortfolioForm({
    data,
    errors,
    processing,
    projectTypes,
    categories,
    clients,
    technologies,
    onChange,
    onSubmit,
    submitLabel,
    availableGalleryImages = [],
    currentFeaturedImageUrl = null,
    currentHomeFeaturedImageUrl = null,
    currentOgImageUrl = null,
}: PortfolioFormProps) {
    const toggleSelection = (
        key: 'type_ids' | 'category_ids' | 'technology_ids',
        id: number,
        checked: boolean,
    ) => {
        const items = checked
            ? [...data[key], id]
            : data[key].filter((itemId) => itemId !== id);

        onChange(key, items);
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
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="grid gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        Project basics
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Set the core content, relationships, and visibility for
                        this portfolio project.
                    </p>
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
                        rows={6}
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input
                        id="project_url"
                        value={data.project_url}
                        onChange={(event) =>
                            onChange('project_url', event.target.value)
                        }
                        placeholder="https://example.com/project"
                    />
                    <InputError message={errors.project_url} />
                </div>
            </div>

            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            Relationships
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Connect this project to categories, a client, and
                            technologies managed in the database.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Button asChild variant="outline" size="sm">
                            <Link href={categoriesIndex()}>Manage categories</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={clientsIndex()}>Manage clients</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={projectTypesIndex()}>
                                Manage project types
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={technologiesIndex()}>
                                Manage technologies
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="client_id">Client</Label>
                    <select
                        id="client_id"
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs"
                        value={data.client_id ?? ''}
                        onChange={(event) =>
                            onChange(
                                'client_id',
                                event.target.value === ''
                                    ? null
                                    : Number(event.target.value),
                            )
                        }
                    >
                        <option value="">No client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.client_id} />
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label>Project types</Label>
                        <p className="text-sm text-muted-foreground">
                            Choose one or more types used on cards and the
                            portfolio filter tabs.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {projectTypes.map((projectType) => (
                            <label
                                key={projectType.id}
                                className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background px-4 py-3"
                            >
                                <Checkbox
                                    checked={data.type_ids.includes(
                                        projectType.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                        toggleSelection(
                                            'type_ids',
                                            projectType.id,
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <span className="text-sm font-medium text-foreground">
                                    {projectType.name}
                                </span>
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.type_ids} />
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label>Categories</Label>
                        <p className="text-sm text-muted-foreground">
                            Choose one or more categories for filtering and
                            discovery.
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
                                        toggleSelection(
                                            'category_ids',
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
                    <div className="grid gap-2">
                        <Label>Technologies</Label>
                        <p className="text-sm text-muted-foreground">
                            These power the project detail page and the homepage
                            marquee.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {technologies.map((technology) => (
                            <label
                                key={technology.id}
                                className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background px-4 py-3"
                            >
                                <Checkbox
                                    checked={data.technology_ids.includes(
                                        technology.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                        toggleSelection(
                                            'technology_ids',
                                            technology.id,
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <TechnologyIconPreview
                                    iconName={technology.icon_name}
                                    label={technology.name}
                                    size="sm"
                                />
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.technology_ids} />
                </div>
            </div>

            <div className="grid gap-6 rounded-2xl border border-sidebar-border/70 bg-card p-6">
                <div className="grid gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                        Timeline and publishing
                    </h2>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
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

                <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background px-4 py-3">
                        <Checkbox
                            checked={data.is_featured}
                            onCheckedChange={(checked) =>
                                onChange('is_featured', Boolean(checked))
                            }
                        />
                        <div className="grid gap-1">
                            <span className="text-sm font-medium text-foreground">
                                Featured project
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Show this project in highlighted sections. A home featured image is required for the homepage showcase.
                            </span>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-background px-4 py-3">
                        <Checkbox
                            checked={data.is_active}
                            onCheckedChange={(checked) =>
                                onChange('is_active', Boolean(checked))
                            }
                        />
                        <div className="grid gap-1">
                            <span className="text-sm font-medium text-foreground">
                                Active on frontend
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Hide inactive projects from public pages.
                            </span>
                        </div>
                    </label>
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
                    description="Used on portfolio cards and the project detail header."
                    file={data.featured_image}
                    onChange={(file) => onChange('featured_image', file)}
                    currentImageUrl={currentFeaturedImageUrl}
                    error={errors.featured_image}
                    removeCurrent={data.remove_featured_image}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_featured_image', value)
                    }
                />

                <ImageUploadField
                    id="home_featured_image"
                    label="Home featured image"
                    description="Required for featured projects shown in the homepage showcase wall."
                    file={data.home_featured_image}
                    onChange={(file) => onChange('home_featured_image', file)}
                    currentImageUrl={currentHomeFeaturedImageUrl}
                    error={errors.home_featured_image}
                    removeCurrent={data.remove_home_featured_image}
                    onRemoveCurrentChange={(value) =>
                        onChange('remove_home_featured_image', value)
                    }
                />

                <ImageGalleryUploadField
                    id="gallery_images"
                    label="Gallery images"
                    description="Additional project images shown on the frontend."
                    files={data.gallery_images}
                    onChange={(files) => onChange('gallery_images', files)}
                    existingImages={availableGalleryImages}
                    selectedExistingImages={data.existing_gallery_images}
                    onToggleExistingImage={toggleExistingGallery}
                    clearExistingImages={data.clear_gallery_images}
                    onClearExistingImagesChange={(value) =>
                        onChange('clear_gallery_images', value)
                    }
                    error={errors.gallery_images}
                />

                <ImageUploadField
                    id="og_image"
                    label="SEO image"
                    description="Used for social sharing cards and search previews."
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
            </div>

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
