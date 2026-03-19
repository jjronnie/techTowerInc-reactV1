<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $posts = Post::query()
            ->with(['author', 'categories'])
            ->orderByDesc('published_at')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/posts/create', [
            'categories' => CategoryResource::collection(
                Category::query()->orderBy('name')->get(),
            )->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $categoryIds = $data['category_ids'];

        $data['author_id'] = $request->user()->id;
        $data['status'] = $data['status'] ?? 'draft';

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if ($data['status'] !== 'published') {
            $data['published_at'] = null;
        }

        if ($request->hasFile('featured_image')) {
            $data['featured_image_path'] = $request->file('featured_image')->store('posts/featured', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image_path'] = $request->file('og_image')->store('posts/og-images', 'public');
        }

        unset($data['category_ids'], $data['featured_image'], $data['og_image']);

        $post = Post::query()->create($data);
        $post->categories()->sync($categoryIds);

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Post created',
                'message' => "\"{$post->title}\" is ready to edit.",
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): RedirectResponse
    {
        return redirect()->route('admin.posts.edit', $post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        $post->loadMissing(['author', 'categories']);
        $post->setAttribute(
            'featured_image_url',
            $post->featured_image_path ? Storage::url($post->featured_image_path) : null,
        );
        $post->setAttribute(
            'og_image_url',
            $post->og_image_path ? Storage::url($post->og_image_path) : null,
        );
        $post->setAttribute('category_ids', $post->categories->pluck('id')->all());

        return Inertia::render('admin/posts/edit', [
            'post' => $post,
            'categories' => CategoryResource::collection(
                Category::query()->orderBy('name')->get(),
            )->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $data = $request->validated();
        $categoryIds = $data['category_ids'];
        $data['status'] = $data['status'] ?? $post->status;

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if ($data['status'] !== 'published') {
            $data['published_at'] = null;
        }

        if ($request->boolean('remove_featured_image')) {
            if ($post->featured_image_path) {
                Storage::disk('public')->delete($post->featured_image_path);
            }
            $data['featured_image_path'] = null;
        }

        if ($request->hasFile('featured_image')) {
            if ($post->featured_image_path) {
                Storage::disk('public')->delete($post->featured_image_path);
            }
            $data['featured_image_path'] = $request->file('featured_image')->store('posts/featured', 'public');
        }

        if ($request->boolean('remove_og_image')) {
            if ($post->og_image_path) {
                Storage::disk('public')->delete($post->og_image_path);
            }
            $data['og_image_path'] = null;
        }

        if ($request->hasFile('og_image')) {
            if ($post->og_image_path) {
                Storage::disk('public')->delete($post->og_image_path);
            }
            $data['og_image_path'] = $request->file('og_image')->store('posts/og-images', 'public');
        }

        unset(
            $data['category_ids'],
            $data['featured_image'],
            $data['og_image'],
            $data['remove_featured_image'],
            $data['remove_og_image']
        );

        $post->update($data);
        $post->categories()->sync($categoryIds);

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Post updated',
                'message' => "Changes to \"{$post->title}\" have been saved.",
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        if ($post->featured_image_path) {
            Storage::disk('public')->delete($post->featured_image_path);
        }

        if ($post->og_image_path) {
            Storage::disk('public')->delete($post->og_image_path);
        }

        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Post deleted',
                'message' => 'The post has been removed.',
            ]);
    }
}
