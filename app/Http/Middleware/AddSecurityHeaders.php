<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (app()->environment('production')) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload',
            );
        }

        $path = $request->getPathInfo();
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        $cacheableExtensions = [
            'js' => 'public, max-age=31536000, immutable',
            'css' => 'public, max-age=31536000, immutable',
            'woff2' => 'public, max-age=31536000, immutable',
            'woff' => 'public, max-age=31536000, immutable',
            'png' => 'public, max-age=2592000',
            'jpg' => 'public, max-age=2592000',
            'jpeg' => 'public, max-age=2592000',
            'webp' => 'public, max-age=2592000',
            'avif' => 'public, max-age=2592000',
            'svg' => 'public, max-age=2592000',
            'ico' => 'public, max-age=2592000',
        ];

        if (isset($cacheableExtensions[$extension])) {
            $response->headers->set('Cache-Control', $cacheableExtensions[$extension]);
        }

        return $response;
    }
}
