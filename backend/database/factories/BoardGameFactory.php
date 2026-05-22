<?php

namespace Database\Factories;

use App\Models\BoardGame;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BoardGame>
 */
class BoardGameFactory extends Factory
{
    protected $model = BoardGame::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $min = fake()->numberBetween(1, 4);
        $max = fake()->numberBetween($min, 6);

        return [
            'title' => fake()->unique()->words(3, true),
            'designer' => fake()->name(),
            'publisher' => fake()->company(),
            'year_published' => fake()->numberBetween(1990, (int) date('Y')),
            'min_players' => $min,
            'max_players' => $max,
            'play_time_minutes' => fake()->randomElement([30, 45, 60, 90, 120]),
            'rating' => fake()->randomFloat(1, 6, 9.5),
            'tags' => fake()->randomElements(
                ['family', 'euro', 'heavy', 'cooperative', 'deck-building', 'abstract'],
                fake()->numberBetween(1, 3)
            ),
        ];
    }
}
