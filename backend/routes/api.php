<?php

use App\Http\Controllers\Api\GameController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

Route::get('/health', function (): JsonResponse {
    return response()->json([
        'status' => 'ok',
        'message' => 'Laravel API is running',
    ]);
});

Route::get('/games/{game}/enrichment', [GameController::class, 'enrichment']);
Route::apiResource('games', GameController::class);
