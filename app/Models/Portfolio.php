<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortfolioFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'label',
        'summary',
        'result_label',
        'result_value',
        'category',
        'badge_text',
        'badge_color',
        'excerpt',
        'description',
        'client_name',
        'project_url',
        'featured_image_path',
        'gallery_images',
        'technologies',
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
            'technologies' => 'array',
            'started_at' => 'date',
            'completed_at' => 'date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
