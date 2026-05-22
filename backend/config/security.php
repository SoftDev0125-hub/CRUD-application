<?php

return [

    'api_rate_per_minute' => (int) env('SECURITY_API_RATE_PER_MINUTE', 60),

    'enrichment_rate_per_minute' => (int) env('SECURITY_ENRICHMENT_RATE_PER_MINUTE', 15),

    'max_search_length' => (int) env('SECURITY_MAX_SEARCH_LENGTH', 100),

    'max_tag_length' => (int) env('SECURITY_MAX_TAG_LENGTH', 50),

    'max_tags_per_game' => (int) env('SECURITY_MAX_TAGS_PER_GAME', 10),

    'max_json_body_kb' => (int) env('SECURITY_MAX_JSON_BODY_KB', 64),

];
