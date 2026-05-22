<?php

namespace App\Queries;

use App\Data\BoardGameListQuery;
use Illuminate\Database\Eloquent\Builder;

class BoardGameListQueryApplier
{
    /**
     * @param  Builder<\App\Models\BoardGame>  $query
     * @return Builder<\App\Models\BoardGame>
     */
    public function apply(Builder $query, BoardGameListQuery $listQuery): Builder
    {
        if ($listQuery->search !== null) {
            $term = '%'.addcslashes($listQuery->search, '%_\\').'%';
            $query->where(function (Builder $q) use ($term) {
                $q->where('title', 'like', $term)
                    ->orWhere('designer', 'like', $term)
                    ->orWhere('publisher', 'like', $term);
            });
        }

        if ($listQuery->tag !== null) {
            $query->whereJsonContains('tags', $listQuery->tag);
        }

        if ($listQuery->sortFields !== []) {
            foreach ($listQuery->sortFields as $field) {
                $query->orderBy($field, $listQuery->direction);
            }
            $query->orderBy('id', $listQuery->direction);
        } else {
            $query->orderByDesc('id');
        }

        return $query;
    }
}
