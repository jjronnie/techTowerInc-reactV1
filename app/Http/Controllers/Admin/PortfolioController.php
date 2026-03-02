<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Models\Portfolio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $portfolios = Portfolio::query()
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return Inertia::render('admin/portfolios/index', [
            'portfolios' => $portfolios,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/portfolios/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePortfolioRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('featured_image')) {
            $data['featured_image_path'] = $request->file('featured_image')->store('portfolios/featured', 'public');
        }

        if ($request->hasFile('gallery_images')) {
            $data['gallery_images'] = collect($request->file('gallery_images'))
                ->map(fn ($file) => $file->store('portfolios/gallery', 'public'))
                ->all();
        }

        if ($request->hasFile('og_image')) {
            $data['og_image_path'] = $request->file('og_image')->store('portfolios/og-images', 'public');
        }

        unset($data['featured_image'], $data['gallery_images'], $data['og_image']);

        $portfolio = Portfolio::query()->create($data);

        return redirect()
            ->route('admin.portfolios.edit', $portfolio)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Portfolio created',
                'message' => "\"{$portfolio->title}\" is ready to edit.",
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio): RedirectResponse
    {
        return redirect()->route('admin.portfolios.edit', $portfolio);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Portfolio $portfolio): Response
    {
        $portfolio->setAttribute(
            'featured_image_url',
            $portfolio->featured_image_path ? Storage::url($portfolio->featured_image_path) : null,
        );
        $portfolio->setAttribute(
            'og_image_url',
            $portfolio->og_image_path ? Storage::url($portfolio->og_image_path) : null,
        );
        $portfolio->setAttribute(
            'gallery_image_urls',
            collect($portfolio->gallery_images ?? [])
                ->map(fn (string $path): array => [
                    'path' => $path,
                    'url' => Storage::url($path),
                ])
                ->all(),
        );

        return Inertia::render('admin/portfolios/edit', [
            'portfolio' => $portfolio,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio): RedirectResponse
    {
        $data = $request->validated();
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');

        if ($request->boolean('remove_featured_image')) {
            if ($portfolio->featured_image_path) {
                Storage::disk('public')->delete($portfolio->featured_image_path);
            }
            $data['featured_image_path'] = null;
        }

        if ($request->hasFile('featured_image')) {
            if ($portfolio->featured_image_path) {
                Storage::disk('public')->delete($portfolio->featured_image_path);
            }
            $data['featured_image_path'] = $request->file('featured_image')->store('portfolios/featured', 'public');
        }

        $existingGallery = collect($request->input('existing_gallery_images', []))
            ->filter()
            ->values();

        $newGallery = collect();
        if ($request->hasFile('gallery_images')) {
            $newGallery = collect($request->file('gallery_images'))
                ->map(fn ($file) => $file->store('portfolios/gallery', 'public'));
        }

        if ($request->boolean('clear_gallery_images')) {
            $existingGallery = collect();
        }

        if ($request->boolean('remove_gallery_images')) {
            $existingGallery = collect();
        }

        if ($request->boolean('clear_gallery_images') || $request->boolean('remove_gallery_images')) {
            foreach ($portfolio->gallery_images ?? [] as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $gallery = $existingGallery->merge($newGallery)->values()->all();
        $data['gallery_images'] = $gallery;

        if ($request->boolean('remove_og_image')) {
            if ($portfolio->og_image_path) {
                Storage::disk('public')->delete($portfolio->og_image_path);
            }
            $data['og_image_path'] = null;
        }

        if ($request->hasFile('og_image')) {
            if ($portfolio->og_image_path) {
                Storage::disk('public')->delete($portfolio->og_image_path);
            }
            $data['og_image_path'] = $request->file('og_image')->store('portfolios/og-images', 'public');
        }

        unset(
            $data['featured_image'],
            $data['gallery_images'],
            $data['og_image'],
            $data['existing_gallery_images'],
            $data['clear_gallery_images'],
            $data['remove_featured_image'],
            $data['remove_og_image'],
            $data['remove_gallery_images']
        );

        $portfolio->update($data);

        return redirect()
            ->route('admin.portfolios.edit', $portfolio)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Portfolio updated',
                'message' => "Changes to \"{$portfolio->title}\" have been saved.",
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio): RedirectResponse
    {
        if ($portfolio->featured_image_path) {
            Storage::disk('public')->delete($portfolio->featured_image_path);
        }

        if ($portfolio->og_image_path) {
            Storage::disk('public')->delete($portfolio->og_image_path);
        }

        foreach ($portfolio->gallery_images ?? [] as $path) {
            Storage::disk('public')->delete($path);
        }

        $portfolio->delete();

        return redirect()
            ->route('admin.portfolios.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Portfolio deleted',
                'message' => 'The portfolio item has been removed.',
            ]);
    }
}
