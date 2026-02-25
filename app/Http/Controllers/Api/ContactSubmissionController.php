<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactSubmissionRequest;
use App\Mail\ContactSubmissionMail;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactSubmissionController extends Controller
{
    public function store(StoreContactSubmissionRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (! empty($data['company_website'] ?? null)) {
            return response()->json([
                'message' => 'Submission received.',
            ], 202);
        }

        unset($data['company_website']);

        $submission = ContactSubmission::query()->create($data);
        $submission->load('service');

        $adminEmail = config('contact.admin_email');

        if (! $adminEmail) {
            return response()->json([
                'message' => 'Admin email is not configured.',
            ], 500);
        }

        try {
            Mail::to($adminEmail)->send(new ContactSubmissionMail($submission));
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Unable to send your message right now.',
            ], 500);
        }

        return response()->json([
            'message' => 'Submission received.',
        ], 201);
    }
}
