<?php

use App\Services\Enrichment\WikipediaEnrichmentProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Default enrichment provider
    |--------------------------------------------------------------------------
    |
    | Swap the implementation by changing ENRICHMENT_PROVIDER in .env and
    | registering a new class below (must implement EnrichmentProvider).
    |
    */

    'default' => env('ENRICHMENT_PROVIDER', 'wikipedia'),

    'user_agent' => env('ENRICHMENT_USER_AGENT', 'TabletopShelf/1.0 (CRUD trial app)'),

    'providers' => [
        'wikipedia' => WikipediaEnrichmentProvider::class,
    ],

];
