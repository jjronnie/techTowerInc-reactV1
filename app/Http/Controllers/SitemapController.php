<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Support\PublicIndexability;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $indexableProducts = Product::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->filter(fn (Product $product): bool => PublicIndexability::product($product));

        $staticPages = [
            ['loc' => url('/'), 'lastmod' => null, 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['loc' => url('/services'), 'lastmod' => null, 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => url('/portfolio'), 'lastmod' => null, 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['loc' => url('/news'), 'lastmod' => null, 'priority' => '0.7', 'changefreq' => 'weekly'],
            ['loc' => url('/about'), 'lastmod' => null, 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['loc' => url('/contact'), 'lastmod' => null, 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['loc' => url('/privacy-policy'), 'lastmod' => null, 'priority' => '0.3', 'changefreq' => 'yearly'],
        ];

        if ($indexableProducts->isNotEmpty()) {
            $staticPages[] = ['loc' => url('/products'), 'lastmod' => null, 'priority' => '0.6', 'changefreq' => 'monthly'];
        }

        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Service $service) => [
                'loc' => url("/services/{$service->slug}"),
                'lastmod' => $service->updated_at?->toAtomString(),
                'priority' => '0.7',
                'changefreq' => 'monthly',
            ]);

        $portfolios = Portfolio::query()
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Portfolio $portfolio) => [
                'loc' => url("/project/{$portfolio->slug}"),
                'lastmod' => $portfolio->updated_at?->toAtomString(),
                'priority' => '0.7',
                'changefreq' => 'monthly',
            ]);

        $products = $indexableProducts
            ->map(fn (Product $product) => [
                'loc' => url("/products/{$product->slug}"),
                'lastmod' => $product->updated_at?->toAtomString(),
                'priority' => '0.6',
                'changefreq' => 'monthly',
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
                'priority' => '0.6',
                'changefreq' => 'monthly',
            ]);

        $clients = Client::query()
            ->withCount([
                'portfolios as projects_count' => fn ($query) => $query->where('is_active', true),
            ])
            ->orderBy('updated_at', 'desc')
            ->get()
            ->filter(fn (Client $client): bool => PublicIndexability::client($client))
            ->map(fn (Client $client) => [
                'loc' => url("/clients/{$client->slug}"),
                'lastmod' => $client->updated_at?->toAtomString(),
                'priority' => '0.5',
                'changefreq' => 'monthly',
            ]);

        $portfolioCategories = Category::query()
            ->whereHas('portfolios', fn ($query) => $query->where('is_active', true))
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Category $category) => [
                'loc' => url("/portfolio/category/{$category->slug}"),
                'lastmod' => $category->updated_at?->toAtomString(),
                'priority' => '0.5',
                'changefreq' => 'weekly',
            ]);

        $postCategories = Category::query()
            ->whereHas('posts', function ($query): void {
                $query
                    ->where('status', 'published')
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
            })
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Category $category) => [
                'loc' => url("/news/category/{$category->slug}"),
                'lastmod' => $category->updated_at?->toAtomString(),
                'priority' => '0.5',
                'changefreq' => 'weekly',
            ]);

        $entries = collect($staticPages)
            ->merge($services)
            ->merge($portfolios)
            ->merge($products)
            ->merge($clients)
            ->merge($portfolioCategories)
            ->merge($postCategories)
            ->merge($posts);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($entries as $entry) {
            $xml .= '<url>';
            $xml .= '<loc>'.htmlspecialchars($entry['loc'], ENT_XML1).'</loc>';
            if (! empty($entry['lastmod'])) {
                $xml .= '<lastmod>'.$entry['lastmod'].'</lastmod>';
            }
            if (! empty($entry['changefreq'])) {
                $xml .= '<changefreq>'.$entry['changefreq'].'</changefreq>';
            }
            if (! empty($entry['priority'])) {
                $xml .= '<priority>'.$entry['priority'].'</priority>';
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
