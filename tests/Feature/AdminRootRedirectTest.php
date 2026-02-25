<?php

use App\Models\User;

test('admin root redirects to the main dashboard', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->get('/admin')
        ->assertRedirect(route('dashboard'));
});
