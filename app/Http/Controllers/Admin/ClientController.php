<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreClientRequest;
use App\Http\Requests\Admin\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()
            ->withCount('portfolios')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/clients/index', [
            'clients' => $clients,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/clients/create');
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('clients/logos', 'public');
        }

        unset($data['logo']);

        $client = Client::query()->create($data);

        return redirect()
            ->route('admin.clients.edit', $client)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Client created',
                'message' => "\"{$client->name}\" is ready to edit.",
            ]);
    }

    public function show(Client $client): RedirectResponse
    {
        return redirect()->route('admin.clients.edit', $client);
    }

    public function edit(Client $client): Response
    {
        $client->setAttribute(
            'logo_url',
            $client->logo_path ? Storage::url($client->logo_path) : null,
        );

        return Inertia::render('admin/clients/edit', [
            'client' => $client,
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $data = $request->validated();

        if ($request->boolean('remove_logo')) {
            if ($client->logo_path) {
                Storage::disk('public')->delete($client->logo_path);
            }

            $data['logo_path'] = null;
        }

        if ($request->hasFile('logo')) {
            if ($client->logo_path) {
                Storage::disk('public')->delete($client->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('clients/logos', 'public');
        }

        unset($data['logo'], $data['remove_logo']);

        $client->update($data);

        return redirect()
            ->route('admin.clients.edit', $client)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Client updated',
                'message' => "\"{$client->name}\" has been saved.",
            ]);
    }

    public function destroy(Client $client): RedirectResponse
    {
        $name = $client->name;

        if ($client->logo_path) {
            Storage::disk('public')->delete($client->logo_path);
        }

        $client->delete();

        return redirect()
            ->route('admin.clients.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Client deleted',
                'message' => "\"{$name}\" has been removed.",
            ]);
    }
}
