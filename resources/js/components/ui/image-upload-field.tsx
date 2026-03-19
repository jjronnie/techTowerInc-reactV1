import { ChangeEvent, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ImageUploadFieldProps = {
    id: string;
    label: string;
    description?: string;
    error?: string;
    file: File | null;
    onChange: (file: File | null) => void;
    currentImageUrl?: string | null;
    currentImageLabel?: string;
    removeCurrent?: boolean;
    onRemoveCurrentChange?: (value: boolean) => void;
    accept?: string;
};

export function ImageUploadField({
    id,
    label,
    description,
    error,
    file,
    onChange,
    currentImageUrl = null,
    currentImageLabel = 'Current image',
    removeCurrent = false,
    onRemoveCurrentChange,
    accept = 'image/*',
}: ImageUploadFieldProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);

            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    const showCurrentImage = currentImageUrl && !removeCurrent && !previewUrl;

    return (
        <div className="grid gap-3">
            <div className="grid gap-2">
                <Label htmlFor={id}>{label}</Label>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            <label
                htmlFor={id}
                className={cn(
                    'group flex cursor-pointer flex-col gap-4 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 transition hover:border-primary/50 hover:bg-primary/5',
                    error && 'border-red-500/60 bg-red-500/5',
                )}
            >
                <input
                    id={id}
                    type="file"
                    accept={accept}
                    className="sr-only"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(event.target.files?.[0] ?? null)
                    }
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            {file ? 'Replace image' : 'Choose image'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP, or SVG where supported.
                        </p>
                    </div>
                    <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground transition group-hover:border-primary/40 group-hover:text-foreground">
                        Browse
                    </span>
                </div>

                {(previewUrl || showCurrentImage) && (
                    <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
                        <img
                            src={previewUrl ?? currentImageUrl ?? undefined}
                            alt={file?.name ?? currentImageLabel}
                            className="h-48 w-full object-cover"
                        />
                        <div className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-3 text-xs text-muted-foreground">
                            <span className="truncate">
                                {file?.name ?? currentImageLabel}
                            </span>
                            {file && (
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onChange(null);
                                    }}
                                    className="rounded-full border border-border/70 px-3 py-1 font-medium text-foreground transition hover:border-primary/40"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </label>

            {onRemoveCurrentChange && currentImageUrl && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={`${id}-remove-current`}
                        checked={removeCurrent}
                        onCheckedChange={(checked) =>
                            onRemoveCurrentChange(Boolean(checked))
                        }
                    />
                    <Label htmlFor={`${id}-remove-current`}>
                        Remove current image
                    </Label>
                </div>
            )}

            <InputError message={error} />
        </div>
    );
}
