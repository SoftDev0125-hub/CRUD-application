<?php

namespace App\Providers;

use App\Contracts\Enrichment\EnrichmentProvider;
use App\Contracts\Repositories\BoardGameRepository;
use App\Repositories\EloquentBoardGameRepository;
use Illuminate\Support\ServiceProvider;
use InvalidArgumentException;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register application bindings (swap implementations here for extension).
     */
    public function register(): void
    {
        $this->app->bind(BoardGameRepository::class, EloquentBoardGameRepository::class);

        $this->app->bind(EnrichmentProvider::class, function ($app) {
            $name = config('enrichment.default', 'wikipedia');
            $class = config("enrichment.providers.{$name}");

            if (! is_string($class) || ! class_exists($class)) {
                throw new InvalidArgumentException("Unknown enrichment provider: {$name}");
            }

            return $app->make($class);
        });
    }

    public function boot(): void
    {
        //
    }
}
