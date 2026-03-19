<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:clients,name'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:clients,slug'],
            'logo' => ['nullable', 'image', 'max:4096'],
            'description' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A client name is required.',
            'name.unique' => 'This client name is already in use.',
            'slug.unique' => 'This slug is already in use.',
            'logo.image' => 'The client logo must be a valid image file.',
        ];
    }
}
