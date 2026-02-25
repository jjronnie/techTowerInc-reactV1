<?php

use App\Models\ContactSubmission;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('stats')
        ->has('recent_posts')
        ->has('recent_submissions')
    );
});

test('dashboard shows counts for seeded content', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    Service::factory()->count(2)->create();
    Portfolio::factory()->count(1)->create();
    Product::factory()->count(1)->create();
    Post::factory()->count(3)->create();
    ContactSubmission::factory()->count(1)->create();

    $response = $this->get(route('dashboard'));

    $response->assertInertia(fn (Assert $page) => $page
        ->where('stats.services', 2)
        ->where('stats.portfolios', 1)
        ->where('stats.products', 1)
        ->where('stats.posts', 3)
        ->where('stats.contact_submissions', 1)
    );
});
