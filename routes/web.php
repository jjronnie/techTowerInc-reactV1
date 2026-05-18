<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ClientController as AdminClientController;
use App\Http\Controllers\Admin\ClientProjectSubmissionController;
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
use App\Http\Controllers\PublicClientSubmissionController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\PreventSearchIndexing;
use Illuminate\Support\Facades\Route;

Route::get('llms.txt', function () {
    abort_unless(is_file(public_path('llms.txt')), 404);

    return response(
        file_get_contents(public_path('llms.txt')),
        200,
        ['Content-Type' => 'text/plain; charset=UTF-8'],
    );
})->name('llms');

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

// Public client project submission (signed URLs)
Route::get('/client-submission/{token}', [PublicClientSubmissionController::class, 'show'])
    ->name('client.submission.show')
    ->middleware(['signed', 'throttle:60,1']);
Route::post('/client-submission/{token}/save', [PublicClientSubmissionController::class, 'save'])
    ->name('client.submission.save')
    ->middleware(['signed', 'throttle:120,1']);
Route::post('/client-submission/{token}/upload-logo', [PublicClientSubmissionController::class, 'uploadLogo'])
    ->name('client.submission.uploadLogo')
    ->middleware(['signed', 'throttle:10,1']);
Route::post('/client-submission/{token}/upload-media', [PublicClientSubmissionController::class, 'uploadMedia'])
    ->name('client.submission.uploadMedia')
    ->middleware(['signed', 'throttle:10,1']);
Route::post('/client-submission/{token}/final-submit', [PublicClientSubmissionController::class, 'finalSubmit'])
    ->name('client.submission.finalSubmit')
    ->middleware(['signed', 'throttle:10,1']);

Route::get('/client-submission/{token}/success', function (string $token) {
    return inertia('Public/ClientSubmission/Success');
})->name('client.submission.success');

Route::get('/s/{code}', [PublicClientSubmissionController::class, 'shortcodeRedirect']);

// Admin client project submissions
Route::middleware(['auth', 'verified', PreventSearchIndexing::class, EnsureAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('client-project-submissions', ClientProjectSubmissionController::class)
            ->parameters(['client-project-submissions' => 'submission']);
        Route::post('client-project-submissions/{submission}/revoke', [ClientProjectSubmissionController::class, 'revoke'])
            ->name('client-project-submissions.revoke');
        Route::post('client-project-submissions/{submission}/regenerate', [ClientProjectSubmissionController::class, 'regenerate'])
            ->name('client-project-submissions.regenerate');
        Route::delete('client-project-submissions/logos/{logo}', [ClientProjectSubmissionController::class, 'deleteLogo'])
            ->name('client-project-submissions.deleteLogo');
        Route::delete('client-project-submissions/media/{media}', [ClientProjectSubmissionController::class, 'deleteMedia'])
            ->name('client-project-submissions.deleteMedia');
    });

Route::permanentRedirect('/register', '/login');

Route::fallback(function () {
    return response()->json(['message' => 'Not Found.'], 404);
});
