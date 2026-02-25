<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForcePasswordChange
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $user->force_password_change) {
            return $next($request);
        }

        $routeName = $request->route()?->getName();

        if ($routeName !== null) {
            if (in_array($routeName, ['user-password.edit', 'user-password.update', 'logout'], true)) {
                return $next($request);
            }
        }

        return redirect()->route('user-password.edit');
    }
}
