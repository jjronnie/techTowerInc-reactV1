<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ContactSubmissionController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\TechnologyController;
use Illuminate\Support\Facades\Route;

Route::get('site-settings', [SiteSettingController::class, 'show'])->name('api.site-settings.show');

Route::get('services', [ServiceController::class, 'index'])->name('api.services.index');
Route::get('services/{service:slug}', [ServiceController::class, 'show'])->name('api.services.show');

Route::get('technologies', [TechnologyController::class, 'index'])->name('api.technologies.index');
Route::get('team-members', [TeamMemberController::class, 'index'])->name('api.team-members.index');

Route::get('portfolio', [PortfolioController::class, 'index'])->name('api.portfolio.index');
Route::get('portfolio/{portfolio:slug}', [PortfolioController::class, 'show'])->name('api.portfolio.show');
Route::get('clients/{client:slug}', [ClientController::class, 'show'])->name('api.clients.show');

Route::get('products', [ProductController::class, 'index'])->name('api.products.index');
Route::get('products/{product:slug}', [ProductController::class, 'show'])->name('api.products.show');

Route::get('posts', [PostController::class, 'index'])->name('api.posts.index');
Route::get('posts/{post:slug}', [PostController::class, 'show'])->name('api.posts.show');

Route::post('contact-submissions', [ContactSubmissionController::class, 'store'])->name('api.contact-submissions.store');
