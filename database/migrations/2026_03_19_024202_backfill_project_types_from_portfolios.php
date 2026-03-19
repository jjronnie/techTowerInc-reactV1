<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (
            ! Schema::hasTable('project_types') ||
            ! Schema::hasTable('portfolio_project_type') ||
            ! Schema::hasTable('portfolios') ||
            ! Schema::hasColumn('portfolios', 'type')
        ) {
            return;
        }

        DB::table('portfolios')
            ->select(['id', 'type'])
            ->whereNotNull('type')
            ->orderBy('id')
            ->get()
            ->each(function (object $portfolio): void {
                $typeName = trim((string) $portfolio->type);

                if ($typeName === '') {
                    return;
                }

                $existingType = DB::table('project_types')
                    ->where('name', $typeName)
                    ->first();

                $projectTypeId = $existingType?->id
                    ?? DB::table('project_types')->insertGetId([
                        'name' => $typeName,
                        'slug' => Str::slug($typeName),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                DB::table('portfolio_project_type')->updateOrInsert([
                    'portfolio_id' => $portfolio->id,
                    'project_type_id' => $projectTypeId,
                ]);
            });

        Schema::table('portfolios', function (Blueprint $table): void {
            if (Schema::hasColumn('portfolios', 'type')) {
                $table->dropColumn('type');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('portfolios')) {
            return;
        }

        if (! Schema::hasColumn('portfolios', 'type')) {
            Schema::table('portfolios', function (Blueprint $table): void {
                $table->string('type')->nullable()->after('title');
            });
        }

        if (
            ! Schema::hasTable('portfolio_project_type') ||
            ! Schema::hasTable('project_types')
        ) {
            return;
        }

        DB::table('portfolios')
            ->leftJoin(
                'portfolio_project_type',
                'portfolios.id',
                '=',
                'portfolio_project_type.portfolio_id',
            )
            ->leftJoin(
                'project_types',
                'portfolio_project_type.project_type_id',
                '=',
                'project_types.id',
            )
            ->select(['portfolios.id', 'project_types.name'])
            ->orderBy('portfolios.id')
            ->get()
            ->groupBy('id')
            ->each(function ($rows, int $portfolioId): void {
                $typeName = $rows->pluck('name')->filter()->first();

                DB::table('portfolios')
                    ->where('id', $portfolioId)
                    ->update([
                        'type' => $typeName,
                    ]);
            });
    }
};
