<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactSubmissionRequest;
use App\Mail\ContactSubmissionMail;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactSubmissionController extends Controller
{
    public function store(StoreContactSubmissionRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (filled($data['company_website'] ?? null)) {
            return response()->json([
                'message' => 'Submission received.',
            ], 202);
        }

        unset($data['company_website'], $data['contact_time']);

        $submission = ContactSubmission::query()->create($data);
        $submission->load('service');

        $adminEmail = config('contact.admin_email');

        if ($adminEmail) {
            try {
                Mail::to($adminEmail)->send(new ContactSubmissionMail($submission));
            } catch (Throwable $exception) {
                report($exception);
            }
        } else {
            Log::warning('Contact submission email skipped because admin email is not configured.', [
                'contact_submission_id' => $submission->id,
            ]);
        }

        return response()->json([
            'message' => 'Thank you. Your message has been received.',
        ], 201);
    }
}
