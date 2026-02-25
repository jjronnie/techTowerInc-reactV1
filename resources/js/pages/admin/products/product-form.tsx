import { ChangeEvent, FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type ProductFormData = {
    name: string;
    slug: string;
    category: string;
    short_description: string;
    description: string;
    price: string | number;
    purchase_url: string;
    sort_order: number | string;
    is_active: boolean;
    image: File | null;
    remove_image: boolean;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    og_image: File | null;
    remove_og_image: boolean;
};

type ProductFormProps = {
    data: ProductFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof ProductFormData, value: ProductFormData[keyof ProductFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    showRemoveImage?: boolean;
};

export default function ProductForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    showRemoveImage = false,
}: ProductFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(event) => onChange('name', event.target.value)}
                    required
                />
                <InputError message={errors.name} />
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
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    value={data.category}
                    onChange={(event) =>
                        onChange('category', event.target.value)
                    }
                />
                <InputError message={errors.category} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="short_description">Short description</Label>
                <Textarea
                    id="short_description"
                    value={data.short_description}
                    onChange={(event) =>
                        onChange('short_description', event.target.value)
                    }
                    rows={3}
                />
                <InputError message={errors.short_description} />
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
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(event) => onChange('price', event.target.value)}
                />
                <InputError message={errors.price} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="purchase_url">Purchase URL</Label>
                <Input
                    id="purchase_url"
                    value={data.purchase_url}
                    onChange={(event) =>
                        onChange('purchase_url', event.target.value)
                    }
                />
                <InputError message={errors.purchase_url} />
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
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) =>
                        onChange('is_active', Boolean(checked))
                    }
                />
                <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">Product image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(
                            'image',
                            event.target.files?.[0] ?? null,
                        )
                    }
                />
                <InputError message={errors.image} />
            </div>

            {showRemoveImage && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remove_image"
                        checked={data.remove_image}
                        onCheckedChange={(checked) =>
                            onChange('remove_image', Boolean(checked))
                        }
                    />
                    <Label htmlFor="remove_image">
                        Remove current image
                    </Label>
                </div>
            )}

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
