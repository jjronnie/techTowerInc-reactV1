<?php

use App\Models\Post;
use App\Models\User;
use Database\Seeders\PostSeeder;

test('post seeder runs standalone and replaces existing posts with the strategic set', function () {
    Post::factory()->count(2)->create();

    $this->seed(PostSeeder::class);

    $slugs = Post::query()->pluck('slug')->all();

    expect($slugs)->toHaveCount(6)
        ->toEqualCanonicalizing([
            'how-to-choose-the-right-software-development-company-in-uganda',
            'website-design-vs-custom-web-development-whats-right-for-your-business',
            'the-real-cost-of-building-a-mobile-app-in-uganda',
            'digital-transformation-for-growing-businesses-where-to-start',
            'custom-software-vs-off-the-shelf-solutions-which-saves-more-money-long-term',
            'cybersecurity-basics-every-business-in-uganda-should-know',
        ]);

    expect(Post::query()->where('slug', 'website-development-company-in-uganda-what-to-expect-in-2026')->exists())
        ->toBeFalse();

    $softwareGuide = Post::query()
        ->where('slug', 'how-to-choose-the-right-software-development-company-in-uganda')
        ->firstOrFail();

    expect($softwareGuide->categories->pluck('slug')->all())
        ->toContain('software-strategy')
        ->and($softwareGuide->author->email)
        ->toBe('content@techtowerinc.com');
});

test('post seeder prefers an existing admin as the author when available', function () {
    $admin = User::factory()->create([
        'email' => 'admin@example.com',
        'is_admin' => true,
    ]);

    $this->seed(PostSeeder::class);

    expect(Post::query()->firstOrFail()->author_id)->toBe($admin->id);
});
