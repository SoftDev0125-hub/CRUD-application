<?php

namespace App\Data;

use Illuminate\Support\Collection;

readonly class BoardGameListResult
{
    /**
     * @param  Collection<int, \App\Models\BoardGame>  $games
     * @param  array{total: int, filtered_by: string}  $meta
     */
    public function __construct(
        public Collection $games,
        public array $meta,
    ) {}
}
