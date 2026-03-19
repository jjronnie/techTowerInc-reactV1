<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $technologies = [
            ['name' => 'Laravel', 'icon_name' => 'laravel'],
            ['name' => 'React', 'icon_name' => 'react'],
            ['name' => 'TypeScript', 'icon_name' => 'typescript'],
            ['name' => 'PostgreSQL', 'icon_name' => 'postgresql'],
            ['name' => 'Docker', 'icon_name' => 'docker'],
            ['name' => 'Hostinger', 'icon_name' => 'hostinger'],
            ['name' => 'Vue', 'icon_name' => 'vue'],
            ['name' => 'Node.js', 'icon_name' => 'nodedotjs'],
            ['name' => 'MySQL', 'icon_name' => 'mysql'],
            ['name' => 'Flutter', 'icon_name' => 'flutter'],
        ];

        foreach ($technologies as $technology) {
            Technology::query()->updateOrCreate(
                ['slug' => Str::slug($technology['name'])],
                [
                    ...$technology,
                    'slug' => Str::slug($technology['name']),
                ],
            );
        }
    }
}
