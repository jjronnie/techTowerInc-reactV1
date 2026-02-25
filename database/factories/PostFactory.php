<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(6),
            'excerpt' => fake()->sentence(20),
            'content' => '<p>'.fake()->paragraphs(4, true).'</p>',
            'status' => 'published',
            'published_at' => now(),
            'reading_time' => fake()->numberBetween(3, 9),
            'categories' => [fake()->randomElement(['Engineering', 'Product', 'Growth'])],
            'tags' => fake()->randomElements(['Laravel', 'React', 'APIs', 'Cloud', 'Security'], 3),
        ];
    }
}
