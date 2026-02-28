<?php

use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;

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

test('products endpoints return active products and details', function () {
    $product = Product::factory()->create([
        'is_active' => true,
        'slug' => 'signal-labs',
        'purchase_url' => 'https://example.com/signal-labs',
        'description' => 'Full product details.',
        'short_description' => 'Short summary.',
        'image_path' => 'products/signal-labs.jpg',
    ]);
    Product::factory()->create(['is_active' => false]);

    $indexResponse = $this->getJson('/api/products');

    $indexResponse->assertSuccessful();

    expect($indexResponse->json('data'))
        ->toHaveCount(1)
        ->and($indexResponse->json('data.0.slug'))
        ->toBe($product->slug);

    $showResponse = $this->getJson("/api/products/{$product->slug}");

    $showResponse->assertSuccessful()
        ->assertJsonPath('data.slug', $product->slug)
        ->assertJsonPath('data.purchase_url', $product->purchase_url)
        ->assertJsonPath('data.description', $product->description)
        ->assertJsonPath('data.image_url', Storage::url($product->image_path));
});

test('site settings endpoint returns configuration data', function () {
    SiteSetting::factory()->create([
        'site_name' => 'TechTower Inc',
    ]);

    $response = $this->getJson('/api/site-settings');

    $response->assertSuccessful()
        ->assertJsonPath('data.site_name', 'TechTower Inc');
});
