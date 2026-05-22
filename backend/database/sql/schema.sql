-- Tabletop Shelf — board_games schema (reference DDL)
-- Source of truth: Laravel migration 2026_05_22_000001_create_board_games_table.php
-- Apply via: php artisan migrate   OR   run this script on MySQL/MariaDB

CREATE TABLE IF NOT EXISTS board_games (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    designer VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    year_published SMALLINT UNSIGNED NOT NULL,
    min_players TINYINT UNSIGNED NOT NULL,
    max_players TINYINT UNSIGNED NOT NULL,
    play_time_minutes SMALLINT UNSIGNED NOT NULL,
    rating DECIMAL(3, 1) NOT NULL,
    tags JSON NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX board_games_designer_index (designer),
    INDEX board_games_title_index (title),
    INDEX board_games_rating_index (rating),
    INDEX board_games_designer_title_index (designer, title),
    INDEX board_games_year_published_index (year_published)
);
