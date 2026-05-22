<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonApi
{
    /** @var list<string> */
    private const MUTATING = ['POST', 'PUT', 'PATCH'];

    public function handle(Request $request, Closure $next): Response
    {
        if (in_array($request->method(), self::MUTATING, true)) {
            $contentType = strtolower($request->header('Content-Type', ''));

            if (! str_contains($contentType, 'application/json')) {
                return response()->json([
                    'message' => 'Content-Type must be application/json.',
                ], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
            }

            $maxBytes = (int) config('security.max_json_body_kb', 64) * 1024;
            $contentLength = (int) $request->server('CONTENT_LENGTH', 0);

            if ($contentLength > $maxBytes) {
                return response()->json([
                    'message' => 'Request body too large.',
                ], Response::HTTP_REQUEST_ENTITY_TOO_LARGE);
            }
        }

        return $next($request);
    }
}
