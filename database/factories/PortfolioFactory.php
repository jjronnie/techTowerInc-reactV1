<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\ProjectType;
use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Portfolio>
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
            'summary' => fake()->sentence(16),
            'excerpt' => fake()->paragraph(),
            'description' => fake()->paragraphs(4, true),
            'client_id' => Client::factory(),
            'project_url' => fake()->url(),
            'home_featured_image_path' => null,
            'sort_order' => fake()->numberBetween(0, 10),
            'is_featured' => fake()->boolean(30),
            'is_active' => true,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Portfolio $portfolio): void {
            $portfolio->categories()->sync(
                Category::factory()->count(2)->create()->pluck('id'),
            );
            $portfolio->projectTypes()->sync(
                ProjectType::factory()->count(2)->create()->pluck('id'),
            );
            $portfolio->technologies()->sync(
                Technology::factory()->count(3)->create()->pluck('id'),
            );
        });
    }
}
