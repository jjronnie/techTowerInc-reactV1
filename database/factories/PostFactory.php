<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
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
            'tags' => fake()->randomElements(['Laravel', 'React', 'APIs', 'Cloud', 'Security'], 3),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Post $post): void {
            $post->categories()->sync(
                Category::factory()->count(1)->create()->pluck('id'),
            );
        });
    }
}
