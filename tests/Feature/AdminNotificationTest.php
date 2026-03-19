<?php

use App\Models\Category;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\ProjectType;
use App\Models\SiteSetting;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

it('flashes a notification when creating a post', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $category = Category::factory()->create();

    $payload = [
        'title' => 'Test Post',
        'slug' => 'test-post',
        'excerpt' => 'Short excerpt',
        'content' => 'Post body',
        'status' => 'draft',
        'category_ids' => [$category->id],
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
    $category = Category::factory()->create();

    $post = Post::factory()->create([
        'title' => 'Original Post',
        'status' => 'draft',
    ]);
    $post->categories()->sync([$category->id]);

    $payload = [
        'title' => 'Updated Post',
        'slug' => $post->slug,
        'excerpt' => $post->excerpt,
        'content' => $post->content ?? 'Updated body',
        'status' => 'draft',
        'category_ids' => [$category->id],
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
    $category = Category::factory()->create();
    $projectType = ProjectType::factory()->create();
    $technology = Technology::factory()->create();

    $payload = [
        'title' => 'Portfolio Entry',
        'slug' => 'portfolio-entry',
        'type_ids' => [$projectType->id],
        'category_ids' => [$category->id],
        'technology_ids' => [$technology->id],
    ];

    $response = $this->actingAs($admin)
        ->post(route('admin.portfolios.store'), $payload);

    $response->assertRedirect();
    $response->assertSessionHas('notification', [
        'type' => 'success',
        'title' => 'Portfolio created',
        'message' => '"Portfolio Entry" has been added to your portfolio list.',
    ]);
});

it('requires a home featured image when creating a featured portfolio entry', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $category = Category::factory()->create();
    $projectType = ProjectType::factory()->create();
    $technology = Technology::factory()->create();

    $response = $this->actingAs($admin)
        ->from(route('admin.portfolios.create'))
        ->post(route('admin.portfolios.store'), [
            'title' => 'Featured Portfolio Entry',
            'slug' => 'featured-portfolio-entry',
            'type_ids' => [$projectType->id],
            'category_ids' => [$category->id],
            'technology_ids' => [$technology->id],
            'is_featured' => true,
        ]);

    $response->assertRedirect(route('admin.portfolios.create'));
    $response->assertSessionHasErrors([
        'home_featured_image' => 'Featured projects need a home featured image for the homepage showcase.',
    ]);
});

it('stores gallery images when creating a portfolio entry', function () {
    Storage::fake('public');

    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $category = Category::factory()->create();
    $projectType = ProjectType::factory()->create();
    $technology = Technology::factory()->create();

    $response = $this->actingAs($admin)
        ->post(route('admin.portfolios.store'), [
            'title' => 'Portfolio With Gallery',
            'slug' => 'portfolio-with-gallery',
            'type_ids' => [$projectType->id],
            'category_ids' => [$category->id],
            'technology_ids' => [$technology->id],
            'gallery_images' => [
                UploadedFile::fake()->image('gallery-one.jpg'),
                UploadedFile::fake()->image('gallery-two.jpg'),
            ],
        ]);

    $response->assertRedirect();

    $portfolio = Portfolio::query()->where('slug', 'portfolio-with-gallery')->firstOrFail();

    expect($portfolio->gallery_images)
        ->toBeArray()
        ->toHaveCount(2);

    collect($portfolio->gallery_images)->each(
        fn (string $path) => Storage::disk('public')->assertExists($path),
    );
});

it('normalizes common technology icon aliases when saving', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $this->actingAs($admin)
        ->post(route('admin.technologies.store'), [
            'name' => 'Tailwind CSS',
            'slug' => 'tailwind-css',
            'icon_name' => 'tailwind',
        ])
        ->assertRedirect();

    $technology = Technology::query()->where('slug', 'tailwind-css')->firstOrFail();

    expect($technology->icon_name)->toBe('tailwindcss');
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

it('shows saved site settings values in the admin edit page and public api', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    SiteSetting::factory()->create([
        'site_name' => 'Initial Name',
        'tagline' => 'Initial tagline',
    ]);

    $this->actingAs($admin)
        ->put(route('admin.site-settings.update'), [
            'site_name' => 'Updated Name',
            'tagline' => 'Updated tagline',
            'footer_text' => 'Fresh footer copy',
            'verification_meta' => [
                [
                    'name' => 'google-site-verification',
                    'content' => 'updated-token',
                ],
            ],
        ])
        ->assertRedirect(route('admin.site-settings.edit'));

    $this->actingAs($admin)
        ->get(route('admin.site-settings.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/site-settings/edit')
            ->where('settings.site_name', 'Updated Name')
            ->where('settings.tagline', 'Updated tagline')
            ->where('settings.footer_text', 'Fresh footer copy')
            ->where('settings.verification_meta.0.name', 'google-site-verification')
            ->where('settings.verification_meta.0.content', 'updated-token'));

    $this->getJson('/api/site-settings')
        ->assertSuccessful()
        ->assertJsonPath('data.site_name', 'Updated Name')
        ->assertJsonPath('data.tagline', 'Updated tagline')
        ->assertJsonPath('data.footer_text', 'Fresh footer copy')
        ->assertJsonPath('data.verification_meta.0.name', 'google-site-verification')
        ->assertJsonPath('data.verification_meta.0.content', 'updated-token');
});
