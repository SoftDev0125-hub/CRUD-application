<?php

namespace Database\Seeders;

use App\Models\BoardGame;
use Illuminate\Database\Seeder;

class BoardGameSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'title' => 'Brass: Birmingham',
                'designer' => 'Martin Wallace',
                'publisher' => 'Roxley',
                'year_published' => 2018,
                'min_players' => 2,
                'max_players' => 4,
                'play_time_minutes' => 120,
                'rating' => 8.6,
                'tags' => ['economic', 'heavy'],
            ],
            [
                'title' => 'Catan',
                'designer' => 'Klaus Teuber',
                'publisher' => 'Catan Studio',
                'year_published' => 1995,
                'min_players' => 3,
                'max_players' => 4,
                'play_time_minutes' => 90,
                'rating' => 7.1,
                'tags' => ['family', 'trading'],
            ],
            [
                'title' => 'Cascadia',
                'designer' => 'Randy Flynn',
                'publisher' => 'Flatout Games',
                'year_published' => 2021,
                'min_players' => 1,
                'max_players' => 4,
                'play_time_minutes' => 45,
                'rating' => 7.9,
                'tags' => ['family', 'tile-placement'],
            ],
            [
                'title' => 'Dune: Imperium',
                'designer' => 'Paul Dennen',
                'publisher' => 'Dire Wolf',
                'year_published' => 2020,
                'min_players' => 1,
                'max_players' => 4,
                'play_time_minutes' => 90,
                'rating' => 8.2,
                'tags' => ['deck-building', 'worker-placement'],
            ],
            [
                'title' => 'Everdell',
                'designer' => 'James A. Wilson',
                'publisher' => 'Starling Games',
                'year_published' => 2018,
                'min_players' => 1,
                'max_players' => 4,
                'play_time_minutes' => 80,
                'rating' => 8.0,
                'tags' => ['worker-placement', 'family'],
            ],
            [
                'title' => 'Spirit Island',
                'designer' => 'R. D. Kelly',
                'publisher' => 'Greater Than Games',
                'year_published' => 2017,
                'min_players' => 1,
                'max_players' => 4,
                'play_time_minutes' => 120,
                'rating' => 8.4,
                'tags' => ['cooperative', 'heavy'],
            ],
            [
                'title' => 'Wingspan',
                'designer' => 'Elizabeth Hargrave',
                'publisher' => 'Stonemaier Games',
                'year_published' => 2019,
                'min_players' => 1,
                'max_players' => 5,
                'play_time_minutes' => 70,
                'rating' => 8.1,
                'tags' => ['engine-building', 'family'],
            ],
            [
                'title' => 'Azul',
                'designer' => 'Michael Kiesling',
                'publisher' => 'Plan B Games',
                'year_published' => 2017,
                'min_players' => 2,
                'max_players' => 4,
                'play_time_minutes' => 45,
                'rating' => 7.8,
                'tags' => ['abstract', 'family'],
            ],
        ];

        foreach ($games as $game) {
            BoardGame::query()->create($game);
        }
    }
}
