<?php

namespace App\Contracts\Repositories;

use App\Data\BoardGameData;
use App\Data\BoardGameListQuery;
use App\Models\BoardGame;
use Illuminate\Support\Collection;

interface BoardGameRepository
{
    /**
     * @return Collection<int, BoardGame>
     */
    public function list(BoardGameListQuery $query): Collection;

    public function findOrFail(int $id): BoardGame;

    public function create(BoardGameData $data): BoardGame;

    public function update(BoardGame $game, BoardGameData $data): BoardGame;

    public function delete(BoardGame $game): void;
}
