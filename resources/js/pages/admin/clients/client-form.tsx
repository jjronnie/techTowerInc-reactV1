import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

export type ClientFormData = {
    name: string;
    slug: string;
    website_url: string;
    description: string;
    logo: File | null;
    remove_logo: boolean;
};

type ClientFormProps = {
    data: ClientFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof ClientFormData, value: ClientFormData[keyof ClientFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    currentLogoUrl?: string | null;
};

export default function ClientForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    currentLogoUrl = null,
}: ClientFormProps) {
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
                    placeholder="Leave blank to auto-generate"
                />
                <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                    id="website_url"
                    value={data.website_url}
                    onChange={(event) =>
                        onChange('website_url', event.target.value)
                    }
                    placeholder="https://example.com"
                />
                <InputError message={errors.website_url} />
            </div>

            <ImageUploadField
                id="logo"
                label="Logo"
                description="Optional client logo shown on cards and the client page."
                file={data.logo}
                onChange={(file) => onChange('logo', file)}
                currentImageUrl={currentLogoUrl}
                error={errors.logo}
                removeCurrent={data.remove_logo}
                onRemoveCurrentChange={(value) =>
                    onChange('remove_logo', value)
                }
            />

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                    id="description"
                    value={data.description}
                    onChange={(value) => onChange('description', value)}
                    placeholder="Write the client overview shown on the client page..."
                    invalid={Boolean(errors.description)}
                />
                <InputError message={errors.description} />
            </div>

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
