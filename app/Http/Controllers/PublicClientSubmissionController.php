<?php

namespace App\Http\Controllers;

use App\Models\ClientProjectSubmission;
use App\Models\SubmissionShortcode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class PublicClientSubmissionController extends Controller
{
    public function show(Request $request, string $token)
    {
        $submission = ClientProjectSubmission::where('token', $token)->first();

        if (! $submission) {
            return Inertia::render('Public/ClientSubmission/NotFound');
        }

        if ($submission->is_revoked) {
            return Inertia::render('Public/ClientSubmission/Revoked');
        }

        $submission->load('client', 'logos', 'media');

        $siteSetting = \App\Models\SiteSetting::first();

        return Inertia::render('Public/ClientSubmission/Form', [
            'submission' => $submission,
            'clientName' => $submission->client->name,
            'logos' => $submission->logos->map(fn ($logo) => [
                'id' => $logo->id,
                'url' => Storage::url($logo->file_path),
                'original_name' => $logo->original_name,
                'file_size' => $logo->file_size,
            ]),
            'media' => $submission->media->map(fn ($media) => [
                'id' => $media->id,
                'url' => Storage::url($media->file_path),
                'original_name' => $media->original_name,
                'file_size' => $media->file_size,
            ]),
            'siteName' => $siteSetting?->site_name ?? config('app.name'),
            'siteLogo' => $siteSetting?->logo_path ? Storage::url($siteSetting->logo_path) : null,
        ]);
    }

    public function success(Request $request, string $token)
    {
        $siteSetting = \App\Models\SiteSetting::first();

        return Inertia::render('Public/ClientSubmission/Success', [
            'siteName' => $siteSetting?->site_name ?? config('app.name'),
            'siteLogo' => $siteSetting?->logo_path ? Storage::url($siteSetting->logo_path) : null,
        ]);
    }

    public function shortcodeRedirect(string $code)
    {
        $shortcode = \App\Models\SubmissionShortcode::where('code', $code)->first();

        if (! $shortcode) {
            return Inertia::render('Public/ClientSubmission/NotFound');
        }

        $submission = $shortcode->submission;

        if ($submission->is_revoked) {
            return Inertia::render('Public/ClientSubmission/Revoked');
        }

        return redirect()->away(
            URL::temporarySignedRoute(
                'client.submission.show',
                now()->addDays(30),
                ['token' => $submission->token]
            )
        );
    }

    public function save(Request $request, string $token)
    {
        $submission = ClientProjectSubmission::where('token', $token)->first();

        if (! $submission || $submission->is_revoked) {
            return response()->json(['error' => 'Invalid or revoked link'], 403);
        }

        $validated = $request->validate([
            'project_name' => ['nullable', 'string', 'max:255'],
            'project_type' => ['nullable', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'company_email' => ['nullable', 'email', 'max:255'],
            'company_phone' => ['nullable', 'string', 'max:50'],
            'company_address' => ['nullable', 'string', 'max:500'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'contact_person_name' => ['nullable', 'string', 'max:255'],
            'contact_person_email' => ['nullable', 'email', 'max:255'],
            'contact_person_phone' => ['nullable', 'string', 'max:50'],
            'contact_person_role' => ['nullable', 'string', 'max:255'],
            'about_company' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'core_values' => ['nullable', 'string'],
            'services_offered' => ['nullable', 'json'],
            'project_goals' => ['nullable', 'string'],
            'target_audience' => ['nullable', 'string'],
            'key_features' => ['nullable', 'string'],
            'competitors' => ['nullable', 'string'],
            'design_notes' => ['nullable', 'string'],
            'design_inspiration_links' => ['nullable', 'json'],
            'preferred_colors' => ['nullable', 'string', 'max:255'],
            'preferred_fonts' => ['nullable', 'string', 'max:255'],
            'has_brand_guidelines' => ['nullable', 'boolean'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'twitter_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'tiktok_url' => ['nullable', 'url', 'max:255'],
            'youtube_url' => ['nullable', 'url', 'max:255'],
            'portfolio_info' => ['nullable', 'string'],
            'other_notes' => ['nullable', 'string'],
            'budget_range' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
        ]);

        $submission->update($validated);

        return response()->json([
            'message' => 'Saved successfully',
            'updated_at' => $submission->fresh()->updated_at->toIso8601String(),
        ]);
    }

    public function uploadLogo(Request $request, string $token)
    {
        $submission = ClientProjectSubmission::where('token', $token)->first();

        if (! $submission || $submission->is_revoked) {
            return response()->json(['error' => 'Invalid or revoked link'], 403);
        }

        if ($submission->logos()->count() >= 3) {
            return response()->json(['error' => 'Maximum 3 logos allowed'], 422);
        }

        $request->validate([
            'logo' => ['required', 'file', 'mimes:png,jpg,jpeg,svg,webp', 'max:10240'],
        ]);

        $file = $request->file('logo');
        $path = $file->store("client-submissions/{$submission->id}/logos", 'public');

        $logo = $submission->logos()->create([
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
        ]);

        return response()->json([
            'message' => 'Logo uploaded',
            'logo' => [
                'id' => $logo->id,
                'url' => Storage::url($path),
                'original_name' => $logo->original_name,
                'file_size' => $logo->file_size,
            ],
        ]);
    }

    public function uploadMedia(Request $request, string $token)
    {
        $submission = ClientProjectSubmission::where('token', $token)->first();

        if (! $submission || $submission->is_revoked) {
            return response()->json(['error' => 'Invalid or revoked link'], 403);
        }

        $request->validate([
            'media' => ['required', 'file', 'mimes:png,jpg,jpeg,webp,gif', 'max:30720'],
        ]);

        $file = $request->file('media');
        $path = $file->store("client-submissions/{$submission->id}/media", 'public');

        $media = $submission->media()->create([
            'file_path' => $path,
            'type' => 'photo',
            'original_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
        ]);

        return response()->json([
            'message' => 'Media uploaded',
            'media' => [
                'id' => $media->id,
                'url' => Storage::url($path),
                'original_name' => $media->original_name,
                'file_size' => $media->file_size,
            ],
        ]);
    }

    public function finalSubmit(Request $request, string $token)
    {
        $submission = ClientProjectSubmission::where('token', $token)->first();

        if (! $submission || $submission->is_revoked) {
            return response()->json(['error' => 'Invalid or revoked link'], 403);
        }

        $submission->update([
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Submission completed successfully',
        ]);
    }
}
