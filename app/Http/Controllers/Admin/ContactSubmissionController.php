<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    public function index(): Response
    {
        $submissions = ContactSubmission::query()
            ->with('service:id,title')
            ->latest()
            ->get([
                'id',
                'first_name',
                'last_name',
                'email',
                'phone',
                'service_id',
                'other_service_details',
                'created_at',
            ]);

        return Inertia::render('admin/contact-submissions/index', [
            'submissions' => $submissions,
        ]);
    }

    public function show(ContactSubmission $contactSubmission): Response
    {
        $contactSubmission->load('service:id,title');

        return Inertia::render('admin/contact-submissions/show', [
            'submission' => $contactSubmission,
        ]);
    }

    public function destroy(ContactSubmission $contactSubmission): RedirectResponse
    {
        $contactSubmission->delete();

        return redirect()->route('admin.contact-submissions.index');
    }
}
