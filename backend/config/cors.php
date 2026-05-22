<?php

$origins = env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173');

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    'allowed_origins' => array_values(array_filter(array_map('trim', explode(',', $origins)))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Accept', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 3600,

    'supports_credentials' => false,

];
