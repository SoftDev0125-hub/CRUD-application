<?php

namespace App\Support;

class InputSanitizer
{
    public static function clampString(?string $value, int $maxLength): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        $trimmed = trim($value);

        if ($trimmed === '') {
            return null;
        }

        return mb_substr($trimmed, 0, $maxLength);
    }

    public static function stripControlChars(string $value): string
    {
        return (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    }
}
