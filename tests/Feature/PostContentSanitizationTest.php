<?php

use App\Models\Post;
use App\Models\User;

test('post content is sanitized on create', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);

    $payload = [
        'title' => 'Sanitized Post',
        'slug' => 'sanitized-post',
        'excerpt' => 'Excerpt',
        'content' => '<h2>Heading</h2><script>alert(1)</script><p>Body</p><a href="javascript:alert(1)">Bad</a>',
        'status' => 'draft',
    ];

    $response = $this->actingAs($admin)->post('/admin/posts', $payload);

    $response->assertRedirect();

    $post = Post::query()->where('slug', 'sanitized-post')->firstOrFail();

    expect($post->content)
        ->not->toContain('<script>')
        ->not->toContain('javascript:');
});
