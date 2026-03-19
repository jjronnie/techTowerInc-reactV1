<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Models\Client;

class ClientController extends Controller
{
    public function show(Client $client): ClientResource
    {
        $client->loadCount([
            'portfolios' => fn ($query) => $query->where('is_active', true),
        ])->load([
            'portfolios' => fn ($query) => $query
                ->where('is_active', true)
                ->with(['client', 'categories', 'projectTypes', 'technologies'])
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->orderBy('title'),
        ]);

        return new ClientResource($client);
    }
}
