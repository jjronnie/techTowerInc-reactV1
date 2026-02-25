<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            'services' => Service::query()->count(),
            'portfolios' => Portfolio::query()->count(),
            'products' => Product::query()->count(),
            'posts' => Post::query()->count(),
            'contact_submissions' => ContactSubmission::query()->count(),
            'users' => User::query()->count(),
        ];

        $recentPosts = Post::query()
            ->latest('published_at')
            ->limit(5)
            ->get(['id', 'title', 'status', 'published_at']);

        $recentSubmissions = ContactSubmission::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'first_name', 'last_name', 'email', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_posts' => $recentPosts,
            'recent_submissions' => $recentSubmissions,
        ]);
    }
}
