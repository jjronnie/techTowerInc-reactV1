<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_project_submissions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('client_id')->constrained()->cascadeOnDelete();

            $table->uuid('token')->unique();
            $table->boolean('is_revoked')->default(false);
            $table->timestamp('revoked_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->string('status')->default('draft');

            $table->string('project_name')->nullable();
            $table->string('project_type')->nullable();
            $table->string('tagline')->nullable();

            $table->string('company_name')->nullable();
            $table->string('company_email')->nullable();
            $table->string('company_phone')->nullable();
            $table->string('company_address')->nullable();
            $table->string('website_url')->nullable();

            $table->string('contact_person_name')->nullable();
            $table->string('contact_person_email')->nullable();
            $table->string('contact_person_phone')->nullable();
            $table->string('contact_person_role')->nullable();

            $table->longText('about_company')->nullable();
            $table->longText('mission')->nullable();
            $table->longText('vision')->nullable();
            $table->longText('core_values')->nullable();

            $table->json('services_offered')->nullable();

            $table->longText('project_goals')->nullable();
            $table->longText('target_audience')->nullable();
            $table->longText('key_features')->nullable();
            $table->longText('competitors')->nullable();

            $table->longText('design_notes')->nullable();
            $table->json('design_inspiration_links')->nullable();
            $table->string('preferred_colors')->nullable();
            $table->string('preferred_fonts')->nullable();
            $table->boolean('has_brand_guidelines')->nullable();

            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->string('youtube_url')->nullable();

            $table->longText('portfolio_info')->nullable();
            $table->longText('other_notes')->nullable();

            $table->string('budget_range')->nullable();
            $table->date('deadline')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_project_submissions');
    }
};
