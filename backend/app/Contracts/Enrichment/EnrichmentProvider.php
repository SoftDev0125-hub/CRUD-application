<?php

namespace App\Contracts\Enrichment;

use App\Data\EnrichmentResult;

interface EnrichmentProvider
{
    public function enrich(string $subject): EnrichmentResult;
}
