<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PortfolioController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Portfolio::query()
            ->where('is_active', true)
            ->with(['client', 'categories', 'projectTypes', 'technologies']);

        if ($request->has('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        if ($request->boolean('home_showcase')) {
            $query->whereNotNull('home_featured_image_path');
        }

        if ($request->filled('client')) {
            $query->whereHas('client', function ($clientQuery) use ($request): void {
                $clientQuery->where('slug', $request->string('client')->toString());
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('categories', function ($categoryQuery) use ($request): void {
                $categoryQuery->where('slug', $request->string('category')->toString());
            });
        }

        if ($request->filled('type')) {
            $query->whereHas('projectTypes', function ($typeQuery) use ($request): void {
                $typeQuery->where('slug', $request->string('type')->toString());
            });
        }

        if ($request->string('sort')->toString() === 'latest') {
            $query
                ->orderByRaw('coalesce(completed_at, started_at, created_at) desc')
                ->orderByDesc('id');
        } else {
            $query
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->orderBy('title');
        }

        if ($request->boolean('home_showcase')) {
            $query->limit(8);
        }

        $portfolios = $query->get();

        return PortfolioResource::collection($portfolios);
    }

    public function show(Portfolio $portfolio): PortfolioResource
    {
        if (! $portfolio->is_active) {
            abort(404);
        }

        $portfolio->loadMissing(['client', 'categories', 'projectTypes', 'technologies']);

        return new PortfolioResource($portfolio);
    }
}
