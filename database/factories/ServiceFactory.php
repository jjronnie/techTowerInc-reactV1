<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $icons = ['globe', 'smartphone', 'database', 'cloud', 'shield', 'code', 'brain', 'cpu'];
        $highlights = fake()->randomElements([
            'Discovery workshop and roadmap alignment',
            'UI/UX design sprints with rapid prototyping',
            'Secure architecture and compliance planning',
            'Scalable backend and API development',
            'Quality assurance and performance tuning',
        ], 3);

        $deliverables = fake()->randomElements([
            'Product requirements and release plan',
            'Design system and component library',
            'Production-ready web or mobile app',
            'Analytics and monitoring dashboards',
            'Handover documentation and training',
        ], 3);

        return [
            'title' => fake()->unique()->sentence(3),
            'short_description' => fake()->sentence(14),
            'description' => fake()->paragraphs(3, true),
            'icon' => fake()->randomElement($icons),
            'highlights' => $highlights,
            'timeline' => fake()->randomElement(['4-6 weeks', '6-10 weeks', '8-12 weeks']),
            'deliverables' => $deliverables,
            'sort_order' => fake()->numberBetween(0, 10),
            'is_active' => true,
        ];
    }
}
