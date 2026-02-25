<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portfolio>
 */
class PortfolioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(2),
            'label' => fake()->randomElement(['Case File', 'Delivery Log', 'Project Brief']),
            'summary' => fake()->sentence(16),
            'result_label' => fake()->randomElement(['Impact', 'Outcome', 'Result']),
            'result_value' => fake()->randomElement(['+140% Growth', '3x Faster Launch', '98% Uptime']),
            'category' => fake()->randomElement(['Web Platform', 'Mobile App', 'Enterprise System']),
            'badge_text' => fake()->randomElement(['TT', 'UI', 'AI', 'DX']),
            'badge_color' => fake()->safeHexColor(),
            'excerpt' => fake()->paragraph(),
            'description' => fake()->paragraphs(4, true),
            'client_name' => fake()->company(),
            'project_url' => fake()->url(),
            'technologies' => fake()->randomElements(['Laravel', 'React', 'Vue', 'Node', 'Postgres', 'AWS'], 3),
            'sort_order' => fake()->numberBetween(0, 10),
            'is_featured' => fake()->boolean(30),
            'is_active' => true,
        ];
    }
}
