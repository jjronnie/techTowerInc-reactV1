<?php

use App\Models\User;

test('non-admin users cannot access filament', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $this->actingAs($user)
        ->get('/admin')
        ->assertForbidden();
});

test('admins can access filament', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertSuccessful();
});

test('users with forced password change are redirected to update their password', function () {
    $user = User::factory()->create([
        'force_password_change' => true,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('user-password.edit'));
});
