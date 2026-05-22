<?php

namespace App\Repositories;

use App\Contracts\Repositories\BoardGameRepository;
use App\Data\BoardGameData;
use App\Data\BoardGameListQuery;
use App\Models\BoardGame;
use App\Queries\BoardGameListQueryApplier;
use Illuminate\Support\Collection;

class EloquentBoardGameRepository implements BoardGameRepository
{
    public function __construct(
        private readonly BoardGameListQueryApplier $queryApplier,
    ) {}

    /**
     * @return Collection<int, BoardGame>
     */
    public function list(BoardGameListQuery $query): Collection
    {
        $builder = BoardGame::query();

        return $this->queryApplier->apply($builder, $query)->get();
    }

    public function findOrFail(int $id): BoardGame
    {
        return BoardGame::query()->findOrFail($id);
    }

    public function create(BoardGameData $data): BoardGame
    {
        return BoardGame::query()->create($data->toAttributes());
    }

    public function update(BoardGame $game, BoardGameData $data): BoardGame
    {
        $game->update($data->toAttributes());

        return $game->fresh();
    }

    public function delete(BoardGame $game): void
    {
        $game->delete();
    }
}
