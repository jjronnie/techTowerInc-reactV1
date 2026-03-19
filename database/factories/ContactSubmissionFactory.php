<?php

namespace Database\Factories;

use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactSubmission>
 */
class ContactSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'company_name' => fake()->boolean(60) ? fake()->company() : null,
            'email' => fake()->safeEmail(),
            'phone' => '+256'.fake()->numberBetween(700000000, 799999999),
            'service_id' => null,
            'other_service_details' => fake()->sentence(),
            'message' => fake()->paragraph(),
        ];
    }
}
