<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Property Technology',
            'Health Technology',
            'Web Development',
            'Mobile Development',
            'Digital Transformation',
        ];

        foreach ($categories as $name) {
            Category::query()->updateOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'slug' => Str::slug($name)],
            );
        }
    }
}
