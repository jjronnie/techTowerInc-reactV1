<?php

namespace App\Support;

class HtmlSanitizer
{
    /**
     * @var list<string>
     */
    private const ALLOWED_TAGS = [
        '<p>',
        '<br>',
        '<b>',
        '<strong>',
        '<i>',
        '<em>',
        '<u>',
        '<ul>',
        '<ol>',
        '<li>',
        '<a>',
        '<h2>',
        '<h3>',
        '<h4>',
        '<blockquote>',
        '<pre>',
        '<code>',
        '<img>',
    ];

    private function __construct()
    {
    }

    public static function clean(?string $html): ?string
    {
        if ($html === null || $html === '') {
            return $html;
        }

        $clean = strip_tags($html, implode('', self::ALLOWED_TAGS));

        $clean = preg_replace('/\\son\\w+\\s*=\\s*("|\').*?\\1/i', '', $clean) ?? $clean;
        $clean = preg_replace('/javascript\\s*:/i', '', $clean) ?? $clean;

        return $clean;
    }
}
