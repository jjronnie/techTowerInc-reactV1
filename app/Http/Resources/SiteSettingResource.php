<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SiteSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'site_name' => $this->site_name,
            'tagline' => $this->tagline,
            'logo_url' => $this->logo_path ? Storage::url($this->logo_path) : null,
            'favicon_url' => $this->favicon_path ? Storage::url($this->favicon_path) : null,
            'company_email' => $this->company_email,
            'company_phone' => $this->company_phone,
            'company_address' => $this->company_address,
            'social_links' => $this->social_links ?? [],
            'footer_text' => $this->footer_text,
            'default_seo_title' => $this->default_seo_title,
            'default_seo_description' => $this->default_seo_description,
            'default_og_image_url' => $this->default_og_image_path ? Storage::url($this->default_og_image_path) : null,
            'verification_meta' => $this->verification_meta ?? [],
            'home_hero' => $this->home_hero ?? [],
            'home_stats' => $this->home_stats ?? [],
            'home_portfolio_intro' => $this->home_portfolio_intro ?? [],
            'home_services_intro' => $this->home_services_intro ?? [],
            'home_features' => $this->home_features ?? [],
            'home_testimonials' => $this->home_testimonials ?? [],
            'home_faqs' => $this->home_faqs ?? [],
            'home_cta' => $this->home_cta ?? [],
            'about_header' => $this->about_header ?? [],
            'about_story' => $this->about_story ?? [],
            'about_principles' => $this->about_principles ?? [],
            'about_cards' => $this->about_cards ?? [],
            'about_why_choose_us' => $this->about_why_choose_us ?? [],
            'about_team' => $this->about_team ?? [],
            'about_cta' => $this->about_cta ?? [],
            'services_page' => $this->services_page ?? [],
            'portfolio_page' => $this->portfolio_page ?? [],
            'products_page' => $this->products_page ?? [],
            'blog_page' => $this->blog_page ?? [],
            'contact_header' => $this->contact_header ?? [],
            'contact_details' => $this->contact_details ?? [],
            'contact_social' => $this->contact_social ?? [],
        ];
    }
}
