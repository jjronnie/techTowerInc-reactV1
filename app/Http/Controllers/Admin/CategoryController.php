<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->withCount(['portfolios', 'posts'])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $category = Category::query()->create($request->validated());

        return redirect()
            ->route('admin.categories.edit', $category)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Category created',
                'message' => "\"{$category->name}\" is ready to use.",
            ]);
    }

    public function show(Category $category): RedirectResponse
    {
        return redirect()->route('admin.categories.edit', $category);
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return redirect()
            ->route('admin.categories.edit', $category)
            ->with('notification', [
                'type' => 'success',
                'title' => 'Category updated',
                'message' => "\"{$category->name}\" has been saved.",
            ]);
    }

    public function destroy(Category $category): RedirectResponse
    {
        $name = $category->name;
        $category->delete();

        return redirect()
            ->route('admin.categories.index')
            ->with('notification', [
                'type' => 'success',
                'title' => 'Category deleted',
                'message' => "\"{$name}\" has been removed.",
            ]);
    }
}
