<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Database\Factories\ProjectTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProjectType extends Model
{
    /** @use HasFactory<ProjectTypeFactory> */
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

    protected function getSlugSourceColumn(): string
    {
        return 'name';
    }
}
