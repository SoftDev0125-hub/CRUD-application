<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBoardGameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'designer' => ['required', 'string', 'max:255'],
            'publisher' => ['required', 'string', 'max:255'],
            'year_published' => ['required', 'integer', 'min:1900', 'max:2100'],
            'min_players' => ['required', 'integer', 'min:1', 'max:20'],
            'max_players' => ['required', 'integer', 'min:1', 'max:20', 'gte:min_players'],
            'play_time_minutes' => ['required', 'integer', 'min:1', 'max:600'],
            'rating' => ['required', 'numeric', 'min:1', 'max:10'],
            'tags' => ['required', 'array'],
            'tags.*' => ['string', 'max:50'],
        ];
    }
}
