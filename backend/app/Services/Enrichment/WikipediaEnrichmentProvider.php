<?php

namespace App\Services\Enrichment;

use App\Contracts\Enrichment\EnrichmentProvider;
use App\Data\EnrichmentResult;
use Illuminate\Support\Facades\Http;

class WikipediaEnrichmentProvider implements EnrichmentProvider
{
    private const SUMMARY_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

    private const SEARCH_URL = 'https://en.wikipedia.org/w/api.php';

    public function enrich(string $subject): EnrichmentResult
    {
        $subject = mb_substr(trim($subject), 0, 255);

        if ($subject === '') {
            return $this->fallback('Unknown');
        }

        $pageTitle = $this->resolvePageTitle($subject);

        $response = Http::timeout(8)
            ->withHeaders(['User-Agent' => $this->userAgent()])
            ->get(self::SUMMARY_URL.urlencode(str_replace(' ', '_', $pageTitle)));

        if ($response->failed()) {
            return $this->fallback($subject);
        }

        /** @var array<string, mixed> $data */
        $data = $response->json();

        return new EnrichmentResult(
            title: (string) ($data['title'] ?? $subject),
            summary: (string) ($data['extract'] ?? 'No summary available from Wikipedia.'),
            wikipedia_url: (string) ($data['content_urls']['desktop']['page']
                ?? 'https://en.wikipedia.org/wiki/Special:Search?search='.urlencode($subject)),
            thumbnail_url: isset($data['thumbnail']['source'])
                ? (string) $data['thumbnail']['source']
                : null,
        );
    }

    private function resolvePageTitle(string $subject): string
    {
        $response = Http::timeout(6)
            ->withHeaders(['User-Agent' => $this->userAgent()])
            ->get(self::SUMMARY_URL.urlencode(str_replace(' ', '_', $subject)));

        if ($response->successful()) {
            $title = $response->json('title');

            return is_string($title) ? $title : $subject;
        }

        $searchResponse = Http::timeout(8)
            ->withHeaders(['User-Agent' => $this->userAgent()])
            ->get(self::SEARCH_URL, [
                'action' => 'query',
                'list' => 'search',
                'srsearch' => $subject.' board game',
                'format' => 'json',
                'srlimit' => 1,
            ]);

        if ($searchResponse->successful()) {
            $hits = $searchResponse->json('query.search');
            if (is_array($hits) && isset($hits[0]['title']) && is_string($hits[0]['title'])) {
                return $hits[0]['title'];
            }
        }

        return $subject;
    }

    private function fallback(string $subject): EnrichmentResult
    {
        return new EnrichmentResult(
            title: $subject,
            summary: 'Wikipedia could not be reached for this title. Try the search link below.',
            wikipedia_url: 'https://en.wikipedia.org/wiki/Special:Search?search='.urlencode($subject),
            thumbnail_url: null,
        );
    }

    private function userAgent(): string
    {
        return (string) config('enrichment.user_agent', 'TabletopShelf/1.0');
    }
}
