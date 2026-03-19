<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use HasFactory;

    use HasSlug;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
    ];

    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class)->orderBy('title');
    }

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class)->orderByDesc('published_at');
    }

    protected function getSlugSourceColumn(): string
    {
        return 'name';
    }
}
