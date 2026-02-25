<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SiteSetting>
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
