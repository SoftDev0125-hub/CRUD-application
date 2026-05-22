<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\BoardGame */
class BoardGameResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'designer' => $this->designer,
            'publisher' => $this->publisher,
            'year_published' => $this->year_published,
            'min_players' => $this->min_players,
            'max_players' => $this->max_players,
            'play_time_minutes' => $this->play_time_minutes,
            'rating' => (float) $this->rating,
            'tags' => $this->tags ?? [],
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
