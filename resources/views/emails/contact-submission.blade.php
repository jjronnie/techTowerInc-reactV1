@php
    $serviceTitle = $submission->service?->title;
@endphp

<h2>New Contact Submission</h2>

<p><strong>Name:</strong> {{ $submission->name }}</p>

@if ($submission->company_name)
    <p><strong>Company:</strong> {{ $submission->company_name }}</p>
@endif

<p><strong>Email:</strong> {{ $submission->email }}</p>
<p><strong>Phone:</strong> {{ $submission->phone }}</p>

@if ($serviceTitle)
    <p><strong>Service:</strong> {{ $serviceTitle }}</p>
@endif

@if ($submission->other_service_details)
    <p><strong>Other Service Details:</strong> {{ $submission->other_service_details }}</p>
@endif

<p><strong>Message:</strong></p>
<p>{!! nl2br(e($submission->message)) !!}</p>
