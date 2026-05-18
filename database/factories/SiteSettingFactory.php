<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteSetting>
 */
class SiteSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'site_name' => 'TechTower Inc',
            'tagline' => 'Product studio for ambitious teams',
            'company_email' => 'info@techtowerinc.com',
            'company_phone' => '+256 703 283 529',
            'company_address' => 'Innovation Hub, Kampala, Uganda',
        ];
    }
}
