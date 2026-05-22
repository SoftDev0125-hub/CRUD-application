<?php

namespace App\Http\Requests;

use App\Support\InputSanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
        $maxTags = (int) config('security.max_tags_per_game', 10);

        return [
            'title' => ['required', 'string', 'max:255', 'regex:/^[^<>]*$/u'],
            'designer' => ['required', 'string', 'max:255', 'regex:/^[^<>]*$/u'],
            'publisher' => ['required', 'string', 'max:255', 'regex:/^[^<>]*$/u'],
            'year_published' => ['required', 'integer', 'min:1900', 'max:2100'],
            'min_players' => ['required', 'integer', 'min:1', 'max:20'],
            'max_players' => ['required', 'integer', 'min:1', 'max:20', 'gte:min_players'],
            'play_time_minutes' => ['required', 'integer', 'min:1', 'max:600'],
            'rating' => ['required', 'numeric', 'min:1', 'max:10'],
            'tags' => ['required', 'array', 'min:1', "max:{$maxTags}"],
            'tags.*' => ['string', 'max:50', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            foreach (['title', 'designer', 'publisher'] as $field) {
                $value = $this->input($field);
                if (is_string($value) && InputSanitizer::stripControlChars($value) !== $value) {
                    $validator->errors()->add($field, 'Invalid characters in '.$field.'.');
                }
            }
        });
    }
}
