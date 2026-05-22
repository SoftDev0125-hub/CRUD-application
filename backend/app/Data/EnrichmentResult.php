<?php

namespace App\Data;

readonly class EnrichmentResult
{
    public function __construct(
        public string $title,
        public string $summary,
        public string $wikipedia_url,
        public ?string $thumbnail_url = null,
    ) {}

    /**
     * @return array{title: string, summary: string, wikipedia_url: string, thumbnail_url: string|null}
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'summary' => $this->summary,
            'wikipedia_url' => $this->wikipedia_url,
            'thumbnail_url' => $this->thumbnail_url,
        ];
    }
}
