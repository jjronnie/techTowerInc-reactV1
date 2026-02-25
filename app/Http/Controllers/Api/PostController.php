<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = max(1, min((int) $request->query('per_page', 6), 50));

        $posts = Post::query()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->with('author')
            ->orderByDesc('published_at')
            ->paginate($perPage);

        return PostResource::collection($posts);
    }

    public function show(Post $post): PostResource
    {
        if ($post->status !== 'published' || ! $post->published_at || $post->published_at->isFuture()) {
            abort(404);
        }

        $post->loadMissing('author');

        return new PostResource($post);
    }
}
