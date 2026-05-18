<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_shortcodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_project_submission_id')->constrained()->cascadeOnDelete();
            $table->string('code', 10)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_shortcodes');
    }
};
