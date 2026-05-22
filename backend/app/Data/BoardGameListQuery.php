<?php

namespace App\Data;

use Illuminate\Http\Request;

readonly class BoardGameListQuery
{
    private const SORTABLE = [
        'title',
        'designer',
        'publisher',
        'year_published',
        'rating',
        'play_time_minutes',
    ];

    /**
     * @param  list<string>  $sortFields
     */
    public function __construct(
        public ?string $search = null,
        public ?string $tag = null,
        public array $sortFields = [],
        public string $direction = 'asc',
    ) {}

    public static function fromRequest(Request $request): self
    {
        $search = $request->string('search')->trim()->toString();
        $tag = $request->string('tag')->trim()->toString();
        $sortParam = $request->string('sort')->trim()->toString();
        $direction = $request->query('direction', 'asc') === 'desc' ? 'desc' : 'asc';

        $sortFields = $sortParam !== ''
            ? array_values(array_filter(explode(',', $sortParam)))
            : [];

        $sortFields = array_values(array_filter(
            $sortFields,
            fn (string $field) => in_array($field, self::SORTABLE, true)
        ));

        return new self(
            search: $search !== '' ? $search : null,
            tag: $tag !== '' ? $tag : null,
            sortFields: $sortFields,
            direction: $direction,
        );
    }

    public function hasServerFilter(): bool
    {
        return $this->search !== null || $this->tag !== null;
    }

    public function hasServerSort(): bool
    {
        return $this->sortFields !== [];
    }

    public function serverProcessingApplied(): bool
    {
        return $this->hasServerFilter() || $this->hasServerSort();
    }
}
