<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'icon',
        'highlights',
        'timeline',
        'deliverables',
        'sort_order',
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
            'highlights' => 'array',
            'deliverables' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
