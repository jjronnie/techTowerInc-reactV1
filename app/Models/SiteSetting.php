<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'site_name',
        'tagline',
        'logo_path',
        'favicon_path',
        'company_email',
        'company_phone',
        'company_address',
        'social_links',
        'footer_text',
        'default_seo_title',
        'default_seo_description',
        'default_og_image_path',
        'verification_meta',
        'home_hero',
        'home_stats',
        'home_portfolio_intro',
        'home_services_intro',
        'home_features',
        'home_testimonials',
        'home_faqs',
        'home_cta',
        'about_header',
        'about_story',
        'about_principles',
        'about_cards',
        'about_team',
        'about_cta',
        'services_page',
        'portfolio_page',
        'products_page',
        'blog_page',
        'contact_header',
        'contact_details',
        'contact_social',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'social_links' => 'array',
            'verification_meta' => 'array',
            'home_hero' => 'array',
            'home_stats' => 'array',
            'home_portfolio_intro' => 'array',
            'home_services_intro' => 'array',
            'home_features' => 'array',
            'home_testimonials' => 'array',
            'home_faqs' => 'array',
            'home_cta' => 'array',
            'about_header' => 'array',
            'about_story' => 'array',
            'about_principles' => 'array',
            'about_cards' => 'array',
            'about_team' => 'array',
            'about_cta' => 'array',
            'services_page' => 'array',
            'portfolio_page' => 'array',
            'products_page' => 'array',
            'blog_page' => 'array',
            'contact_header' => 'array',
            'contact_details' => 'array',
            'contact_social' => 'array',
        ];
    }
}
