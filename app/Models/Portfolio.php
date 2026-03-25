<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Database\Factories\PortfolioFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Portfolio extends Model
{
    /** @use HasFactory<PortfolioFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'excerpt',
        'description',
        'client_id',
        'project_url',
        'featured_image_path',
        'featured_image_alt',
        'home_featured_image_path',
        'gallery_images',
        'started_at',
        'completed_at',
        'sort_order',
        'is_featured',
        'is_active',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'og_image_path',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gallery_images' => 'array',
            'started_at' => 'date',
            'completed_at' => 'date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->orderBy('name');
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class)->orderBy('name');
    }

    public function projectTypes(): BelongsToMany
    {
        return $this->belongsToMany(ProjectType::class)->orderBy('name');
    }
}
