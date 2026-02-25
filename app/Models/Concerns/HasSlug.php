<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasSlug
{
    protected static function bootHasSlug(): void
    {
        static::creating(function (Model $model): void {
            if (filled($model->slug)) {
                return;
            }

            $source = $model->getSlugSourceColumn();
            $baseSlug = Str::slug((string) $model->{$source});
            $model->slug = $model->generateUniqueSlug($baseSlug);
        });
    }

    protected function getSlugSourceColumn(): string
    {
        return 'title';
    }

    protected function generateUniqueSlug(string $baseSlug): string
    {
        $slug = $baseSlug;
        $counter = 2;

        while (static::query()->where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
