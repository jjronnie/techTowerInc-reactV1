<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTechnologyRequest;
use App\Http\Requests\Admin\UpdateTechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    public function index(): Response
    {
        $technologies = Technology::query()
            ->withCount('portfolios')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/technologies/index', [
            'technologies' => $technologies,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/technologies/create');
    }

    public function store(StoreTechnologyRequest $request): RedirectResponse
    {
        $technology = Technology::query()->create($request->validated());

        return redirect()
            ->route('admin.technologies.edit', $technology)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Technology created',
                'message' => "\"{$technology->name}\" is ready to use.",
            ]);
    }

    public function show(Technology $technology): RedirectResponse
    {
        return redirect()->route('admin.technologies.edit', $technology);
    }

    public function edit(Technology $technology): Response
    {
        return Inertia::render('admin/technologies/edit', [
            'technology' => $technology,
        ]);
    }

    public function update(UpdateTechnologyRequest $request, Technology $technology): RedirectResponse
    {
        $technology->update($request->validated());

        return redirect()
            ->route('admin.technologies.edit', $technology)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Technology updated',
                'message' => "\"{$technology->name}\" has been saved.",
            ]);
    }

    public function destroy(Technology $technology): RedirectResponse
    {
        $name = $technology->name;
        $technology->delete();

        return redirect()
            ->route('admin.technologies.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Technology deleted',
                'message' => "\"{$name}\" has been removed.",
            ]);
    }
}
