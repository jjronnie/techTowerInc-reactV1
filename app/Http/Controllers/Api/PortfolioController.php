<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PortfolioController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $portfolios = Portfolio::query()
            ->where('is_active', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return PortfolioResource::collection($portfolios);
    }

    public function show(Portfolio $portfolio): PortfolioResource
    {
        if (! $portfolio->is_active) {
            abort(404);
        }

        return new PortfolioResource($portfolio);
    }
}
