<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_project_submission_media', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_project_submission_id');
            $table->string('type')->default('photo');
            $table->string('file_path');
            $table->string('original_name')->nullable();
            $table->integer('file_size')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE client_project_submission_media ADD CONSTRAINT cps_media_fk FOREIGN KEY (client_project_submission_id) REFERENCES client_project_submissions(id) ON DELETE CASCADE');
    }

    public function down(): void
    {
        Schema::dropIfExists('client_project_submission_media');
    }
};
