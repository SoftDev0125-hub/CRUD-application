<?php

namespace App\Http\Controllers\Api;

use App\Data\BoardGameData;
use App\Data\BoardGameListQuery;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBoardGameRequest;
use App\Http\Requests\UpdateBoardGameRequest;
use App\Http\Resources\BoardGameResource;
use App\Models\BoardGame;
use App\Services\BoardGameService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GameController extends Controller
{
    public function __construct(private readonly BoardGameService $boardGames)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $result = $this->boardGames->list(BoardGameListQuery::fromRequest($request));

        return response()->json([
            'data' => BoardGameResource::collection($result->games)->resolve(),
            'meta' => $result->meta,
        ]);
    }

    public function show(BoardGame $game): JsonResponse
    {
        return response()->json(
            (new BoardGameResource($this->boardGames->find($game)))->resolve()
        );
    }

    public function store(StoreBoardGameRequest $request): JsonResponse
    {
        $game = $this->boardGames->create(
            BoardGameData::fromValidated($request->validated())
        );

        return response()->json(
            (new BoardGameResource($game))->resolve(),
            Response::HTTP_CREATED
        );
    }

    public function update(UpdateBoardGameRequest $request, BoardGame $game): JsonResponse
    {
        $updated = $this->boardGames->update(
            $game,
            BoardGameData::fromValidated($request->validated())
        );

        return response()->json((new BoardGameResource($updated))->resolve());
    }

    public function destroy(BoardGame $game): Response
    {
        $this->boardGames->delete($game);

        return response()->noContent();
    }

    public function enrichment(BoardGame $game): JsonResponse
    {
        return response()->json($this->boardGames->enrich($game)->toArray());
    }
}
