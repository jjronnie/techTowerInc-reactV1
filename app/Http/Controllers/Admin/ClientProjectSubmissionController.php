<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ClientProjectSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class ClientProjectSubmissionController extends Controller
{
    public function index()
    {
        $submissions = ClientProjectSubmission::with('client')
            ->latest()
            ->paginate(20);

        return inertia('admin/client-project-submissions/index', [
            'submissions' => $submissions,
        ]);
    }

    public function create()
    {
        $clients = Client::orderBy('name')->get(['id', 'name']);

        return inertia('admin/client-project-submissions/create', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => ['required', 'exists:clients,id'],
        ]);

        $submission = ClientProjectSubmission::create([
            'client_id' => $validated['client_id'],
            'token' => (string) Str::uuid(),
            'status' => 'draft',
            'is_revoked' => false,
        ]);

        // Create shortcode
        $shortcode = \App\Models\SubmissionShortcode::create([
            'client_project_submission_id' => $submission->id,
            'code' => strtoupper(Str::random(6)),
        ]);

        $signedUrl = URL::temporarySignedRoute(
            'client.submission.show',
            now()->addDays(30),
            ['token' => $submission->token]
        );

        return redirect()->route('admin.client-project-submissions.show', $submission)
            ->with('success', 'Submission link created.')
            ->with('signed_url', $signedUrl)
            ->with('shortcode', $shortcode->code);
    }

    public function show(ClientProjectSubmission $submission)
    {
        $submission->load('client', 'logos', 'media');

        $signedUrl = $submission->is_revoked ? null : URL::temporarySignedRoute(
            'client.submission.show',
            now()->addDays(30),
            ['token' => $submission->token]
        );

        return inertia('admin/client-project-submissions/show', [
            'submission' => $submission,
            'signedUrl' => $signedUrl,
            'shortcode' => $submission->shortcode?->code,
            'logos' => $submission->logos->map(fn ($logo) => [
                'id' => $logo->id,
                'url' => Storage::url($logo->file_path),
                'original_name' => $logo->original_name,
                'file_size' => $logo->file_size,
            ]),
            'mediaFiles' => $submission->media->map(fn ($media) => [
                'id' => $media->id,
                'url' => Storage::url($media->file_path),
                'original_name' => $media->original_name,
                'file_size' => $media->file_size,
            ]),
        ]);
    }

    public function edit(ClientProjectSubmission $submission)
    {
        $submission->load('client');

        return inertia('admin/client-project-submissions/edit', [
            'submission' => $submission,
        ]);
    }

    public function update(Request $request, ClientProjectSubmission $submission)
    {
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
            'status' => ['nullable', 'in:draft,submitted'],
            'is_revoked' => ['nullable', 'boolean'],
        ]);

        $submission->update($validated);

        return redirect()->route('admin.client-project-submissions.show', $submission)
            ->with('success', 'Submission updated successfully.');
    }

    public function destroy(ClientProjectSubmission $submission)
    {
        $submission->delete();

        return redirect()->route('admin.client-project-submissions.index')
            ->with('success', 'Submission deleted successfully.');
    }

    public function revoke(ClientProjectSubmission $submission)
    {
        $submission->update([
            'is_revoked' => true,
            'revoked_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Submission link revoked.');
    }

    public function regenerate(ClientProjectSubmission $submission)
    {
        $submission->update([
            'token' => (string) Str::uuid(),
            'is_revoked' => false,
            'revoked_at' => null,
        ]);

        $signedUrl = URL::temporarySignedRoute(
            'client.submission.show',
            now()->addDays(30),
            ['token' => $submission->fresh()->token]
        );

        return redirect()->back()
            ->with('success', 'New link generated.')
            ->with('signed_url', $signedUrl);
    }

    public function deleteLogo(ClientProjectSubmissionLogo $logo)
    {
        Storage::disk('public')->delete($logo->file_path);
        $logo->delete();

        return redirect()->back()
            ->with('success', 'Logo deleted successfully.');
    }

    public function deleteMedia(ClientProjectSubmissionMedia $media)
    {
        Storage::disk('public')->delete($media->file_path);
        $media->delete();

        return redirect()->back()
            ->with('success', 'Media file deleted successfully.');
    }
}
