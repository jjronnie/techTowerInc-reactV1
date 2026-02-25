<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = config('app.admin_seed_password');

        if (! is_string($password) || $password === '') {
            throw new RuntimeException('ADMIN_SEED_PASSWORD must be set in the environment.');
        }

        User::query()->updateOrCreate(
            ['email' => 'ronaldjjuuko7@gmail.com'],
            [
                'name' => 'TechTower Admin',
                'password' => Hash::make($password),
                'email_verified_at' => now(),
                'is_admin' => true,
                'force_password_change' => false,
            ],
        );
    }
}
