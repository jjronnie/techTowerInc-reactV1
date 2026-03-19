<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortfolioRequest;
use App\Http\Requests\Admin\UpdatePortfolioRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\ProjectTypeResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\ProjectType;
use App\Models\Technology;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
            ->with([
                'client:id,name,slug',
                'categories:id,name,slug',
                'projectTypes:id,name,slug',
            ])
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
        return Inertia::render('admin/portfolios/create', $this->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePortfolioRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $typeIds = $data['type_ids'];
        $categoryIds = $data['category_ids'];
        $technologyIds = $data['technology_ids'];
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('featured_image')) {
            $data['featured_image_path'] = $request->file('featured_image')->store('portfolios/featured', 'public');
        }

        if ($request->hasFile('home_featured_image')) {
            $data['home_featured_image_path'] = $request->file('home_featured_image')->store('portfolios/home-featured', 'public');
        }

        if ($request->hasFile('gallery_images')) {
            $data['gallery_images'] = collect($request->file('gallery_images'))
                ->map(fn ($file) => $file->store('portfolios/gallery', 'public'))
                ->all();
        } else {
            unset($data['gallery_images']);
        }

        if ($request->hasFile('og_image')) {
            $data['og_image_path'] = $request->file('og_image')->store('portfolios/og-images', 'public');
        }

        unset(
            $data['type_ids'],
            $data['category_ids'],
            $data['technology_ids'],
            $data['featured_image'],
            $data['home_featured_image'],
            $data['og_image'],
        );

        $portfolio = Portfolio::query()->create($data);
        $portfolio->projectTypes()->sync($typeIds);
        $portfolio->categories()->sync($categoryIds);
        $portfolio->technologies()->sync($technologyIds);

        return redirect()
            ->route('admin.portfolios.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Portfolio created',
                'message' => "\"{$portfolio->title}\" has been added to your portfolio list.",
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
        $portfolio->loadMissing(['categories', 'client', 'projectTypes', 'technologies']);

        $portfolio->setAttribute(
            'featured_image_url',
            $this->fileUrl($portfolio->featured_image_path),
        );
        $portfolio->setAttribute(
            'home_featured_image_url',
            $this->fileUrl($portfolio->home_featured_image_path),
        );
        $portfolio->setAttribute(
            'og_image_url',
            $this->fileUrl($portfolio->og_image_path),
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
        $portfolio->setAttribute('started_at', optional($portfolio->started_at)->toDateString());
        $portfolio->setAttribute('completed_at', optional($portfolio->completed_at)->toDateString());
        $portfolio->setAttribute('type_ids', $portfolio->projectTypes->pluck('id')->all());
        $portfolio->setAttribute('category_ids', $portfolio->categories->pluck('id')->all());
        $portfolio->setAttribute('technology_ids', $portfolio->technologies->pluck('id')->all());
        $portfolio->setAttribute('client_id', $portfolio->client?->id);

        return Inertia::render('admin/portfolios/edit', [
            'portfolio' => $portfolio,
            ...$this->formOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio): RedirectResponse
    {
        $data = $request->validated();
        $typeIds = $data['type_ids'];
        $categoryIds = $data['category_ids'];
        $technologyIds = $data['technology_ids'];
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');

        if ($request->boolean('remove_featured_image')) {
            $this->deletePublicFile($portfolio->featured_image_path);
            $data['featured_image_path'] = null;
        }

        if ($request->hasFile('featured_image')) {
            $this->deletePublicFile($portfolio->featured_image_path);
            $data['featured_image_path'] = $request->file('featured_image')->store('portfolios/featured', 'public');
        }

        if ($request->boolean('remove_home_featured_image')) {
            $this->deletePublicFile($portfolio->home_featured_image_path);
            $data['home_featured_image_path'] = null;
        }

        if ($request->hasFile('home_featured_image')) {
            $this->deletePublicFile($portfolio->home_featured_image_path);
            $data['home_featured_image_path'] = $request->file('home_featured_image')->store('portfolios/home-featured', 'public');
        }

        $currentGallery = collect($portfolio->gallery_images ?? []);
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
        } else {
            $removedGallery = $currentGallery->diff($existingGallery);

            foreach ($removedGallery as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $gallery = $existingGallery->merge($newGallery)->values()->all();
        $data['gallery_images'] = $gallery;

        if ($request->boolean('remove_og_image')) {
            $this->deletePublicFile($portfolio->og_image_path);
            $data['og_image_path'] = null;
        }

        if ($request->hasFile('og_image')) {
            $this->deletePublicFile($portfolio->og_image_path);
            $data['og_image_path'] = $request->file('og_image')->store('portfolios/og-images', 'public');
        }

        unset(
            $data['type_ids'],
            $data['category_ids'],
            $data['technology_ids'],
            $data['featured_image'],
            $data['home_featured_image'],
            $data['og_image'],
            $data['existing_gallery_images'],
            $data['clear_gallery_images'],
            $data['remove_featured_image'],
            $data['remove_home_featured_image'],
            $data['remove_og_image'],
            $data['remove_gallery_images']
        );

        $portfolio->update($data);
        $portfolio->projectTypes()->sync($typeIds);
        $portfolio->categories()->sync($categoryIds);
        $portfolio->technologies()->sync($technologyIds);

        return redirect()
            ->route('admin.portfolios.index')
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
        $this->deletePublicFile($portfolio->featured_image_path);
        $this->deletePublicFile($portfolio->home_featured_image_path);
        $this->deletePublicFile($portfolio->og_image_path);

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

    /**
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function formOptions(): array
    {
        return [
            'projectTypes' => ProjectTypeResource::collection(
                ProjectType::query()->orderBy('name')->get(),
            )->resolve(),
            'categories' => CategoryResource::collection(
                Category::query()->orderBy('name')->get(),
            )->resolve(),
            'clients' => ClientResource::collection(
                Client::query()->orderBy('name')->get(),
            )->resolve(),
            'technologies' => TechnologyResource::collection(
                Technology::query()->orderBy('name')->get(),
            )->resolve(),
        ];
    }

    private function fileUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return Storage::url($path);
    }

    private function deletePublicFile(?string $path): void
    {
        if (! $path || Str::startsWith($path, ['http://', 'https://'])) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
