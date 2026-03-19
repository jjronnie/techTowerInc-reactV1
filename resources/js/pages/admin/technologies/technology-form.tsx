import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    cleanTechnologyIconName,
    normalizeTechnologyIconName,
    TechnologyIconPreview,
} from '@/components/ui/technology-icon-preview';

export type TechnologyFormData = {
    name: string;
    slug: string;
    icon_name: string;
};

type TechnologyFormProps = {
    data: TechnologyFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof TechnologyFormData, value: TechnologyFormData[keyof TechnologyFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
};

export default function TechnologyForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
}: TechnologyFormProps) {
    const cleanedIconName = cleanTechnologyIconName(data.icon_name);
    const normalizedIconName = normalizeTechnologyIconName(data.icon_name);
    const resolvesAlias =
        Boolean(cleanedIconName) && normalizedIconName !== cleanedIconName;

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
                <Label htmlFor="icon_name">Icon name</Label>
                <Input
                    id="icon_name"
                    value={data.icon_name}
                    onChange={(event) =>
                        onChange('icon_name', event.target.value)
                    }
                    placeholder="react, laravel, nodedotjs, postgresql"
                />
                <div className="rounded-2xl border border-sidebar-border/70 bg-muted/20 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Icon preview
                    </p>
                    <TechnologyIconPreview
                        iconName={data.icon_name}
                        label={data.name || 'Technology'}
                        size="lg"
                        className="mt-3"
                    />
                    {normalizedIconName ? (
                        <p className="mt-3 text-xs text-muted-foreground">
                            {resolvesAlias ? (
                                <>
                                    This value resolves to{' '}
                                    <span className="font-medium text-foreground">
                                        {normalizedIconName}
                                    </span>
                                    .
                                </>
                            ) : (
                                <>
                                    Saved icon key:{' '}
                                    <span className="font-medium text-foreground">
                                        {normalizedIconName}
                                    </span>
                                    .
                                </>
                            )}
                        </p>
                    ) : (
                        <p className="mt-3 text-xs text-muted-foreground">
                            Add a Simple Icons name to preview the icon here.
                        </p>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Use the saved icon key that matches the frontend marquee
                    icon map.{' '}
                    <a
                        href="https://simpleicons.org/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-primary underline-offset-4 transition hover:underline"
                    >
                        Browse icon names on Simple Icons
                    </a>
                    . Common aliases like `tailwind`, `aws`, `nodejs`, and
                    `postgres` are normalized automatically.
                </p>
                <InputError message={errors.icon_name} />
            </div>

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
