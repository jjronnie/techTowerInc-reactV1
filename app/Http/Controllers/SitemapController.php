<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $staticPages = [
            ['loc' => url('/'), 'lastmod' => null],
            ['loc' => url('/services'), 'lastmod' => null],
            ['loc' => url('/portfolio'), 'lastmod' => null],
            ['loc' => url('/products'), 'lastmod' => null],
            ['loc' => url('/news'), 'lastmod' => null],
            ['loc' => url('/about'), 'lastmod' => null],
            ['loc' => url('/contact'), 'lastmod' => null],
            ['loc' => url('/privacy-policy'), 'lastmod' => null],
        ];

        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Service $service) => [
                'loc' => url("/services/{$service->slug}"),
                'lastmod' => $service->updated_at?->toAtomString(),
            ]);

        $portfolios = Portfolio::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Portfolio $portfolio) => [
                'loc' => url("/portfolio/{$portfolio->slug}"),
                'lastmod' => $portfolio->updated_at?->toAtomString(),
            ]);

        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Product $product) => [
                'loc' => url("/products/{$product->slug}"),
                'lastmod' => $product->updated_at?->toAtomString(),
            ]);

        $posts = Post::query()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (Post $post) => [
                'loc' => url("/news/{$post->slug}"),
                'lastmod' => $post->updated_at?->toAtomString(),
            ]);

        $entries = collect($staticPages)
            ->merge($services)
            ->merge($portfolios)
            ->merge($products)
            ->merge($posts);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($entries as $entry) {
            $xml .= '<url>';
            $xml .= '<loc>'.htmlspecialchars($entry['loc'], ENT_XML1).'</loc>';
            if (! empty($entry['lastmod'])) {
                $xml .= '<lastmod>'.$entry['lastmod'].'</lastmod>';
            }
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }

    public function robots(): Response
    {
        $lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /admin',
            'Disallow: /dashboard',
            'Disallow: /settings',
            'Disallow: /login',
            'Disallow: /forgot-password',
            'Disallow: /reset-password',
            'Disallow: /two-factor-challenge',
            'Disallow: /user/confirm-password',
            'Disallow: /email/verification',
            'Sitemap: '.url('/sitemap.xml'),
        ];

        return response(implode("\n", $lines), 200)->header('Content-Type', 'text/plain');
    }
}
