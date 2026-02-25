<?php

use App\Mail\ContactSubmissionMail;
use App\Models\ContactSubmission;
use App\Models\Service;
use Illuminate\Support\Facades\Mail;

test('contact submission stores data and emails admin', function () {
    Mail::fake();
    config()->set('contact.admin_email', 'admin@example.com');

    $service = Service::factory()->create();

    $payload = [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'We need a new website.',
        'company_website' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('contact_submissions', [
        'email' => 'jane@example.com',
        'service_id' => $service->id,
    ]);

    Mail::assertSent(ContactSubmissionMail::class, function (ContactSubmissionMail $mail) {
        return $mail->hasTo('admin@example.com');
    });
});

test('honeypot blocks contact submission', function () {
    Mail::fake();
    config()->set('contact.admin_email', 'admin@example.com');

    $service = Service::factory()->create();

    $payload = [
        'first_name' => 'Bot',
        'last_name' => 'User',
        'email' => 'bot@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'Spam message',
        'company_website' => 'filled',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(202);

    expect(ContactSubmission::query()->count())->toBe(0);
    Mail::assertNothingSent();
});

test('contact submission rejects links', function () {
    $service = Service::factory()->create();

    $payload = [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'Check https://example.com',
        'company_website' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(422)->assertJsonValidationErrors('message');
});

test('contact submission requires country code phone', function () {
    $service = Service::factory()->create();

    $payload = [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane@example.com',
        'phone' => '0703283529',
        'service_id' => $service->id,
        'message' => 'Need a quote.',
        'company_website' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(422)->assertJsonValidationErrors('phone');
});
