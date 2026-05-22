<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        $response->headers->set('X-XSS-Protection', '0');
        $response->headers->remove('X-Powered-By');

        if ($request->is('api/*')) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate');
            $response->headers->set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
        }

        return $response;
    }
}
