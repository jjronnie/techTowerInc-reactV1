<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectTypeRequest;
use App\Http\Requests\Admin\UpdateProjectTypeRequest;
use App\Models\ProjectType;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectTypeController extends Controller
{
    public function index(): Response
    {
        $projectTypes = ProjectType::query()
            ->withCount('portfolios')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/project-types/index', [
            'projectTypes' => $projectTypes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/project-types/create');
    }

    public function store(StoreProjectTypeRequest $request): RedirectResponse
    {
        $projectType = ProjectType::query()->create($request->validated());

        return redirect()
            ->route('admin.project-types.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Project type created',
                'message' => "\"{$projectType->name}\" is ready to use.",
            ]);
    }

    public function show(ProjectType $projectType): RedirectResponse
    {
        return redirect()->route('admin.project-types.edit', $projectType);
    }

    public function edit(ProjectType $projectType): Response
    {
        return Inertia::render('admin/project-types/edit', [
            'projectType' => $projectType,
        ]);
    }

    public function update(UpdateProjectTypeRequest $request, ProjectType $projectType): RedirectResponse
    {
        $projectType->update($request->validated());

        return redirect()
            ->route('admin.project-types.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Project type updated',
                'message' => "\"{$projectType->name}\" has been saved.",
            ]);
    }

    public function destroy(ProjectType $projectType): RedirectResponse
    {
        $name = $projectType->name;
        $projectType->delete();

        return redirect()
            ->route('admin.project-types.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Project type deleted',
                'message' => "\"{$name}\" has been removed.",
            ]);
    }
}
