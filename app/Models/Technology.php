<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Database\Factories\TechnologyFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Technology extends Model
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'icon_name',
    ];

    /**
     * @var array<string, string>
     */
    private const ICON_NAME_ALIASES = [
        'aws' => 'amazonwebservices',
        'next' => 'nextdotjs',
        'node' => 'nodedotjs',
        'nodejs' => 'nodedotjs',
        'nuxt' => 'nuxtdotjs',
        'postgres' => 'postgresql',
        'postgre' => 'postgresql',
        'tailwind' => 'tailwindcss',
        'vue' => 'vuedotjs',
    ];

    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class)->orderBy('title');
    }

    protected function getSlugSourceColumn(): string
    {
        return 'name';
    }

    protected function iconName(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value): ?string => self::normalizeIconName($value),
        );
    }

    public static function normalizeIconName(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = Str::of($value)
            ->trim()
            ->lower()
            ->replaceMatches('/[^a-z0-9]/', '')
            ->toString();

        if ($normalized === '') {
            return null;
        }

        return self::ICON_NAME_ALIASES[$normalized] ?? $normalized;
    }
}
