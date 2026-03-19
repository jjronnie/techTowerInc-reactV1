<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('clients', 'name')->ignore($this->route('client')),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('clients', 'slug')->ignore($this->route('client')),
            ],
            'logo' => ['nullable', 'image', 'max:4096'],
            'remove_logo' => ['nullable', 'boolean'],
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
