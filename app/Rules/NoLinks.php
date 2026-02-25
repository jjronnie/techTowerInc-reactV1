<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoLinks implements ValidationRule
{
    private const LINK_PATTERN = '/(https?:\/\/|www\.)\S+|\b[a-z0-9.-]+\.[a-z]{2,}(?:\/\S*)?/i';

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === '') {
            return;
        }

        $stringValue = is_string($value) ? $value : (string) $value;

        if (preg_match(self::LINK_PATTERN, $stringValue) === 1) {
            $fail('Links are not allowed in this field.');
        }
    }
}
