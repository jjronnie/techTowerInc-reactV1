<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use App\Support\HtmlSanitizer;
use Database\Factories\ClientFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    /** @use HasFactory<ClientFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'logo_path',
        'description',
        'website_url',
    ];

    protected function description(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value) => HtmlSanitizer::clean($value),
        );
    }

    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('title');
    }

    protected function getSlugSourceColumn(): string
    {
        return 'name';
    }
}
