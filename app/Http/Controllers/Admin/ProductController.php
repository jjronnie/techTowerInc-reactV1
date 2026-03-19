<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('products/images', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image_path'] = $request->file('og_image')->store('products/og-images', 'public');
        }

        unset($data['image'], $data['og_image']);

        $product = Product::query()->create($data);

        return redirect()->route('admin.products.edit', $product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): RedirectResponse
    {
        return redirect()->route('admin.products.edit', $product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        $product->setAttribute(
            'image_url',
            $product->image_path ? Storage::url($product->image_path) : null,
        );
        $product->setAttribute(
            'og_image_url',
            $product->og_image_path ? Storage::url($product->og_image_path) : null,
        );

        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        if ($request->boolean('remove_image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = null;
        }

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products/images', 'public');
        }

        if ($request->boolean('remove_og_image')) {
            if ($product->og_image_path) {
                Storage::disk('public')->delete($product->og_image_path);
            }
            $data['og_image_path'] = null;
        }

        if ($request->hasFile('og_image')) {
            if ($product->og_image_path) {
                Storage::disk('public')->delete($product->og_image_path);
            }
            $data['og_image_path'] = $request->file('og_image')->store('products/og-images', 'public');
        }

        unset($data['image'], $data['og_image'], $data['remove_image'], $data['remove_og_image']);

        $product->update($data);

        return redirect()->route('admin.products.edit', $product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        if ($product->og_image_path) {
            Storage::disk('public')->delete($product->og_image_path);
        }

        $product->delete();

        return redirect()->route('admin.products.index');
    }
}
