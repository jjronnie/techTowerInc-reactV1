<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::query()->where('email', 'admin@techtower.ug')->first();

        if (! $admin) {
            $admin = User::factory()->create([
                'name' => 'TechTower Admin',
                'email' => 'admin@techtower.ug',
                'is_admin' => true,
                'force_password_change' => false,
            ]);
        }

        Service::factory()->count(3)->create();

        Portfolio::factory()->count(3)->create();

        Product::factory()->count(2)->create();

        Post::factory()->count(3)->create([
            'author_id' => $admin->id,
            'status' => 'published',
            'published_at' => now()->subDays(2),
        ]);
    }
}
