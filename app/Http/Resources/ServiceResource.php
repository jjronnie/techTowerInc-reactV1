<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $highlights = collect($this->highlights ?? [])
            ->map(fn ($item) => is_array($item) ? ($item['value'] ?? null) : $item)
            ->filter()
            ->values()
            ->all();

        $deliverables = collect($this->deliverables ?? [])
            ->map(fn ($item) => is_array($item) ? ($item['value'] ?? null) : $item)
            ->filter()
            ->values()
            ->all();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'icon' => $this->icon,
            'highlights' => $highlights,
            'timeline' => $this->timeline,
            'deliverables' => $deliverables,
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
