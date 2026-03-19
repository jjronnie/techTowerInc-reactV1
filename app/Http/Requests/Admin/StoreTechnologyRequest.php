<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTechnologyRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'unique:technologies,name'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:technologies,slug'],
            'icon_name' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'A technology name is required.',
            'name.unique' => 'This technology name is already in use.',
            'slug.unique' => 'This slug is already in use.',
            'icon_name.required' => 'An icon name is required.',
        ];
    }
}
