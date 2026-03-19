<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('home_featured_image_path')->nullable()->after('featured_image_path');
        });

        DB::table('portfolios')
            ->where('is_featured', true)
            ->whereNull('home_featured_image_path')
            ->whereNotNull('featured_image_path')
            ->update([
                'home_featured_image_path' => DB::raw('featured_image_path'),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn('home_featured_image_path');
        });
    }
};
