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
        'name' => 'Jane Doe',
        'company_name' => 'Acme Limited',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'We need a new website.',
        'contact_time' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'company_name' => 'Acme Limited',
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
        'name' => 'Bot User',
        'email' => 'bot@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'Spam message',
        'company_website' => 'https://spam.example.com',
        'contact_time' => '1765432100',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(202);

    expect(ContactSubmission::query()->count())->toBe(0);
    Mail::assertNothingSent();
});

test('contact submission ignores contact time metadata', function () {
    Mail::fake();
    config()->set('contact.admin_email', 'admin@example.com');

    $service = Service::factory()->create();

    $payload = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'We need a new website.',
        'contact_time' => (string) now()->subMinute()->timestamp,
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertCreated();

    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'service_id' => $service->id,
    ]);
});

test('contact submission still succeeds when admin email is not configured', function () {
    Mail::fake();
    config()->set('contact.admin_email', null);

    $service = Service::factory()->create();

    $payload = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'We need a new website.',
        'contact_time' => (string) now()->subMinute()->timestamp,
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response
        ->assertCreated()
        ->assertJson([
            'message' => 'Thank you. Your message has been received.',
        ]);

    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'service_id' => $service->id,
    ]);

    Mail::assertNothingSent();
});

test('contact submission rejects links', function () {
    $service = Service::factory()->create();

    $payload = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '+256703283529',
        'service_id' => $service->id,
        'message' => 'Check https://example.com',
        'contact_time' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(422)->assertJsonValidationErrors('message');
});

test('contact submission requires country code phone', function () {
    $service = Service::factory()->create();

    $payload = [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'phone' => '0703283529',
        'service_id' => $service->id,
        'message' => 'Need a quote.',
        'contact_time' => '',
    ];

    $response = $this->postJson('/api/contact-submissions', $payload);

    $response->assertStatus(422)->assertJsonValidationErrors('phone');
});
