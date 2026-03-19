<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $services = Service::query()
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('og_image')) {
            $data['og_image_path'] = $request->file('og_image')->store('services/og-images', 'public');
        }

        unset($data['og_image']);

        $service = Service::query()->create($data);

        return redirect()
            ->route('admin.services.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Service created',
                'message' => "\"{$service->title}\" is now available in the service list.",
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): RedirectResponse
    {
        return redirect()->route('admin.services.edit', $service);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service): Response
    {
        $service->setAttribute(
            'og_image_url',
            $service->og_image_path ? Storage::url($service->og_image_path) : null,
        );

        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        if ($request->boolean('remove_og_image')) {
            if ($service->og_image_path) {
                Storage::disk('public')->delete($service->og_image_path);
            }
            $data['og_image_path'] = null;
        }

        if ($request->hasFile('og_image')) {
            if ($service->og_image_path) {
                Storage::disk('public')->delete($service->og_image_path);
            }
            $data['og_image_path'] = $request->file('og_image')->store('services/og-images', 'public');
        }

        unset($data['og_image'], $data['remove_og_image']);

        $service->update($data);

        return redirect()
            ->route('admin.services.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Service updated',
                'message' => "\"{$service->title}\" has been saved.",
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service): RedirectResponse
    {
        if ($service->og_image_path) {
            Storage::disk('public')->delete($service->og_image_path);
        }

        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Service deleted',
                'message' => 'The service has been removed.',
            ]);
    }
}
