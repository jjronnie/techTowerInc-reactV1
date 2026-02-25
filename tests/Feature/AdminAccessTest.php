<?php

use App\Models\User;

test('non-admin users cannot access admin routes', function () {
    $user = User::factory()->create([
        'is_admin' => false,
    ]);

    $this->actingAs($user)
        ->get('/admin/services')
        ->assertForbidden();
});

test('admins can access admin routes', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->get('/admin/services')
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
