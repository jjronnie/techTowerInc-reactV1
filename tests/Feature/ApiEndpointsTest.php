<?php

use App\Models\Post;
use App\Models\Service;
use App\Models\SiteSetting;

test('posts endpoint returns only published posts', function () {
    $published = Post::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    Post::factory()->create([
        'status' => 'draft',
        'published_at' => null,
    ]);

    $response = $this->getJson('/api/posts');

    $response->assertSuccessful();

    expect($response->json('data'))
        ->toHaveCount(1)
        ->and($response->json('data.0.slug'))
        ->toBe($published->slug);
});

test('services endpoint returns active services', function () {
    $active = Service::factory()->create(['is_active' => true]);
    Service::factory()->create(['is_active' => false]);

    $response = $this->getJson('/api/services');

    $response->assertSuccessful();

    expect($response->json('data'))
        ->toHaveCount(1)
        ->and($response->json('data.0.slug'))
        ->toBe($active->slug);
});

test('site settings endpoint returns configuration data', function () {
    SiteSetting::factory()->create([
        'site_name' => 'TechTower Inc',
    ]);

    $response = $this->getJson('/api/site-settings');

    $response->assertSuccessful()
        ->assertJsonPath('data.site_name', 'TechTower Inc');
});
