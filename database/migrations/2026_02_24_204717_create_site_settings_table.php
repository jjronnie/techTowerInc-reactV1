<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name');
            $table->string('tagline')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('favicon_path')->nullable();
            $table->string('company_email')->nullable();
            $table->string('company_phone')->nullable();
            $table->string('company_address')->nullable();
            $table->json('social_links')->nullable();
            $table->text('footer_text')->nullable();
            $table->string('default_seo_title')->nullable();
            $table->text('default_seo_description')->nullable();
            $table->string('default_og_image_path')->nullable();
            $table->json('verification_meta')->nullable();
            $table->json('home_hero')->nullable();
            $table->json('home_stats')->nullable();
            $table->json('home_portfolio_intro')->nullable();
            $table->json('home_services_intro')->nullable();
            $table->json('home_features')->nullable();
            $table->json('home_testimonials')->nullable();
            $table->json('home_faqs')->nullable();
            $table->json('home_cta')->nullable();
            $table->json('about_header')->nullable();
            $table->json('about_story')->nullable();
            $table->json('about_principles')->nullable();
            $table->json('about_cards')->nullable();
            $table->json('about_team')->nullable();
            $table->json('about_cta')->nullable();
            $table->json('services_page')->nullable();
            $table->json('portfolio_page')->nullable();
            $table->json('products_page')->nullable();
            $table->json('blog_page')->nullable();
            $table->json('contact_header')->nullable();
            $table->json('contact_details')->nullable();
            $table->json('contact_social')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
