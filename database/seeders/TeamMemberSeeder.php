<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Jjuuko Ronald',
                'title' => 'Founder & Lead Engineer',
                'bio' => 'Leads product strategy, systems architecture, and delivery across TechTower projects.',
                'sort_order' => 1,
                'is_published' => true,
            ],
            [
                'name' => 'Growth Strategy Team',
                'title' => 'Digital Growth & SEO',
                'bio' => 'Shapes search visibility, conversion journeys, and content systems that help client brands grow online.',
                'sort_order' => 2,
                'is_published' => true,
            ],
            [
                'name' => 'Product Delivery Team',
                'title' => 'Design & Engineering',
                'bio' => 'Turns requirements into polished, production-ready websites and platforms with strong attention to quality.',
                'sort_order' => 3,
                'is_published' => true,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::query()->updateOrCreate(
                ['name' => $member['name']],
                $member,
            );
        }
    }
}
