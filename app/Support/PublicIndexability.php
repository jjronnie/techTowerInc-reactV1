<?php

namespace App\Support;

use App\Models\Client;
use App\Models\Product;

class PublicIndexability
{
    public static function client(Client $client): bool
    {
        $description = trim(strip_tags((string) $client->description));
        $projectsCount = (int) ($client->projects_count ?? $client->portfolios_count ?? 0);

        return $projectsCount > 0 && mb_strlen($description) >= 140;
    }

    public static function product(Product $product): bool
    {
        $summary = trim(strip_tags((string) ($product->description ?: $product->short_description)));
        $host = parse_url((string) $product->purchase_url, PHP_URL_HOST);

        if (! $product->is_active || mb_strlen($summary) < 160) {
            return false;
        }

        if (! is_string($host) || $host === '') {
            return false;
        }

        return ! in_array(strtolower($host), ['example.com', 'www.example.com'], true);
    }
}
