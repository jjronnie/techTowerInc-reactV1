import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type TeamMemberFormData = {
    name: string;
    title: string;
    bio: string;
    photo: File | null;
    remove_photo: boolean;
    sort_order: number | string;
    is_published: boolean;
};

type TeamMemberFormProps = {
    data: TeamMemberFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof TeamMemberFormData, value: TeamMemberFormData[keyof TeamMemberFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    currentPhotoUrl?: string | null;
};

export default function TeamMemberForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    currentPhotoUrl = null,
}: TeamMemberFormProps) {
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

            <ImageUploadField
                id="photo"
                label="Photo"
                description="Upload an optional team photo used on the about page slider."
                file={data.photo}
                onChange={(file) => onChange('photo', file)}
                currentImageUrl={currentPhotoUrl}
                error={errors.photo}
                removeCurrent={data.remove_photo}
                onRemoveCurrentChange={(value) =>
                    onChange('remove_photo', value)
                }
            />

            <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    value={data.bio}
                    onChange={(event) => onChange('bio', event.target.value)}
                    rows={4}
                />
                <InputError message={errors.bio} />
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-card px-4 py-3">
                <Checkbox
                    checked={data.is_published}
                    onCheckedChange={(checked) =>
                        onChange('is_published', Boolean(checked))
                    }
                />
                <div className="grid gap-1">
                    <span className="text-sm font-medium text-foreground">
                        Published on frontend
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Hide this member from the about page without deleting
                        them.
                    </span>
                </div>
            </label>
            <InputError message={errors.is_published} />

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
