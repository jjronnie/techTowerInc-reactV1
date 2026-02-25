<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $categories = $this->categories ?? [];

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->when($request->routeIs('api.posts.show'), $this->content),
            'featured_image_url' => $this->featured_image_path ? Storage::url($this->featured_image_path) : null,
            'image_alt' => $this->image_alt,
            'author_name' => $this->author?->name,
            'published_at' => optional($this->published_at)->toIso8601String(),
            'reading_time' => $this->reading_time,
            'category' => $categories[0] ?? null,
            'categories' => $categories,
            'tags' => $this->tags ?? [],
            'seo' => [
                'title' => $this->seo_title,
                'description' => $this->seo_description,
                'keywords' => $this->seo_keywords,
                'og_image_path' => $this->og_image_path,
                'og_image_url' => $this->og_image_path ? Storage::url($this->og_image_path) : null,
                'canonical_url' => $this->canonical_url,
                'robots' => $this->robots,
            ],
        ];
    }
}
