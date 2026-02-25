<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'label' => $this->label,
            'summary' => $this->summary,
            'result_label' => $this->result_label,
            'result_value' => $this->result_value,
            'category' => $this->category,
            'badge_text' => $this->badge_text,
            'badge_color' => $this->badge_color,
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'client_name' => $this->client_name,
            'project_url' => $this->project_url,
            'featured_image_url' => $this->featured_image_path ? Storage::url($this->featured_image_path) : null,
            'gallery_images' => collect($this->gallery_images ?? [])
                ->map(fn (string $path) => Storage::url($path))
                ->all(),
            'technologies' => $this->technologies ?? [],
            'started_at' => optional($this->started_at)->toDateString(),
            'completed_at' => optional($this->completed_at)->toDateString(),
            'is_featured' => $this->is_featured,
            'seo' => [
                'title' => $this->seo_title,
                'description' => $this->seo_description,
                'keywords' => $this->seo_keywords,
                'og_image_path' => $this->og_image_path,
                'og_image_url' => $this->og_image_path ? Storage::url($this->og_image_path) : null,
            ],
        ];
    }
}
