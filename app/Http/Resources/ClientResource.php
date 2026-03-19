<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ClientResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'website_url' => $this->website_url,
            'description' => $this->description,
            'logo_url' => $this->logo_path ? Storage::url($this->logo_path) : null,
            'projects_count' => $this->whenCounted('portfolios'),
            'projects' => $this->whenLoaded(
                'portfolios',
                fn (): array => PortfolioResource::collection($this->portfolios)->resolve(),
            ),
        ];
    }
}
