<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AdminUserSeeder::class);
        $this->call(SiteSettingSeeder::class);
        $this->call(ServiceSeeder::class);
        $this->call(PortfolioSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(PostSeeder::class);
    }
}
