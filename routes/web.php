<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ClientController as AdminClientController;
use App\Http\Controllers\Admin\ContactSubmissionController as AdminContactSubmissionController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
use App\Http\Controllers\Admin\TechnologyController as AdminTechnologyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

$marketingView = function () {
    $path = public_path('marketing/index.html');

    if (! file_exists($path)) {
        abort(404, 'Marketing build not found. Run the marketing build first.');
    }

    return response()->file($path);
};

Route::get('/', $marketingView)->name('marketing.home');

Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('robots.txt', [SitemapController::class, 'robots'])->name('robots');

Route::middleware(['auth', 'verified', EnsureAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', function () {
            return redirect()->route('dashboard');
        })->name('home');

        Route::resource('services', AdminServiceController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('clients', AdminClientController::class);
        Route::resource('technologies', AdminTechnologyController::class);
        Route::resource('portfolios', AdminPortfolioController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('posts', AdminPostController::class);
        Route::resource('contact-submissions', AdminContactSubmissionController::class)
            ->only(['index', 'show', 'destroy']);
        Route::resource('users', AdminUserController::class);

        Route::get('site-settings', [AdminSiteSettingController::class, 'edit'])->name('site-settings.edit');
        Route::put('site-settings', [AdminSiteSettingController::class, 'update'])->name('site-settings.update');
    });

Route::get('dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/settings.php';

Route::fallback($marketingView);
