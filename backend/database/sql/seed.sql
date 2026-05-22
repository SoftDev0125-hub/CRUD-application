-- Sample data for board_games (matches BoardGameSeeder)
-- MySQL / MariaDB. For SQLite use: php artisan db:seed

INSERT INTO board_games (
    title, designer, publisher, year_published,
    min_players, max_players, play_time_minutes, rating, tags,
    created_at, updated_at
) VALUES
('Brass: Birmingham', 'Martin Wallace', 'Roxley', 2018, 2, 4, 120, 8.6, '["economic","heavy"]', NOW(), NOW()),
('Catan', 'Klaus Teuber', 'Catan Studio', 1995, 3, 4, 90, 7.1, '["family","trading"]', NOW(), NOW()),
('Cascadia', 'Randy Flynn', 'Flatout Games', 2021, 1, 4, 45, 7.9, '["family","tile-placement"]', NOW(), NOW()),
('Dune: Imperium', 'Paul Dennen', 'Dire Wolf', 2020, 1, 4, 90, 8.2, '["deck-building","worker-placement"]', NOW(), NOW()),
('Everdell', 'James A. Wilson', 'Starling Games', 2018, 1, 4, 80, 8.0, '["worker-placement","family"]', NOW(), NOW()),
('Spirit Island', 'R. D. Kelly', 'Greater Than Games', 2017, 1, 4, 120, 8.4, '["cooperative","heavy"]', NOW(), NOW()),
('Wingspan', 'Elizabeth Hargrave', 'Stonemaier Games', 2019, 1, 5, 70, 8.1, '["engine-building","family"]', NOW(), NOW()),
('Azul', 'Michael Kiesling', 'Plan B Games', 2017, 2, 4, 45, 7.8, '["abstract","family"]', NOW(), NOW());
