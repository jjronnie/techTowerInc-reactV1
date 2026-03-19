<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            SiteSettingSeeder::class,
            ServiceSeeder::class,
            CategorySeeder::class,
            ClientSeeder::class,
            TechnologySeeder::class,
            PortfolioSeeder::class,
            ProductSeeder::class,
            PostSeeder::class,
        ]);
    }
}
