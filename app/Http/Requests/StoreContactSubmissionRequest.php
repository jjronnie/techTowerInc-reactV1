<?php

namespace App\Http\Requests;

use App\Rules\NoLinks;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactSubmissionRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:150', new NoLinks],
            'company_name' => ['nullable', 'string', 'max:150', new NoLinks],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^\\+\\d{7,15}$/', new NoLinks],
            'service_id' => ['nullable', 'integer', 'exists:services,id', 'required_without:other_service_details'],
            'other_service_details' => ['nullable', 'string', 'max:2000', new NoLinks, 'required_without:service_id'],
            'message' => ['required', 'string', 'max:5000', new NoLinks],
            'company_website' => ['nullable', 'string', 'max:255'],
            'contact_time' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your name.',
            'email.required' => 'Please provide your email address.',
            'email.email' => 'Please provide a valid email address.',
            'phone.required' => 'Please provide a phone or WhatsApp number.',
            'phone.regex' => 'Phone number must start with a country code, for example +256.',
            'service_id.required_without' => 'Please select a service or choose Other.',
            'other_service_details.required_without' => 'Please provide details for the service you need.',
            'message.required' => 'Please tell us about your project.',
        ];
    }
}
