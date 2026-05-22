<?php

namespace Tests\Feature;

use App\Models\BoardGame;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GameApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_lists_games_with_server_side_search_and_nested_sort(): void
    {
        BoardGame::query()->create([
            'title' => 'Brass: Lancashire',
            'designer' => 'Martin Wallace',
            'publisher' => 'Roxley',
            'year_published' => 2007,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 120,
            'rating' => 8.2,
            'tags' => ['economic'],
        ]);

        BoardGame::query()->create([
            'title' => 'Brass: Birmingham',
            'designer' => 'Martin Wallace',
            'publisher' => 'Roxley',
            'year_published' => 2018,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 120,
            'rating' => 8.6,
            'tags' => ['economic'],
        ]);

        BoardGame::query()->create([
            'title' => 'Catan',
            'designer' => 'Klaus Teuber',
            'publisher' => 'Catan Studio',
            'year_published' => 1995,
            'min_players' => 3,
            'max_players' => 4,
            'play_time_minutes' => 90,
            'rating' => 7.1,
            'tags' => ['family'],
        ]);

        $response = $this->getJson('/api/games?search=Brass&sort=designer,title&direction=asc');

        $response->assertOk()
            ->assertJsonPath('meta.filtered_by', 'server')
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.title', 'Brass: Birmingham')
            ->assertJsonPath('data.1.title', 'Brass: Lancashire');
    }

    public function test_creates_updates_and_deletes_a_game(): void
    {
        $payload = [
            'title' => 'Test Game',
            'designer' => 'Jane Designer',
            'publisher' => 'Test Publisher',
            'year_published' => 2024,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 60,
            'rating' => 7.5,
            'tags' => ['family', 'euro'],
        ];

        $create = $this->postJson('/api/games', $payload);
        $create->assertCreated()
            ->assertJsonPath('title', 'Test Game')
            ->assertJsonPath('tags', ['family', 'euro']);

        $id = $create->json('id');
        $this->assertNotNull($id);

        $this->putJson("/api/games/{$id}", array_merge($payload, [
            'title' => 'Updated Game',
            'rating' => 8.0,
        ]))->assertOk()
            ->assertJsonPath('title', 'Updated Game')
            ->assertJsonPath('rating', 8);

        $this->deleteJson("/api/games/{$id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('board_games', ['id' => $id]);
    }

    public function test_filters_by_tag_on_server(): void
    {
        BoardGame::query()->create([
            'title' => 'Wingspan',
            'designer' => 'Elizabeth Hargrave',
            'publisher' => 'Stonemaier Games',
            'year_published' => 2019,
            'min_players' => 1,
            'max_players' => 5,
            'play_time_minutes' => 70,
            'rating' => 8.1,
            'tags' => ['family'],
        ]);

        BoardGame::query()->create([
            'title' => 'Spirit Island',
            'designer' => 'R. D. Kelly',
            'publisher' => 'Greater Than Games',
            'year_published' => 2017,
            'min_players' => 1,
            'max_players' => 4,
            'play_time_minutes' => 120,
            'rating' => 8.4,
            'tags' => ['cooperative'],
        ]);

        $this->getJson('/api/games?tag=family')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Wingspan');
    }
}
