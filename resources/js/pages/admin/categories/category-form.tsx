import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type CategoryFormData = {
    name: string;
    slug: string;
};

type CategoryFormProps = {
    data: CategoryFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof CategoryFormData, value: CategoryFormData[keyof CategoryFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
};

export default function CategoryForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
}: CategoryFormProps) {
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

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
