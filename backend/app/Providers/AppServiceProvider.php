<?php

namespace App\Providers;

use App\Contracts\Enrichment\EnrichmentProvider;
use App\Contracts\Repositories\BoardGameRepository;
use App\Repositories\EloquentBoardGameRepository;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
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
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute((int) config('security.api_rate_per_minute', 60))
                ->by($request->ip());
        });

        RateLimiter::for('enrichment', function (Request $request) {
            return Limit::perMinute((int) config('security.enrichment_rate_per_minute', 15))
                ->by($request->ip());
        });

        RateLimiter::for('health', function (Request $request) {
            return Limit::perMinute(120)->by($request->ip());
        });
    }
}
