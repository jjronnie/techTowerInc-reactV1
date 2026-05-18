<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('client_project_submissions', function (Blueprint $table) {
            $table->renameColumn('design_notes', 'design_notes');
            $table->renameColumn('other_notes', 'other_notes');
        });
    }

    public function down(): void
    {
        Schema::table('client_project_submissions', function (Blueprint $table) {
            $table->renameColumn('design_notes', 'design_notes');
            $table->renameColumn('other_notes', 'other_notes');
        });
    }
};
