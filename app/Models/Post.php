<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use App\Support\HtmlSanitizer;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image_path',
        'image_alt',
        'author_id',
        'published_at',
        'status',
        'reading_time',
        'tags',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'og_image_path',
        'canonical_url',
        'robots',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'tags' => 'array',
        ];
    }

    protected function content(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value) => HtmlSanitizer::clean($value),
        );
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->orderBy('name');
    }
}
