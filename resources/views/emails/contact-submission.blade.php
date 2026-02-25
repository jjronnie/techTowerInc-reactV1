@php
    $serviceTitle = $submission->service?->title;
@endphp

<h2>New Contact Submission</h2>

<p><strong>Name:</strong> {{ $submission->first_name }} {{ $submission->last_name }}</p>
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
