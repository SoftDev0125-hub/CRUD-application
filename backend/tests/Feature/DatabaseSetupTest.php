<?php

namespace Tests\Feature;

use App\Models\BoardGame;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseSetupTest extends TestCase
{
    use RefreshDatabase;

    public function test_board_games_table_persists_json_tags(): void
    {
        $game = BoardGame::query()->create([
            'title' => 'Persisted Game',
            'designer' => 'Test Designer',
            'publisher' => 'Test Pub',
            'year_published' => 2024,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 60,
            'rating' => 7.5,
            'tags' => ['family', 'euro'],
        ]);

        $this->assertDatabaseHas('board_games', [
            'id' => $game->id,
            'title' => 'Persisted Game',
        ]);

        $reloaded = BoardGame::query()->findOrFail($game->id);
        $this->assertSame(['family', 'euro'], $reloaded->tags);
    }

    public function test_seeder_populates_board_games(): void
    {
        $this->seed(\Database\Seeders\BoardGameSeeder::class);

        $this->assertDatabaseCount('board_games', 8);
        $this->assertDatabaseHas('board_games', ['title' => 'Catan']);
    }
}
