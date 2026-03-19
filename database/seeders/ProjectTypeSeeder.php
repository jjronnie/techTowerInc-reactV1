<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Seeder;

class ProjectTypeSeeder extends Seeder
{
    public function run(): void
    {
        $projectTypes = [
            'Website Design',
            'Website Revamp',
            'SEO',
            'Web Application',
            'E-commerce',
            'SaaS Platform',
        ];

        foreach ($projectTypes as $projectType) {
            ProjectType::query()->updateOrCreate(
                ['slug' => str($projectType)->slug()->toString()],
                ['name' => $projectType],
            );
        }
    }
}
