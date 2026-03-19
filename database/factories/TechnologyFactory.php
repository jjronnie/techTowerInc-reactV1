<?php

namespace Database\Factories;

use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Technology>
 */
class TechnologyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true),
            'icon_name' => fake()->randomElement([
                'laravel',
                'react',
                'typescript',
                'postgresql',
                'docker',
                'aws',
                'figma',
            ]),
        ];
    }
}
