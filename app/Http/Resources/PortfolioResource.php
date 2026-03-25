<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'project_url' => $this->project_url,
            'featured_image_url' => $this->fileUrl($this->featured_image_path),
            'featured_image_alt' => $this->featured_image_alt,
            'home_featured_image_url' => $this->fileUrl($this->home_featured_image_path),
            'gallery_images' => collect($this->gallery_images ?? [])
                ->map(fn (string $path) => Storage::url($path))
                ->all(),
            'types' => ProjectTypeResource::collection($this->whenLoaded('projectTypes')),
            'primary_type' => $this->whenLoaded(
                'projectTypes',
                fn () => ProjectTypeResource::make($this->projectTypes->first())->resolve(),
            ),
            'client' => ClientResource::make($this->whenLoaded('client')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'technologies' => TechnologyResource::collection($this->whenLoaded('technologies')),
            'started_at' => optional($this->started_at)->toDateString(),
            'completed_at' => optional($this->completed_at)->toDateString(),
            'is_featured' => $this->is_featured,
            'seo' => [
                'title' => $this->seo_title,
                'description' => $this->seo_description,
                'keywords' => $this->seo_keywords,
                'og_image_path' => $this->og_image_path,
                'og_image_url' => $this->fileUrl($this->og_image_path),
            ],
        ];
    }

    private function fileUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return Storage::url($path);
    }
}
