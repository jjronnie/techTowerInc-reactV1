<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\SiteSettingResource;
use App\Http\Resources\TeamMemberResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Technology;
use App\Support\PublicIndexability;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PublicPageController extends Controller
{
    private ?SiteSetting $siteSettingsModel = null;

    public function home(Request $request): HttpResponse
    {
        $servicesData = ServiceResource::collection(
            Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        )->resolve();

        $featuredProjectsData = PortfolioResource::collection(
            Portfolio::query()
                ->where('is_active', true)
                ->where('is_featured', true)
                ->whereNotNull('home_featured_image_path')
                ->with(['client', 'categories', 'projectTypes', 'technologies'])
                ->orderBy('sort_order')
                ->orderBy('title')
                ->limit(8)
                ->get(),
        )->resolve();

        $technologiesData = TechnologyResource::collection(
            Technology::query()->orderBy('name')->get(),
        )->resolve();

        $settings = $this->siteSettings();
        $faqSchema = $this->faqSchema(data_get($settings, 'home_faqs.items', []));

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                '/services' => ['data' => $servicesData],
                '/portfolio?featured=1&home_showcase=1' => ['data' => $featuredProjectsData],
                '/technologies' => ['data' => $technologiesData],
            ],
            'seo' => $this->seo($request, [
                'title' => 'Website Design & SEO Services in Uganda | TechTower',
                'description' => data_get(
                    $settings,
                    'default_seo_description',
                    'TechTower builds websites, software platforms, and digital systems for businesses in Uganda.',
                ),
                'canonical' => url('/'),
                'keywords' => 'software development company Uganda, tech company Kampala, digital solutions Uganda',
                'appendAppName' => false,
                'structuredData' => array_values(array_filter([
                    $this->organizationSchema('Organization'),
                    $this->websiteSchema(),
                    $faqSchema,
                ])),
            ]),
        ]);
    }

    public function about(Request $request): HttpResponse
    {
        $settings = $this->siteSettings();
        $teamMembersData = TeamMemberResource::collection(
            TeamMember::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        )->resolve();

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                '/team-members' => ['data' => $teamMembersData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($settings, 'about_header.headline', 'About'),
                'description' => data_get($settings, 'about_header.subheadline'),
                'canonical' => url('/about'),
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'About', 'url' => url('/about')],
                    ]),
                ],
            ]),
        ]);
    }

    public function servicesIndex(Request $request): HttpResponse
    {
        $settings = $this->siteSettings();
        $servicesData = ServiceResource::collection(
            Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        )->resolve();

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                '/services' => ['data' => $servicesData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($settings, 'services_page.header_title', 'Software Development Services'),
                'description' => data_get($settings, 'services_page.header_subtitle'),
                'canonical' => url('/services'),
                'keywords' => 'software development services Uganda, web development services, digital solutions',
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Services', 'url' => url('/services')],
                    ]),
                ],
            ]),
        ]);
    }

    public function serviceShow(Request $request, Service $service): HttpResponse
    {
        if (! $service->is_active) {
            return $this->notFound($request);
        }

        $settings = $this->siteSettings();
        $serviceData = (new ServiceResource($service))->resolve();
        $featuredProjectsData = PortfolioResource::collection(
            Portfolio::query()
                ->where('is_active', true)
                ->where('is_featured', true)
                ->with(['client', 'categories', 'projectTypes', 'technologies'])
                ->orderByRaw('coalesce(completed_at, started_at, created_at) desc')
                ->orderByDesc('id')
                ->limit(6)
                ->get(),
        )->resolve();
        $latestPostsData = PostResource::collection(
            $this->publishedPostsQuery()
                ->with(['author', 'categories'])
                ->orderByDesc('published_at')
                ->limit(6)
                ->get(),
        )->resolve();

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                "/services/{$service->slug}" => ['data' => $serviceData],
                '/portfolio?featured=1&sort=latest' => ['data' => $featuredProjectsData],
                '/posts?per_page=6' => ['data' => $latestPostsData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($serviceData, 'seo.title', $service->title),
                'description' => data_get($serviceData, 'seo.description', $this->cleanText($service->short_description ?: $service->description)),
                'canonical' => url("/services/{$service->slug}"),
                'keywords' => data_get($serviceData, 'seo.keywords'),
                'image' => $this->absoluteUrl(data_get($serviceData, 'seo.og_image_url')),
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->serviceSchema($serviceData, url("/services/{$service->slug}"), $settings),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Services', 'url' => url('/services')],
                        ['name' => $service->title, 'url' => url("/services/{$service->slug}")],
                    ]),
                ],
            ]),
        ]);
    }

    public function portfolioIndex(Request $request): HttpResponse
    {
        return $this->renderPortfolioArchive($request, null);
    }

    public function portfolioCategory(Request $request, Category $category): HttpResponse
    {
        return $this->renderPortfolioArchive($request, $category);
    }

    public function projectShow(Request $request, Portfolio $portfolio): HttpResponse
    {
        if (! $portfolio->is_active) {
            return $this->notFound($request);
        }

        $portfolio->loadMissing(['client', 'categories', 'projectTypes', 'technologies']);
        $project = (new PortfolioResource($portfolio))->resolve();
        $client = $portfolio->client;

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                "/portfolio/{$portfolio->slug}" => ['data' => $project],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($project, 'seo.title', $portfolio->title),
                'description' => data_get($project, 'seo.description', $this->cleanText($portfolio->summary ?: $portfolio->excerpt ?: $portfolio->description)),
                'canonical' => url("/project/{$portfolio->slug}"),
                'keywords' => data_get($project, 'seo.keywords'),
                'image' => $this->absoluteUrl(data_get($project, 'seo.og_image_url') ?: data_get($project, 'featured_image_url')),
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Portfolio', 'url' => url('/portfolio')],
                        ['name' => $portfolio->title, 'url' => url("/project/{$portfolio->slug}")],
                    ]),
                ],
            ]),
        ]);
    }

    public function clientShow(Request $request, Client $client): HttpResponse
    {
        $client->loadCount([
            'portfolios' => fn ($query) => $query->where('is_active', true),
        ])->load([
            'portfolios' => fn ($query) => $query
                ->where('is_active', true)
                ->with(['client', 'categories', 'projectTypes', 'technologies'])
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->orderBy('title'),
        ]);

        $indexable = PublicIndexability::client($client);
        $clientData = (new ClientResource($client))->resolve();

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                "/clients/{$client->slug}" => ['data' => $clientData],
            ],
            'seo' => $this->seo($request, [
                'title' => $client->name,
                'description' => $this->cleanText($client->description ?: "{$client->name} projects and partnership profile."),
                'canonical' => url("/clients/{$client->slug}"),
                'image' => $this->absoluteUrl($clientData['logo_url'] ?? null),
                'robots' => $indexable ? null : 'noindex, follow',
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Portfolio', 'url' => url('/portfolio')],
                        ['name' => $client->name, 'url' => url("/clients/{$client->slug}")],
                    ]),
                ],
            ]),
        ]);
    }

    public function productsIndex(Request $request): HttpResponse
    {
        $settings = $this->siteSettings();
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        $productList = ProductResource::collection($products)->resolve();
        $indexableProductsCount = $products->filter(fn (Product $product) => PublicIndexability::product($product))->count();
        $indexable = $indexableProductsCount > 0;

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                '/products' => ['data' => $productList],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($settings, 'products_page.header_title', 'Products'),
                'description' => data_get($settings, 'products_page.header_subtitle'),
                'canonical' => url('/products'),
                'robots' => $indexable ? null : 'noindex, follow',
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Products', 'url' => url('/products')],
                    ]),
                ],
            ]),
        ]);
    }

    public function productShow(Request $request, Product $product): HttpResponse
    {
        if (! $product->is_active) {
            return $this->notFound($request);
        }

        $productData = (new ProductResource($product))->resolve();
        $indexable = PublicIndexability::product($product);

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                "/products/{$product->slug}" => ['data' => $productData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($productData, 'seo.title', $product->name),
                'description' => data_get($productData, 'seo.description', $this->cleanText($product->short_description ?: $product->description)),
                'canonical' => url("/products/{$product->slug}"),
                'keywords' => data_get($productData, 'seo.keywords'),
                'image' => $this->absoluteUrl(data_get($productData, 'seo.og_image_url') ?: data_get($productData, 'image_url')),
                'robots' => $indexable ? null : 'noindex, follow',
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Products', 'url' => url('/products')],
                        ['name' => $product->name, 'url' => url("/products/{$product->slug}")],
                    ]),
                ],
            ]),
        ]);
    }

    public function newsIndex(Request $request): HttpResponse
    {
        return $this->renderNewsArchive($request, null);
    }

    public function newsCategory(Request $request, Category $category): HttpResponse
    {
        return $this->renderNewsArchive($request, $category);
    }

    public function newsShow(Request $request, Post $post): HttpResponse
    {
        if ($post->status !== 'published' || ! $post->published_at || $post->published_at->isFuture()) {
            return $this->notFound($request);
        }

        $post->loadMissing(['author', 'categories']);
        $postData = (new PostResource($post))->resolve();
        $servicesData = ServiceResource::collection(
            Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        )->resolve();
        $featuredProjectsData = PortfolioResource::collection(
            Portfolio::query()
                ->where('is_active', true)
                ->where('is_featured', true)
                ->with(['client', 'categories', 'projectTypes', 'technologies'])
                ->orderByRaw('coalesce(completed_at, started_at, created_at) desc')
                ->orderByDesc('id')
                ->limit(6)
                ->get(),
        )->resolve();
        $canonicalUrl = data_get($postData, 'seo.canonical_url') ?: url("/news/{$post->slug}");

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                "/posts/{$post->slug}" => ['data' => $postData],
                '/services' => ['data' => $servicesData],
                '/portfolio?featured=1&sort=latest' => ['data' => $featuredProjectsData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($postData, 'seo.title', $post->title),
                'description' => data_get($postData, 'seo.description', $this->cleanText($post->excerpt)),
                'canonical' => $canonicalUrl,
                'keywords' => data_get($postData, 'seo.keywords'),
                'image' => $this->absoluteUrl(data_get($postData, 'seo.og_image_url') ?: data_get($postData, 'featured_image_url')),
                'robots' => data_get($postData, 'seo.robots'),
                'type' => 'article',
                'publishedTime' => optional($post->published_at)->toIso8601String(),
                'modifiedTime' => optional($post->updated_at)->toIso8601String(),
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->articleSchema($post, $canonicalUrl),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'News', 'url' => url('/news')],
                        ['name' => $post->title, 'url' => $canonicalUrl],
                    ]),
                ],
            ]),
        ]);
    }

    public function contact(Request $request): HttpResponse
    {
        $settings = $this->siteSettings();
        $servicesData = ServiceResource::collection(
            Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        )->resolve();

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                '/services' => ['data' => $servicesData],
            ],
            'seo' => $this->seo($request, [
                'title' => data_get($settings, 'contact_header.headline', 'Contact'),
                'description' => data_get($settings, 'contact_header.subheadline'),
                'canonical' => url('/contact'),
                'keywords' => 'contact TechTower, software development inquiry Uganda, get a quote',
                'structuredData' => [
                    $this->organizationSchema('LocalBusiness'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Contact', 'url' => url('/contact')],
                    ]),
                ],
            ]),
        ]);
    }

    public function privacy(Request $request): HttpResponse
    {
        return $this->renderLegacyPage($request, [
            'seo' => $this->seo($request, [
                'title' => 'Privacy Policy',
                'description' => 'Learn how TechTower Innovations collects, uses, and protects personal information.',
                'canonical' => url('/privacy-policy'),
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Privacy Policy', 'url' => url('/privacy-policy')],
                    ]),
                ],
            ]),
        ]);
    }

    public function notFound(Request $request): HttpResponse
    {
        return $this->renderPage($request, 'public/not-found', [
            'seo' => $this->seo($request, [
                'title' => 'Page Not Found',
                'description' => 'The page you requested could not be found.',
                'canonical' => $request->fullUrl(),
                'robots' => 'noindex, nofollow',
            ]),
        ], 404);
    }

    private function renderPortfolioArchive(Request $request, ?Category $category): HttpResponse
    {
        $settings = $this->siteSettings();
        $projectsQuery = Portfolio::query()
            ->where('is_active', true)
            ->with(['client', 'categories', 'projectTypes', 'technologies']);

        if ($category) {
            $projectsQuery->whereHas('categories', function ($query) use ($category): void {
                $query->whereKey($category->getKey());
            });
        }

        $projects = $projectsQuery
            ->orderByDesc('is_featured')
            ->orderByRaw('coalesce(completed_at, started_at, created_at) desc')
            ->orderByDesc('id')
            ->get();

        if ($category && $projects->isEmpty()) {
            return $this->notFound($request);
        }

        $projectsData = PortfolioResource::collection($projects)->resolve();
        $apiPath = $category
            ? "/portfolio?category={$category->slug}"
            : '/portfolio';

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                $apiPath => ['data' => $projectsData],
            ],
            'seo' => $this->seo($request, [
                'title' => $category
                    ? "{$category->name} Case Studies"
                    : data_get($settings, 'portfolio_page.header_title', 'Portfolio'),
                'description' => $category
                    ? "Explore {$category->name} projects and case studies from TechTower."
                    : data_get($settings, 'portfolio_page.header_subtitle'),
                'canonical' => $category
                    ? url("/portfolio/category/{$category->slug}")
                    : url('/portfolio'),
                'keywords' => $category ? "{$category->name} case studies, software portfolio" : 'software portfolio, case studies, web development portfolio',
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema(array_values(array_filter([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'Portfolio', 'url' => url('/portfolio')],
                        $category ? ['name' => $category->name, 'url' => url("/portfolio/category/{$category->slug}")] : null,
                    ]))),
                ],
            ]),
        ]);
    }

    private function renderNewsArchive(Request $request, ?Category $category): HttpResponse
    {
        $settings = $this->siteSettings();
        $currentPage = max(1, (int) $request->query('page', 1));
        $postsQuery = $this->publishedPostsQuery()->with(['author', 'categories']);

        if ($category) {
            $postsQuery->whereHas('categories', function ($query) use ($category): void {
                $query->whereKey($category->getKey());
            });
        }

        $posts = $postsQuery
            ->orderByDesc('published_at')
            ->paginate(6)
            ->withQueryString();

        if (($category || $currentPage > 1) && $posts->isEmpty()) {
            return $this->notFound($request);
        }

        /** @var array{data: array<int, array<string, mixed>>, links?: mixed, meta?: mixed} $postsPayload */
        $postsPayload = PostResource::collection($posts)->response()->getData(true);
        $query = array_filter([
            'category' => $category?->slug,
            'page' => $currentPage > 1 ? $currentPage : null,
        ]);
        $apiPath = '/posts'.($query === [] ? '' : '?'.http_build_query($query));
        $canonicalUrl = $currentPage > 1
            ? $request->fullUrl()
            : ($category
                ? url("/news/category/{$category->slug}")
                : url('/news'));

        return $this->renderLegacyPage($request, [
            'legacyApiCache' => [
                $apiPath => $postsPayload,
            ],
            'seo' => $this->seo($request, [
                'title' => $category
                    ? "{$category->name} News & Articles"
                    : data_get($settings, 'blog_page.header_title', 'Tech News & Insights | TechTower'),
                'description' => $category
                    ? "Read {$category->name} articles and updates from TechTower."
                    : data_get($settings, 'blog_page.header_subtitle'),
                'canonical' => $canonicalUrl,
                'structuredData' => [
                    $this->organizationSchema('Organization'),
                    $this->breadcrumbSchema(array_values(array_filter([
                        ['name' => 'Home', 'url' => url('/')],
                        ['name' => 'News', 'url' => url('/news')],
                        $category ? ['name' => $category->name, 'url' => url("/news/category/{$category->slug}")] : null,
                    ]))),
                ],
            ]),
        ]);
    }

    private function renderPage(Request $request, string $component, array $props = [], int $status = 200): HttpResponse
    {
        $response = Inertia::render($component, array_merge([
            'siteSettings' => $this->siteSettings(),
        ], $props))->toResponse($request);

        $response->setStatusCode($status);

        return $response;
    }

    private function renderLegacyPage(Request $request, array $props = [], int $status = 200): HttpResponse
    {
        return $this->renderPage($request, 'public/legacy', array_merge([
            'legacyApiCache' => [],
            'legacyPath' => $request->getRequestUri(),
        ], $props), $status);
    }

    private function seo(Request $request, array $overrides = []): array
    {
        $settings = $this->siteSettings();

        return array_merge([
            'title' => data_get($settings, 'default_seo_title', data_get($settings, 'site_name', 'TechTower')),
            'description' => data_get($settings, 'default_seo_description'),
            'canonical' => $request->fullUrl(),
            'robots' => 'index, follow, max-image-preview:large',
            'keywords' => null,
            'image' => $this->absoluteUrl(data_get($settings, 'default_og_image_url')),
            'type' => 'website',
            'appendAppName' => true,
            'publishedTime' => null,
            'modifiedTime' => null,
            'structuredData' => [],
        ], array_filter($overrides, fn ($value) => $value !== null));
    }

    private function siteSettings(): array
    {
        return SiteSettingResource::make($this->siteSettingsModel())->resolve();
    }

    private function siteSettingsModel(): SiteSetting
    {
        return $this->siteSettingsModel ??= SiteSetting::query()->firstOrFail();
    }

    private function cleanText(?string $value, int $limit = 180): string
    {
        $clean = trim(preg_replace('/\s+/', ' ', strip_tags((string) $value)) ?? '');

        return Str::limit($clean, $limit, '...');
    }

    private function absoluteUrl(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (Str::startsWith($value, ['http://', 'https://'])) {
            return $value;
        }

        return url($value);
    }

    private function organizationSchema(string $type = 'Organization'): array
    {
        $settings = $this->siteSettings();
        $sameAs = collect(data_get($settings, 'social_links', []))
            ->pluck('href')
            ->filter()
            ->values()
            ->all();

        return array_filter([
            '@context' => 'https://schema.org',
            '@type' => $type,
            'name' => data_get($settings, 'site_name'),
            'url' => url('/'),
            'logo' => $this->absoluteUrl(data_get($settings, 'logo_url')),
            'image' => $this->absoluteUrl(data_get($settings, 'default_og_image_url') ?: data_get($settings, 'logo_url')),
            'email' => data_get($settings, 'company_email'),
            'telephone' => data_get($settings, 'company_phone'),
            'address' => data_get($settings, 'company_address'),
            'sameAs' => $sameAs === [] ? null : $sameAs,
        ], fn ($value) => $value !== null && $value !== '');
    }

    private function websiteSchema(): array
    {
        $settings = $this->siteSettings();

        return array_filter([
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => data_get($settings, 'site_name'),
            'url' => url('/'),
            'description' => data_get($settings, 'default_seo_description'),
        ], fn ($value) => $value !== null && $value !== '');
    }

    private function faqSchema(array $items): ?array
    {
        $questions = collect($items)
            ->map(function (mixed $item): ?array {
                $question = data_get($item, 'question');
                $answer = data_get($item, 'answer', data_get($item, 'text'));

                if (! is_string($question) || ! is_string($answer) || $question === '' || $answer === '') {
                    return null;
                }

                return [
                    '@type' => 'Question',
                    'name' => $question,
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $answer,
                    ],
                ];
            })
            ->filter()
            ->values()
            ->all();

        if ($questions === []) {
            return null;
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $questions,
        ];
    }

    private function breadcrumbSchema(array $items): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => array_map(
                fn (array $item, int $index): array => [
                    '@type' => 'ListItem',
                    'position' => $index + 1,
                    'name' => $item['name'],
                    'item' => $item['url'],
                ],
                $items,
                array_keys($items),
            ),
        ];
    }

    private function serviceSchema(array $service, string $canonicalUrl, array $settings): array
    {
        return array_filter([
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => data_get($service, 'title'),
            'description' => data_get($service, 'short_description') ?: data_get($service, 'description'),
            'provider' => [
                '@type' => 'Organization',
                'name' => data_get($settings, 'site_name'),
                'url' => url('/'),
            ],
            'serviceType' => data_get($service, 'title'),
            'areaServed' => 'Uganda',
            'url' => $canonicalUrl,
        ], fn ($value) => $value !== null && $value !== '');
    }

    private function articleSchema(Post $post, string $canonicalUrl): array
    {
        $settings = $this->siteSettings();

        return array_filter([
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $post->title,
            'description' => $post->excerpt,
            'datePublished' => optional($post->published_at)->toIso8601String(),
            'dateModified' => optional($post->updated_at)->toIso8601String(),
            'author' => [
                '@type' => 'Person',
                'name' => $post->author?->name ?: data_get($settings, 'site_name'),
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => data_get($settings, 'site_name'),
                'logo' => array_filter([
                    '@type' => 'ImageObject',
                    'url' => $this->absoluteUrl(data_get($settings, 'logo_url')),
                ]),
            ],
            'image' => $this->absoluteUrl($post->og_image_path ? asset("storage/{$post->og_image_path}") : ($post->featured_image_path ? asset("storage/{$post->featured_image_path}") : null)),
            'mainEntityOfPage' => $canonicalUrl,
        ], fn ($value) => $value !== null && $value !== '');
    }

    private function publishedPostsQuery(): Builder
    {
        return Post::query()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
