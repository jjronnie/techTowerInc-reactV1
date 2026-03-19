<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectTypeRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'unique:project_types,name'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:project_types,slug'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'A project type name is required.',
            'name.unique' => 'This project type already exists.',
            'slug.unique' => 'This slug is already in use.',
        ];
    }
}
