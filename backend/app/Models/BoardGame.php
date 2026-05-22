<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardGame extends Model
{
    /** @use HasFactory<\Database\Factories\BoardGameFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'designer',
        'publisher',
        'year_published',
        'min_players',
        'max_players',
        'play_time_minutes',
        'rating',
        'tags',
    ];

    protected function casts(): array
    {
        return [
            'year_published' => 'integer',
            'min_players' => 'integer',
            'max_players' => 'integer',
            'play_time_minutes' => 'integer',
            'rating' => 'float',
            'tags' => 'array',
        ];
    }
}
