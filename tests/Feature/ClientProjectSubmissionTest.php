<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\ClientProjectSubmission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['is_admin' => true]);
    $this->actingAs($this->user);
});

test('admin can create a client project submission', function () {
    $client = Client::factory()->create();

    $response = $this->post(route('admin.client-project-submissions.store'), [
        'client_id' => $client->id,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('client_project_submissions', [
        'client_id' => $client->id,
        'status' => 'draft',
        'is_revoked' => 0,
    ]);
});

test('public user can view submission form with valid signed url', function () {
    $client = Client::factory()->create();
    $submission = ClientProjectSubmission::create([
        'client_id' => $client->id,
        'token' => (string) Str::uuid(),
        'status' => 'draft',
        'is_revoked' => false,
    ]);

    $url = URL::temporarySignedRoute(
        'client.submission.show',
        now()->addDays(30),
        ['token' => $submission->token]
    );

    $response = $this->get($url);

    $response->assertStatus(200);
});

test('revoked submission shows revoked page', function () {
    $client = Client::factory()->create();
    $submission = ClientProjectSubmission::create([
        'client_id' => $client->id,
        'token' => (string) Str::uuid(),
        'status' => 'draft',
        'is_revoked' => true,
    ]);

    $url = URL::temporarySignedRoute(
        'client.submission.show',
        now()->addDays(30),
        ['token' => $submission->token]
    );

    $response = $this->get($url);

    $response->assertStatus(200);
});

test('admin can revoke submission', function () {
    $client = Client::factory()->create();
    $submission = ClientProjectSubmission::create([
        'client_id' => $client->id,
        'token' => (string) Str::uuid(),
        'status' => 'draft',
        'is_revoked' => false,
    ]);

    $response = $this->post(route('admin.client-project-submissions.revoke', $submission));

    $response->assertRedirect();
    $response->assertSessionHas('success');
    $submission->refresh();
    expect($submission->is_revoked)->toBeTrue();
});

test('admin can regenerate submission link', function () {
    $client = Client::factory()->create();
    $submission = ClientProjectSubmission::create([
        'client_id' => $client->id,
        'token' => (string) Str::uuid(),
        'status' => 'draft',
        'is_revoked' => true,
    ]);

    $oldToken = $submission->token;

    $response = $this->post(route('admin.client-project-submissions.regenerate', $submission));

    $response->assertRedirect();
    $response->assertSessionHas('success');
    $submission->refresh();
    expect($submission->token)->not->toBe($oldToken);
    expect($submission->is_revoked)->toBeFalse();
});
