<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Novas POS & Inventory Suite',
                'summary' => 'A business management POS platform with HR, inventory tracking, and real-time sales analytics.',
                'result_label' => 'Results',
                'result_value' => '35% faster stock reconciliation',
                'category' => 'Retail Platform',
                'badge_text' => 'N',
                'badge_color' => '#facc15',
                'excerpt' => 'Modern POS and inventory tooling for multi-branch retail operations.',
                'description' => 'We built a robust POS and inventory platform that supports multi-branch reporting, staff roles, and real-time stock updates.',
                'client_name' => 'Novas Retail',
                'project_url' => 'https://example.com/novas',
                'technologies' => ['Laravel', 'React', 'PostgreSQL'],
                'started_at' => now()->subMonths(8),
                'completed_at' => now()->subMonths(5),
                'sort_order' => 1,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Novas POS Platform by TechTower',
                'seo_description' => 'Retail POS and inventory management suite built by TechTower Innovations.',
                'seo_keywords' => 'POS system Uganda, inventory management software, retail ERP',
            ],
            [
                'title' => 'Pamoja Chambers Property Hub',
                'summary' => 'A property listing platform with advanced search, agent dashboards, and automated lead routing.',
                'result_label' => 'Results',
                'result_value' => '2.7x lead response speed',
                'category' => 'PropTech',
                'badge_text' => 'P',
                'badge_color' => '#60a5fa',
                'excerpt' => 'A dynamic property listing experience built for a modern real estate firm.',
                'description' => 'We delivered a property listing website with curated property pages, lead tracking, and automated notifications.',
                'client_name' => 'Pamoja Chambers',
                'project_url' => 'https://example.com/pamoja',
                'technologies' => ['Laravel', 'Inertia', 'MySQL'],
                'started_at' => now()->subMonths(6),
                'completed_at' => now()->subMonths(3),
                'sort_order' => 2,
                'is_featured' => true,
                'is_active' => true,
                'seo_title' => 'Pamoja Chambers Property Platform',
                'seo_description' => 'Property listings and lead management platform built by TechTower.',
                'seo_keywords' => 'property listing website, real estate platform Uganda',
            ],
            [
                'title' => 'HealthConnect Telemedicine Portal',
                'summary' => 'A secure telemedicine portal for virtual consultations, prescriptions, and patient onboarding.',
                'result_label' => 'Results',
                'result_value' => '48% increase in appointment volume',
                'category' => 'HealthTech',
                'badge_text' => 'H',
                'badge_color' => '#34d399',
                'excerpt' => 'Telemedicine workflows built for growing health providers.',
                'description' => 'We built a secure patient portal with appointment scheduling, video consults, and digital prescriptions.',
                'client_name' => 'HealthConnect',
                'project_url' => 'https://example.com/healthconnect',
                'technologies' => ['React', 'Node.js', 'AWS'],
                'started_at' => now()->subMonths(10),
                'completed_at' => now()->subMonths(7),
                'sort_order' => 3,
                'is_featured' => false,
                'is_active' => true,
                'seo_title' => 'HealthConnect Telemedicine Portal',
                'seo_description' => 'Secure telemedicine and patient engagement platform by TechTower.',
                'seo_keywords' => 'telemedicine platform Uganda, healthtech software',
            ],
        ];

        foreach ($projects as $project) {
            $slug = Str::slug($project['title']);
            Portfolio::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    ...$project,
                    'slug' => $slug,
                    'label' => 'Project',
                ],
            );
        }
    }
}
