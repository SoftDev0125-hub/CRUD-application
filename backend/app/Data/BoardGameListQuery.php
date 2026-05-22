<?php

namespace App\Data;

use App\Support\InputSanitizer;
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
        $search = InputSanitizer::clampString(
            $request->string('search')->toString(),
            (int) config('security.max_search_length', 100)
        );
        $tag = InputSanitizer::clampString(
            $request->string('tag')->toString(),
            (int) config('security.max_tag_length', 50)
        );
        $sortParam = InputSanitizer::clampString($request->string('sort')->toString(), 80) ?? '';
        $direction = $request->query('direction', 'asc') === 'desc' ? 'desc' : 'asc';

        $sortFields = $sortParam !== ''
            ? array_values(array_filter(explode(',', $sortParam)))
            : [];

        $sortFields = array_values(array_filter(
            $sortFields,
            fn (string $field) => in_array($field, self::SORTABLE, true)
        ));

        $sortFields = array_slice($sortFields, 0, 3);

        return new self(
            search: $search,
            tag: $tag,
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
