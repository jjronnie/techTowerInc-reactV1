<?php

use App\Models\Category;
use App\Models\Client;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\SiteSetting;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    SiteSetting::factory()->create();
});

test('blog routes permanently redirect to news routes', function () {
    $this->get('/blog')
        ->assertStatus(301)
        ->assertRedirect('/news');

    $response = $this->get('/blog/category/cloud?page=2');

    $response
        ->assertStatus(301)
        ->assertRedirect('/news/category/cloud?page=2');
});

test('llms txt is publicly accessible as plain text', function () {
    $response = $this->get('/llms.txt');

    $response
        ->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
        ->assertSeeText('TechTower Innovations')
        ->assertSee('https://techtowerinc.com/services')
        ->assertSee('https://techtowerinc.com/news');
});

test('legacy portfolio routes permanently redirect to project routes', function () {
    $portfolio = Portfolio::factory()->create([
        'slug' => 'legacy-case-study',
        'is_active' => true,
    ]);

    $response = $this->get("/portfolio/{$portfolio->slug}?ref=legacy");

    $response
        ->assertStatus(301)
        ->assertRedirect("/project/{$portfolio->slug}?ref=legacy");
});

test('unknown public routes return a real 404 inertia page', function () {
    $response = $this->get('/this-page-does-not-exist');

    $response
        ->assertStatus(404)
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/not-found')
            ->where('seo.robots', 'noindex, nofollow'));
});

test('public service pages are rendered through inertia public pages', function () {
    $service = Service::factory()->create([
        'title' => 'Custom Software Development',
        'slug' => 'custom-software-development',
        'short_description' => 'We build custom software for growing businesses.',
        'is_active' => true,
    ]);

    $response = $this->get("/services/{$service->slug}");

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', "/services/{$service->slug}")
            ->where('seo.canonical', url("/services/{$service->slug}")));
});

test('portfolio archive page preloads projects for the legacy marketing shell', function () {
    $portfolio = Portfolio::factory()->create([
        'title' => 'Refreshable Portfolio',
        'slug' => 'refreshable-portfolio',
        'is_active' => true,
    ]);

    $response = $this->get('/portfolio');

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', '/portfolio')
            ->where('legacyApiCache./portfolio.data.0.slug', $portfolio->slug));
});

test('home page uses an exact raw seo title without app name suffix', function () {
    $response = $this->get('/');

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('seo.title', 'Website Design in Uganda | SEO Services in Uganda | Website Development')
            ->where('seo.appendAppName', false));
});

test('public pages include the fallback favicon asset in the app shell', function () {
    $this->get('/')
        ->assertOk()
        ->assertSee('href="/favicon.png"', false);
});

test('thin client pages are served with noindex robots', function () {
    $client = Client::factory()->create([
        'name' => 'Thin Client',
        'slug' => 'thin-client',
        'description' => '<p>Short profile.</p>',
    ]);

    $response = $this->get("/clients/{$client->slug}");

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', "/clients/{$client->slug}")
            ->where('seo.robots', 'noindex, follow'));
});

test('weak product pages are served with noindex robots', function () {
    $product = Product::factory()->create([
        'name' => 'Weak Product',
        'slug' => 'weak-product',
        'description' => 'Too short.',
        'purchase_url' => 'https://example.com/buy',
        'is_active' => true,
    ]);

    $response = $this->get("/products/{$product->slug}");

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', "/products/{$product->slug}")
            ->where('seo.robots', 'noindex, follow'));
});

test('privacy policy page has explicit public seo props', function () {
    $response = $this->get('/privacy-policy');

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', '/privacy-policy')
            ->where('seo.canonical', url('/privacy-policy'))
            ->where('seo.title', 'Privacy Policy'));
});

test('paginated news archives keep a page-specific canonical and return pagination data', function () {
    Post::factory()->count(7)->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $response = $this->get('/news?page=2');

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', '/news?page=2')
            ->where('seo.canonical', url('/news?page=2'))
            ->where('legacyApiCache./posts?page=2.meta.current_page', 2)
            ->where('legacyApiCache./posts?page=2.meta.last_page', 2));
});

test('news article pages fall back to the route canonical when the post canonical is null', function () {
    $post = Post::factory()->create([
        'slug' => 'route-canonical-fallback',
        'status' => 'published',
        'published_at' => now()->subDay(),
        'canonical_url' => null,
    ]);

    $response = $this->get("/news/{$post->slug}");

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/legacy')
            ->where('legacyPath', "/news/{$post->slug}")
            ->where('seo.canonical', url("/news/{$post->slug}"))
            ->where("legacyApiCache./posts/{$post->slug}.data.slug", $post->slug));
});

test('empty paginated news archives return a 404', function () {
    Post::factory()->create([
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $this->get('/news?page=99')
        ->assertStatus(404);
});

test('sitemap includes intended public urls and excludes weak product pages', function () {
    $service = Service::factory()->create([
        'slug' => 'website-design',
        'is_active' => true,
    ]);

    $portfolioCategory = Category::factory()->create([
        'slug' => 'web-platforms',
    ]);

    $newsCategory = Category::factory()->create([
        'slug' => 'technology',
    ]);

    $client = Client::factory()->create([
        'name' => 'Indexable Client',
        'slug' => 'indexable-client',
        'description' => '<p>'.str_repeat('Trusted client profile content ', 10).'</p>',
    ]);

    $portfolio = Portfolio::factory()->create([
        'slug' => 'platform-rebuild',
        'client_id' => $client->id,
        'is_active' => true,
    ]);
    $portfolio->categories()->sync([$portfolioCategory->id]);

    $post = Post::factory()->create([
        'slug' => 'software-planning-guide',
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);
    $post->categories()->sync([$newsCategory->id]);

    $strongProduct = Product::factory()->create([
        'slug' => 'ops-console',
        'description' => str_repeat('Detailed product content for buyers. ', 8),
        'purchase_url' => 'https://products.techtowerinc.com/ops-console',
        'is_active' => true,
    ]);

    $weakProduct = Product::factory()->create([
        'slug' => 'placeholder-product',
        'description' => 'Short copy.',
        'purchase_url' => 'https://example.com/placeholder',
        'is_active' => true,
    ]);

    $response = $this->get('/sitemap.xml');

    $response
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml')
        ->assertSee(url('/services'))
        ->assertSee(url("/services/{$service->slug}"))
        ->assertSee(url('/portfolio'))
        ->assertSee(url("/project/{$portfolio->slug}"))
        ->assertSee(url("/portfolio/category/{$portfolioCategory->slug}"))
        ->assertSee(url('/news'))
        ->assertSee(url("/news/{$post->slug}"))
        ->assertSee(url("/news/category/{$newsCategory->slug}"))
        ->assertSee(url("/clients/{$client->slug}"))
        ->assertSee(url("/products/{$strongProduct->slug}"))
        ->assertDontSee(url("/products/{$weakProduct->slug}"));
});
