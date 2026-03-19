<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePortfolioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('portfolios', 'slug')->ignore($this->route('portfolio')),
            ],
            'summary' => ['nullable', 'string'],
            'excerpt' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'client_id' => ['nullable', 'integer', 'exists:clients,id'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'category_ids' => ['required', 'array', 'min:1'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'technology_ids' => ['required', 'array', 'min:1'],
            'technology_ids.*' => ['integer', 'exists:technologies,id'],
            'featured_image' => ['nullable', 'image', 'max:4096'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['image', 'max:4096'],
            'existing_gallery_images' => ['nullable', 'array'],
            'existing_gallery_images.*' => ['nullable', 'string'],
            'clear_gallery_images' => ['nullable', 'boolean'],
            'remove_gallery_images' => ['nullable', 'boolean'],
            'started_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:started_at'],
            'sort_order' => ['nullable', 'integer'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
            'og_image' => ['nullable', 'image', 'max:2048'],
            'remove_featured_image' => ['nullable', 'boolean'],
            'remove_og_image' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'A portfolio title is required.',
            'type.required' => 'Add a project type such as website or mobile app.',
            'slug.unique' => 'This slug is already in use.',
            'category_ids.required' => 'Choose at least one category.',
            'category_ids.min' => 'Choose at least one category.',
            'technology_ids.required' => 'Choose at least one technology.',
            'technology_ids.min' => 'Choose at least one technology.',
            'featured_image.image' => 'The featured image must be a valid image file.',
            'gallery_images.*.image' => 'Gallery uploads must be images.',
            'og_image.image' => 'The SEO image must be a valid image file.',
        ];
    }
}
