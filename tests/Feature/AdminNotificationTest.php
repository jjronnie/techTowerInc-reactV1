<?php

use App\Models\Post;
use App\Models\SiteSetting;
use App\Models\User;

it('flashes a notification when creating a post', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $payload = [
        'title' => 'Test Post',
        'slug' => 'test-post',
        'excerpt' => 'Short excerpt',
        'content' => 'Post body',
        'status' => 'draft',
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.posts.store'), $payload);

    $response->assertRedirect();
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Post created',
        'message' => '"Test Post" is ready to edit.',
    ]);
});

it('flashes a notification when updating a post', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $post = Post::factory()->create([
        'title' => 'Original Post',
        'status' => 'draft',
    ]);

    $payload = [
        'title' => 'Updated Post',
        'slug' => $post->slug,
        'excerpt' => $post->excerpt,
        'content' => $post->content ?? 'Updated body',
        'status' => 'draft',
    ];

    $response = $this->actingAs($admin)
        ->put(route('admin.posts.update', $post), $payload);

    $response->assertRedirect();
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Post updated',
        'message' => 'Changes to "Updated Post" have been saved.',
    ]);
});

it('flashes a notification when deleting a post', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $post = Post::factory()->create([
        'title' => 'Delete Me',
    ]);

    $response = $this->actingAs($admin)
        ->delete(route('admin.posts.destroy', $post));

    $response->assertRedirect(route('admin.posts.index'));
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Post deleted',
        'message' => 'The post has been removed.',
    ]);
});

it('flashes a notification when creating a portfolio entry', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $payload = [
        'title' => 'Portfolio Entry',
        'slug' => 'portfolio-entry',
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.portfolios.store'), $payload);

    $response->assertRedirect();
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Portfolio created',
        'message' => '"Portfolio Entry" is ready to edit.',
    ]);
});

it('flashes a notification when saving site settings', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    SiteSetting::factory()->create([
        'site_name' => 'Old Name',
    ]);

    $response = $this->actingAs($admin)
        ->put(route('admin.site-settings.update'), [
            'site_name' => 'New Name',
        ]);

    $response->assertRedirect(route('admin.site-settings.edit'));
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Settings saved',
        'message' => 'Your site settings have been updated.',
    ]);
});
