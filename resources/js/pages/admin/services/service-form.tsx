import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type ServiceFormData = {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    icon: string;
    highlights: string[];
    timeline: string;
    deliverables: string[];
    sort_order: number | string;
    is_active: boolean;
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    og_image: File | null;
    remove_og_image: boolean;
};

type ServiceFormProps = {
    data: ServiceFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof ServiceFormData, value: ServiceFormData[keyof ServiceFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    currentOgImageUrl?: string | null;
};

export default function ServiceForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    currentOgImageUrl = null,
}: ServiceFormProps) {
    const updateArrayItem = (
        key: 'highlights' | 'deliverables',
        index: number,
        value: string,
    ) => {
        const updated = [...data[key]];
        updated[index] = value;
        onChange(key, updated);
    };

    const addArrayItem = (key: 'highlights' | 'deliverables') => {
        onChange(key, [...data[key], '']);
    };

    const removeArrayItem = (key: 'highlights' | 'deliverables', index: number) => {
        onChange(
            key,
            data[key].filter((_, itemIndex) => itemIndex !== index),
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
                    placeholder="Leave blank to auto-generate"
                />
                <InputError message={errors.slug} />
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
                    onChange={(event) => onChange('description', event.target.value)}
                    rows={5}
                />
                <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="icon">Icon key</Label>
                <Input
                    id="icon"
                    value={data.icon}
                    onChange={(event) => onChange('icon', event.target.value)}
                    placeholder="e.g. globe, shield"
                />
                <InputError message={errors.icon} />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center justify-between">
                    <Label>Highlights</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('highlights')}
                    >
                        Add highlight
                    </Button>
                </div>
                {data.highlights.map((highlight, index) => (
                    <div className="flex gap-2" key={`highlight-${index}`}>
                        <Input
                            value={highlight}
                            onChange={(event) =>
                                updateArrayItem(
                                    'highlights',
                                    index,
                                    event.target.value,
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeArrayItem('highlights', index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <InputError message={errors.highlights} />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center justify-between">
                    <Label>Deliverables</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem('deliverables')}
                    >
                        Add deliverable
                    </Button>
                </div>
                {data.deliverables.map((deliverable, index) => (
                    <div className="flex gap-2" key={`deliverable-${index}`}>
                        <Input
                            value={deliverable}
                            onChange={(event) =>
                                updateArrayItem(
                                    'deliverables',
                                    index,
                                    event.target.value,
                                )
                            }
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                removeArrayItem('deliverables', index)
                            }
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <InputError message={errors.deliverables} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                    id="timeline"
                    value={data.timeline}
                    onChange={(event) => onChange('timeline', event.target.value)}
                />
                <InputError message={errors.timeline} />
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

            <ImageUploadField
                id="og_image"
                label="SEO image"
                description="Used for service sharing previews."
                file={data.og_image}
                onChange={(file) => onChange('og_image', file)}
                currentImageUrl={currentOgImageUrl}
                error={errors.og_image}
                removeCurrent={data.remove_og_image}
                onRemoveCurrentChange={(value) =>
                    onChange('remove_og_image', value)
                }
            />

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
