import { ChangeEvent, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type GalleryImage = {
    path: string;
    url: string;
};

type PreviewImage = {
    name: string;
    url: string;
};

type ImageGalleryUploadFieldProps = {
    id: string;
    label: string;
    description?: string;
    error?: string;
    files: File[] | null;
    onChange: (files: File[] | null) => void;
    existingImages?: GalleryImage[];
    selectedExistingImages?: string[];
    onToggleExistingImage?: (path: string, checked: boolean) => void;
    clearExistingImages?: boolean;
    onClearExistingImagesChange?: (value: boolean) => void;
};

export function ImageGalleryUploadField({
    id,
    label,
    description,
    error,
    files,
    onChange,
    existingImages = [],
    selectedExistingImages = [],
    onToggleExistingImage,
    clearExistingImages = false,
    onClearExistingImagesChange,
}: ImageGalleryUploadFieldProps) {
    const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

    useEffect(() => {
        if (!files?.length) {
            setPreviewImages([]);

            return;
        }

        const nextPreviews = files.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setPreviewImages(nextPreviews);

        return () => {
            nextPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [files]);

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
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange(
                            event.target.files
                                ? Array.from(event.target.files)
                                : null,
                        )
                    }
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            Add gallery images
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Select one or more images to append to the gallery.
                        </p>
                    </div>
                    <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground transition group-hover:border-primary/40 group-hover:text-foreground">
                        Browse
                    </span>
                </div>

                {previewImages.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {previewImages.map((preview) => (
                            <div
                                key={preview.url}
                                className="overflow-hidden rounded-xl border border-border/70 bg-background"
                            >
                                <img
                                    src={preview.url}
                                    alt={preview.name}
                                    className="h-36 w-full object-cover"
                                />
                                <div className="truncate border-t border-border/70 px-3 py-2 text-xs text-muted-foreground">
                                    {preview.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </label>

            {existingImages.length > 0 && onToggleExistingImage && (
                <div className="grid gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <Label>Existing gallery images</Label>
                        {onClearExistingImagesChange && (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`${id}-clear-current`}
                                    checked={clearExistingImages}
                                    onCheckedChange={(checked) =>
                                        onClearExistingImagesChange(
                                            Boolean(checked),
                                        )
                                    }
                                />
                                <Label htmlFor={`${id}-clear-current`}>
                                    Clear current gallery
                                </Label>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {existingImages.map((image) => (
                            <div
                                key={image.path}
                                className="overflow-hidden rounded-xl border border-border/70 bg-background"
                            >
                                <img
                                    src={image.url}
                                    alt={image.path}
                                    className="h-36 w-full object-cover"
                                />
                                <div className="flex items-center gap-2 border-t border-border/70 px-3 py-3">
                                    <Checkbox
                                        id={`${id}-${image.path}`}
                                        checked={selectedExistingImages.includes(
                                            image.path,
                                        )}
                                        onCheckedChange={(checked) =>
                                            onToggleExistingImage(
                                                image.path,
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`${id}-${image.path}`}
                                        className="text-xs text-muted-foreground"
                                    >
                                        Keep this image
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <InputError message={error} />
        </div>
    );
}
