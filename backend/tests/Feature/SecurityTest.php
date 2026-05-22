<?php

namespace Tests\Feature;

use App\Models\BoardGame;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        RateLimiter::clear('api');
        RateLimiter::clear('enrichment');
    }

    public function test_api_responses_include_security_headers(): void
    {
        $response = $this->getJson('/api/games');

        $response->assertOk();
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-Frame-Options', 'DENY');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    public function test_mutating_requests_require_json_content_type(): void
    {
        $response = $this->call(
            'POST',
            '/api/games',
            [],
            [],
            [],
            ['CONTENT_TYPE' => 'text/plain'],
            json_encode(['title' => 'Hack'])
        );

        $response->assertStatus(415);
    }

    public function test_api_rate_limit_returns_429(): void
    {
        config(['security.api_rate_per_minute' => 2]);

        $this->getJson('/api/games')->assertOk();
        $this->getJson('/api/games')->assertOk();
        $this->getJson('/api/games')->assertStatus(429);
    }

    public function test_rejects_tags_with_invalid_characters(): void
    {
        $response = $this->postJson('/api/games', [
            'title' => 'Safe Title',
            'designer' => 'Designer',
            'publisher' => 'Publisher',
            'year_published' => 2024,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 60,
            'rating' => 7,
            'tags' => ['<script>alert(1)</script>'],
        ]);

        $response->assertStatus(422);
    }

    public function test_rejects_titles_with_html_like_content(): void
    {
        $response = $this->postJson('/api/games', [
            'title' => '<script>xss</script>',
            'designer' => 'Designer',
            'publisher' => 'Publisher',
            'year_published' => 2024,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 60,
            'rating' => 7,
            'tags' => ['family'],
        ]);

        $response->assertStatus(422);
    }

    public function test_oversized_search_query_is_handled_safely(): void
    {
        BoardGame::query()->create([
            'title' => 'Findable',
            'designer' => 'A',
            'publisher' => 'B',
            'year_published' => 2020,
            'min_players' => 2,
            'max_players' => 4,
            'play_time_minutes' => 60,
            'rating' => 7,
            'tags' => ['family'],
        ]);

        $this->getJson('/api/games?search='.urlencode(str_repeat('x', 500)))
            ->assertOk();

        $this->getJson('/api/games?search=Findable')
            ->assertOk()
            ->assertJsonCount(1, 'data');
    }
}
