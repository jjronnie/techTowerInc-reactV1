<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'counts' => [
                'services' => Service::query()->count(),
                'portfolios' => Portfolio::query()->count(),
                'products' => Product::query()->count(),
                'posts' => Post::query()->count(),
                'users' => User::query()->count(),
            ],
        ]);
    }
}
