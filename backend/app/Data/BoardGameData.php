<?php

namespace App\Data;

readonly class BoardGameData
{
    /**
     * @param  list<string>  $tags
     */
    public function __construct(
        public string $title,
        public string $designer,
        public string $publisher,
        public int $year_published,
        public int $min_players,
        public int $max_players,
        public int $play_time_minutes,
        public float $rating,
        public array $tags,
    ) {}

    /**
     * @param  array<string, mixed>  $validated
     */
    public static function fromValidated(array $validated): self
    {
        $tags = array_values(array_map(
            fn (string $tag) => strtolower(trim($tag)),
            $validated['tags'] ?? []
        ));

        return new self(
            title: (string) $validated['title'],
            designer: (string) $validated['designer'],
            publisher: (string) $validated['publisher'],
            year_published: (int) $validated['year_published'],
            min_players: (int) $validated['min_players'],
            max_players: (int) $validated['max_players'],
            play_time_minutes: (int) $validated['play_time_minutes'],
            rating: (float) $validated['rating'],
            tags: $tags,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toAttributes(): array
    {
        return [
            'title' => $this->title,
            'designer' => $this->designer,
            'publisher' => $this->publisher,
            'year_published' => $this->year_published,
            'min_players' => $this->min_players,
            'max_players' => $this->max_players,
            'play_time_minutes' => $this->play_time_minutes,
            'rating' => $this->rating,
            'tags' => $this->tags,
        ];
    }
}
