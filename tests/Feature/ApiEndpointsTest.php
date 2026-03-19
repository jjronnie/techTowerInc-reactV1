<?php

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\ProjectType;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
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
    $projectType = ProjectType::factory()->create([
        'name' => 'Website Design',
        'slug' => 'website-design',
    ]);

    $matchingPortfolio = Portfolio::factory()->create([
        'title' => 'Acme Portal',
        'slug' => 'acme-portal',
        'client_id' => $client->id,
        'is_active' => true,
    ]);
    $matchingPortfolio->categories()->sync([$category->id]);
    $matchingPortfolio->projectTypes()->sync([$projectType->id]);
    $matchingPortfolio->technologies()->sync([$technology->id]);

    $otherPortfolio = Portfolio::factory()->create([
        'title' => 'Northwind App',
        'slug' => 'northwind-app',
        'client_id' => $otherClient->id,
        'is_active' => true,
    ]);
    $otherPortfolio->categories()->sync([$category->id]);
    $otherPortfolio->technologies()->sync([$technology->id]);

    $response = $this->getJson('/api/portfolio?client=acme-labs&category=web-platforms');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', $matchingPortfolio->slug)
        ->assertJsonPath('data.0.primary_type.slug', 'website-design')
        ->assertJsonPath('data.0.client.slug', $client->slug)
        ->assertJsonPath('data.0.categories.0.slug', $category->slug)
        ->assertJsonPath('data.0.technologies.0.icon_name', 'react');

    expect($response->json('data'))
        ->toHaveCount(1);
});

test('portfolio endpoint can return featured projects ordered by latest first', function () {
    $projectType = ProjectType::factory()->create([
        'name' => 'Website Design',
        'slug' => 'website-design',
    ]);

    $olderFeaturedPortfolio = Portfolio::factory()->create([
        'title' => 'Legacy Website',
        'slug' => 'legacy-website',
        'is_active' => true,
        'is_featured' => true,
        'completed_at' => now()->subMonths(5),
    ]);
    $olderFeaturedPortfolio->projectTypes()->sync([$projectType->id]);

    $newerFeaturedPortfolio = Portfolio::factory()->create([
        'title' => 'Modern Platform',
        'slug' => 'modern-platform',
        'is_active' => true,
        'is_featured' => true,
        'completed_at' => now()->subMonth(),
    ]);
    $newerFeaturedPortfolio->projectTypes()->sync([$projectType->id]);

    Portfolio::factory()->create([
        'title' => 'Internal Tool',
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

test('portfolio endpoint can return home showcase projects with home featured images only', function () {
    $projectType = ProjectType::factory()->create([
        'name' => 'Website Design',
        'slug' => 'website-design',
    ]);

    $firstShowcaseProject = Portfolio::factory()->create([
        'title' => 'Showcase Project First',
        'slug' => 'showcase-project-first',
        'is_active' => true,
        'is_featured' => true,
        'home_featured_image_path' => 'portfolios/home-featured/showcase.jpg',
        'sort_order' => 1,
        'completed_at' => now()->subWeeks(2),
    ]);
    $firstShowcaseProject->projectTypes()->sync([$projectType->id]);

    $secondShowcaseProject = Portfolio::factory()->create([
        'title' => 'Showcase Project Second',
        'slug' => 'showcase-project-second',
        'is_active' => true,
        'is_featured' => true,
        'home_featured_image_path' => 'portfolios/home-featured/showcase-second.jpg',
        'sort_order' => 2,
        'completed_at' => now(),
    ]);
    $secondShowcaseProject->projectTypes()->sync([$projectType->id]);

    $missingHomeImageProject = Portfolio::factory()->create([
        'title' => 'Missing Home Image',
        'slug' => 'missing-home-image',
        'is_active' => true,
        'is_featured' => true,
        'home_featured_image_path' => null,
        'completed_at' => now(),
    ]);
    $missingHomeImageProject->projectTypes()->sync([$projectType->id]);

    $response = $this->getJson('/api/portfolio?featured=1&home_showcase=1');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', $firstShowcaseProject->slug)
        ->assertJsonPath('data.1.slug', $secondShowcaseProject->slug)
        ->assertJsonPath(
            'data.0.home_featured_image_url',
            Storage::url('portfolios/home-featured/showcase.jpg'),
        );

    expect($response->json('data'))
        ->toHaveCount(2)
        ->and(collect($response->json('data'))->pluck('slug')->all())
        ->not->toContain($missingHomeImageProject->slug);
});

test('portfolio show endpoint returns gallery image urls', function () {
    $portfolio = Portfolio::factory()->create([
        'title' => 'Gallery Project',
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
    $projectType = ProjectType::factory()->create();
    $technology = Technology::factory()->create();

    $activePortfolio = Portfolio::factory()->create([
        'title' => 'Orbit Dashboard',
        'slug' => 'orbit-dashboard',
        'client_id' => $client->id,
        'is_active' => true,
    ]);
    $activePortfolio->categories()->sync([$category->id]);
    $activePortfolio->projectTypes()->sync([$projectType->id]);
    $activePortfolio->technologies()->sync([$technology->id]);

    $inactivePortfolio = Portfolio::factory()->create([
        'title' => 'Orbit Archive',
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

test('portfolio endpoint can filter by project type', function () {
    $websiteType = ProjectType::factory()->create([
        'name' => 'Website Design',
        'slug' => 'website-design',
    ]);
    $seoType = ProjectType::factory()->create([
        'name' => 'SEO',
        'slug' => 'seo',
    ]);

    $websiteProject = Portfolio::factory()->create([
        'title' => 'Website Project',
        'slug' => 'website-project',
        'is_active' => true,
    ]);
    $websiteProject->projectTypes()->sync([$websiteType->id]);

    $seoProject = Portfolio::factory()->create([
        'title' => 'SEO Project',
        'slug' => 'seo-project',
        'is_active' => true,
    ]);
    $seoProject->projectTypes()->sync([$seoType->id]);

    $response = $this->getJson('/api/portfolio?type=website-design');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.slug', 'website-project')
        ->assertJsonPath('data.0.types.0.slug', 'website-design');

    expect($response->json('data'))->toHaveCount(1);
});

test('team members endpoint returns only published team members', function () {
    TeamMember::factory()->create([
        'name' => 'Published Member',
        'is_published' => true,
        'sort_order' => 1,
    ]);
    TeamMember::factory()->create([
        'name' => 'Hidden Member',
        'is_published' => false,
        'sort_order' => 2,
    ]);

    $response = $this->getJson('/api/team-members');

    $response->assertSuccessful()
        ->assertJsonPath('data.0.name', 'Published Member');

    expect(collect($response->json('data'))->pluck('name')->all())
        ->toContain('Published Member')
        ->not->toContain('Hidden Member');
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
