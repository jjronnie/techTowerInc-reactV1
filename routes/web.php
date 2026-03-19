<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ClientController as AdminClientController;
use App\Http\Controllers\Admin\ContactSubmissionController as AdminContactSubmissionController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProjectTypeController as AdminProjectTypeController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SiteSettingController as AdminSiteSettingController;
use App\Http\Controllers\Admin\TeamMemberController as AdminTeamMemberController;
use App\Http\Controllers\Admin\TechnologyController as AdminTechnologyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\PreventSearchIndexing;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('blog/{path?}', function (Request $request, ?string $path = null) {
    $target = '/news'.($path ? "/{$path}" : '');

    if ($request->getQueryString()) {
        $target .= '?'.$request->getQueryString();
    }

    return redirect($target, 301);
})->where('path', '.*');

Route::get('llms.txt', function () {
    abort_unless(is_file(public_path('llms.txt')), 404);

    return response(
        file_get_contents(public_path('llms.txt')),
        200,
        ['Content-Type' => 'text/plain; charset=UTF-8'],
    );
})->name('llms');

Route::get('/', [PublicPageController::class, 'home'])->name('public.home');
Route::get('about', [PublicPageController::class, 'about'])->name('public.about');
Route::get('services', [PublicPageController::class, 'servicesIndex'])->name('public.services.index');
Route::get('services/{service:slug}', [PublicPageController::class, 'serviceShow'])
    ->name('public.services.show')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('portfolio', [PublicPageController::class, 'portfolioIndex'])->name('public.portfolio.index');
Route::get('portfolio/category/{category:slug}', [PublicPageController::class, 'portfolioCategory'])
    ->name('public.portfolio.category')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('project/{portfolio:slug}', [PublicPageController::class, 'projectShow'])
    ->name('public.projects.show')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('portfolio/{portfolio:slug}', function (Request $request, Portfolio $portfolio) {
    $target = route('public.projects.show', $portfolio, false);

    if ($request->getQueryString()) {
        $target .= '?'.$request->getQueryString();
    }

    return redirect($target, 301);
})->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('clients/{client:slug}', [PublicPageController::class, 'clientShow'])
    ->name('public.clients.show')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('products', [PublicPageController::class, 'productsIndex'])->name('public.products.index');
Route::get('products/{product:slug}', [PublicPageController::class, 'productShow'])
    ->name('public.products.show')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('news', [PublicPageController::class, 'newsIndex'])->name('public.news.index');
Route::get('news/category/{category:slug}', [PublicPageController::class, 'newsCategory'])
    ->name('public.news.category')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('news/{post:slug}', [PublicPageController::class, 'newsShow'])
    ->name('public.news.show')
    ->missing(fn (Request $request) => app(PublicPageController::class)->notFound($request));
Route::get('contact', [PublicPageController::class, 'contact'])->name('public.contact');
Route::get('privacy-policy', [PublicPageController::class, 'privacy'])->name('public.privacy');

Route::get('sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('robots.txt', [SitemapController::class, 'robots'])->name('robots');

Route::middleware(['auth', 'verified', PreventSearchIndexing::class, EnsureAdmin::class])
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
        Route::resource('project-types', AdminProjectTypeController::class);
        Route::resource('team-members', AdminTeamMemberController::class);
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
    ->middleware(['auth', 'verified', PreventSearchIndexing::class])
    ->name('dashboard');

require __DIR__.'/settings.php';

Route::fallback([PublicPageController::class, 'notFound']);
