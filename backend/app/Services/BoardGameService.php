<?php

namespace App\Services;

use App\Contracts\Enrichment\EnrichmentProvider;
use App\Contracts\Repositories\BoardGameRepository;
use App\Data\BoardGameData;
use App\Data\BoardGameListQuery;
use App\Data\BoardGameListResult;
use App\Data\EnrichmentResult;
use App\Models\BoardGame;

class BoardGameService
{
    public function __construct(
        private readonly BoardGameRepository $games,
        private readonly EnrichmentProvider $enrichment,
    ) {}

    public function list(BoardGameListQuery $query): BoardGameListResult
    {
        $games = $this->games->list($query);

        return new BoardGameListResult(
            games: $games,
            meta: [
                'total' => $games->count(),
                'filtered_by' => $query->serverProcessingApplied() ? 'server' : 'client',
            ],
        );
    }

    public function find(BoardGame $game): BoardGame
    {
        return $game;
    }

    public function create(BoardGameData $data): BoardGame
    {
        return $this->games->create($data);
    }

    public function update(BoardGame $game, BoardGameData $data): BoardGame
    {
        return $this->games->update($game, $data);
    }

    public function delete(BoardGame $game): void
    {
        $this->games->delete($game);
    }

    public function enrich(BoardGame $game): EnrichmentResult
    {
        return $this->enrichment->enrich($game->title);
    }
}
