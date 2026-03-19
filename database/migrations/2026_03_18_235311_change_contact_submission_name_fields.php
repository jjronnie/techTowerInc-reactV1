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
        Schema::create('contact_submissions_updated', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company_name')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->text('other_service_details')->nullable();
            $table->text('message');
            $table->timestamps();
        });

        DB::table('contact_submissions')
            ->select(['id', 'first_name', 'last_name'])
            ->orderBy('id')
            ->get()
            ->each(function (object $submission): void {
                $name = trim(implode(' ', array_filter([
                    $submission->first_name,
                    $submission->last_name,
                ])));

                $existingSubmission = DB::table('contact_submissions')
                    ->where('id', $submission->id)
                    ->select([
                        'id',
                        'email',
                        'phone',
                        'service_id',
                        'other_service_details',
                        'message',
                        'created_at',
                        'updated_at',
                    ])
                    ->first();

                if (! $existingSubmission) {
                    return;
                }

                DB::table('contact_submissions_updated')->insert([
                    'id' => $existingSubmission->id,
                    'name' => $name,
                    'company_name' => null,
                    'email' => $existingSubmission->email,
                    'phone' => $existingSubmission->phone,
                    'service_id' => $existingSubmission->service_id,
                    'other_service_details' => $existingSubmission->other_service_details,
                    'message' => $existingSubmission->message,
                    'created_at' => $existingSubmission->created_at,
                    'updated_at' => $existingSubmission->updated_at,
                ]);
            });

        Schema::disableForeignKeyConstraints();
        Schema::drop('contact_submissions');
        Schema::rename('contact_submissions_updated', 'contact_submissions');
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('contact_submissions_legacy', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->text('other_service_details')->nullable();
            $table->text('message');
            $table->timestamps();
        });

        DB::table('contact_submissions')
            ->select(['id', 'name'])
            ->orderBy('id')
            ->get()
            ->each(function (object $submission): void {
                $nameParts = preg_split('/\s+/', trim((string) $submission->name), 2) ?: [];
                $firstName = $nameParts[0] ?? '';
                $lastName = $nameParts[1] ?? '';

                $existingSubmission = DB::table('contact_submissions')
                    ->where('id', $submission->id)
                    ->select([
                        'id',
                        'email',
                        'phone',
                        'service_id',
                        'other_service_details',
                        'message',
                        'created_at',
                        'updated_at',
                    ])
                    ->first();

                if (! $existingSubmission) {
                    return;
                }

                DB::table('contact_submissions_legacy')->insert([
                    'id' => $existingSubmission->id,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $existingSubmission->email,
                    'phone' => $existingSubmission->phone,
                    'service_id' => $existingSubmission->service_id,
                    'other_service_details' => $existingSubmission->other_service_details,
                    'message' => $existingSubmission->message,
                    'created_at' => $existingSubmission->created_at,
                    'updated_at' => $existingSubmission->updated_at,
                ]);
            });

        Schema::disableForeignKeyConstraints();
        Schema::drop('contact_submissions');
        Schema::rename('contact_submissions_legacy', 'contact_submissions');
        Schema::enableForeignKeyConstraints();
    }
};
