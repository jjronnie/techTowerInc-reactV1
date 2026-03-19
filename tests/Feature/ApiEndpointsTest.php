<?php

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\Technology;
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

test('posts endpoint can filter by category and returns category resources', function () {
    $laravelCategory = Category::factory()->create([
        'name' => 'Laravel',
        'slug' => 'laravel',
    ]);
    $cloudCategory = Category::factory()->create([
        'name' => 'Cloud',
        'slug' => 'cloud',
    ]);

    $matchingPost = Post::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);
    $matchingPost->categories()->sync([$laravelCategory->id, $cloudCategory->id]);

    $otherPost = Post::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDays(2),
    ]);
    $otherPost->categories()->sync([$cloudCategory->id]);

    $response = $this->getJson('/api/posts?category=laravel');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', $matchingPost->slug);

    expect($response->json('data'))
        ->toHaveCount(1)
        ->and(collect($response->json('data.0.categories'))->pluck('slug')->all())
        ->toContain('laravel', 'cloud');
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

test('portfolio endpoint can filter by client and category and returns relationships', function () {
    $client = Client::factory()->create([
        'name' => 'Acme Labs',
        'slug' => 'acme-labs',
    ]);
    $otherClient = Client::factory()->create([
        'name' => 'Northwind',
        'slug' => 'northwind',
    ]);
    $category = Category::factory()->create([
        'name' => 'Web Platforms',
        'slug' => 'web-platforms',
    ]);
    $technology = Technology::factory()->create([
        'name' => 'React',
        'slug' => 'react',
        'icon_name' => 'react',
    ]);

    $matchingPortfolio = Portfolio::factory()->create([
        'title' => 'Acme Portal',
        'type' => 'Website',
        'slug' => 'acme-portal',
        'client_id' => $client->id,
        'is_active' => true,
    ]);
    $matchingPortfolio->categories()->sync([$category->id]);
    $matchingPortfolio->technologies()->sync([$technology->id]);

    $otherPortfolio = Portfolio::factory()->create([
        'title' => 'Northwind App',
        'type' => 'Dashboard',
        'slug' => 'northwind-app',
        'client_id' => $otherClient->id,
        'is_active' => true,
    ]);
    $otherPortfolio->categories()->sync([$category->id]);
    $otherPortfolio->technologies()->sync([$technology->id]);

    $response = $this->getJson('/api/portfolio?client=acme-labs&category=web-platforms');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', $matchingPortfolio->slug)
        ->assertJsonPath('data.0.type', 'Website')
        ->assertJsonPath('data.0.client.slug', $client->slug)
        ->assertJsonPath('data.0.categories.0.slug', $category->slug)
        ->assertJsonPath('data.0.technologies.0.icon_name', 'react');

    expect($response->json('data'))
        ->toHaveCount(1);
});

test('portfolio endpoint can return featured projects ordered by latest first', function () {
    $olderFeaturedPortfolio = Portfolio::factory()->create([
        'title' => 'Legacy Website',
        'type' => 'Website',
        'slug' => 'legacy-website',
        'is_active' => true,
        'is_featured' => true,
        'completed_at' => now()->subMonths(5),
    ]);

    $newerFeaturedPortfolio = Portfolio::factory()->create([
        'title' => 'Modern Platform',
        'type' => 'Platform',
        'slug' => 'modern-platform',
        'is_active' => true,
        'is_featured' => true,
        'completed_at' => now()->subMonth(),
    ]);

    Portfolio::factory()->create([
        'title' => 'Internal Tool',
        'type' => 'Dashboard',
        'slug' => 'internal-tool',
        'is_active' => true,
        'is_featured' => false,
        'completed_at' => now(),
    ]);

    $response = $this->getJson('/api/portfolio?featured=1&sort=latest');

    $response->assertSuccessful();

    expect($response->json('data'))
        ->toHaveCount(2)
        ->and($response->json('data.0.slug'))
        ->toBe($newerFeaturedPortfolio->slug)
        ->and($response->json('data.1.slug'))
        ->toBe($olderFeaturedPortfolio->slug);
});

test('portfolio show endpoint returns gallery image urls', function () {
    $portfolio = Portfolio::factory()->create([
        'title' => 'Gallery Project',
        'type' => 'Website',
        'slug' => 'gallery-project',
        'is_active' => true,
        'gallery_images' => [
            'portfolios/gallery/first.jpg',
            'portfolios/gallery/second.jpg',
        ],
    ]);

    $response = $this->getJson("/api/portfolio/{$portfolio->slug}");

    $response->assertSuccessful()
        ->assertJsonPath('data.slug', $portfolio->slug)
        ->assertJsonPath('data.gallery_images.0', Storage::url('portfolios/gallery/first.jpg'))
        ->assertJsonPath('data.gallery_images.1', Storage::url('portfolios/gallery/second.jpg'));
});

test('client endpoint returns only active related projects', function () {
    $client = Client::factory()->create([
        'name' => 'Orbit Health',
        'slug' => 'orbit-health',
    ]);
    $category = Category::factory()->create();
    $technology = Technology::factory()->create();

    $activePortfolio = Portfolio::factory()->create([
        'title' => 'Orbit Dashboard',
        'type' => 'Dashboard',
        'slug' => 'orbit-dashboard',
        'client_id' => $client->id,
        'is_active' => true,
    ]);
    $activePortfolio->categories()->sync([$category->id]);
    $activePortfolio->technologies()->sync([$technology->id]);

    $inactivePortfolio = Portfolio::factory()->create([
        'title' => 'Orbit Archive',
        'type' => 'Website',
        'slug' => 'orbit-archive',
        'client_id' => $client->id,
        'is_active' => false,
    ]);
    $inactivePortfolio->categories()->sync([$category->id]);
    $inactivePortfolio->technologies()->sync([$technology->id]);

    $response = $this->getJson("/api/clients/{$client->slug}");

    $response->assertSuccessful()
        ->assertJsonPath('data.slug', $client->slug)
        ->assertJsonPath('data.projects_count', 1)
        ->assertJsonPath('data.projects.0.slug', $activePortfolio->slug);

    expect(collect($response->json('data.projects'))->pluck('slug')->all())
        ->not->toContain($inactivePortfolio->slug);
});

test('technologies endpoint returns available technologies', function () {
    Technology::factory()->create([
        'name' => 'Docker',
        'slug' => 'docker',
        'icon_name' => 'docker',
    ]);
    Technology::factory()->create([
        'name' => 'Laravel',
        'slug' => 'laravel',
        'icon_name' => 'laravel',
    ]);

    $response = $this->getJson('/api/technologies');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', 'docker')
        ->assertJsonPath('data.1.slug', 'laravel');
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
        'footer_text' => 'Custom footer from the database.',
        'verification_meta' => [
            [
                'name' => 'google-site-verification',
                'content' => 'abc123',
            ],
        ],
    ]);

    $response = $this->getJson('/api/site-settings');

    $response->assertSuccessful()
        ->assertJsonPath('data.site_name', 'TechTower Inc')
        ->assertJsonPath('data.footer_text', 'Custom footer from the database.')
        ->assertJsonPath('data.verification_meta.0.name', 'google-site-verification')
        ->assertJsonPath('data.verification_meta.0.content', 'abc123');
});

test('sitemap uses news urls for posts', function () {
    Post::factory()->create([
        'title' => 'Launch Notes',
        'slug' => 'launch-notes',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $response = $this->get('/sitemap.xml');

    $response->assertSuccessful();

    expect($response->getContent())
        ->toContain(url('/news'))
        ->toContain(url('/news/launch-notes'))
        ->not->toContain(url('/blog'))
        ->not->toContain(url('/blog/launch-notes'));
});
