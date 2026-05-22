# CRUD Application

Full-stack project: **React + TypeScript** (frontend), **Laravel** (backend API), **SQL** (database via SQLite locally, or MySQL/MariaDB in production).

## Project structure

```
CRUD-application/
├── frontend/     # React 19 + TypeScript + Vite
├── backend/      # Laravel 13 (PHP 8.3+)
├── composer.phar # Composer (PHP dependency manager)
└── composer.bat  # Run Composer on Windows: composer.bat install
```

## Prerequisites

| Tool | Version | Notes |
|------|---------|--------|
| Node.js | 20+ | For the React frontend |
| PHP | 8.3+ | With `pdo_sqlite` (default) or `pdo_mysql` |
| Composer | 2.x | Use `composer.bat` in the project root |

### PHP extensions

For the default **SQLite** setup, enable in `php.ini`:

```ini
extension=pdo_sqlite
extension=sqlite3
```

For **MySQL** instead, use `pdo_mysql` and update `backend/.env` (see [Database](#database)).

## Quick start

### 1. Backend (Laravel)

```powershell
cd backend

# From project root you can also run: ..\composer.bat install
php ..\composer.phar install

# .env already exists; ensure APP_KEY is set:
php artisan key:generate

# Create DB file if missing (SQLite):
# New-Item -ItemType File -Path database\database.sqlite -Force

php artisan db:setup
php artisan serve
```

API runs at **http://127.0.0.1:8000**. Health check: **http://127.0.0.1:8000/api/health**.

### 2. Frontend (React + TypeScript)

In a second terminal:

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

App runs at **http://localhost:5173**. Requests to `/api/*` are proxied to Laravel (see `frontend/vite.config.ts`).

## Database (SQL)

Persistent storage in **`board_games`** — not in-memory. Default engine: **SQLite** (`backend/database/database.sqlite`).

### Schema: `board_games`

| Column | Type | Notes |
|--------|------|--------|
| `id` | bigint | Primary key |
| `title` | string | Game name |
| `designer` | string | Indexed (nested sort) |
| `publisher` | string | |
| `year_published` | smallint | |
| `min_players` / `max_players` | tinyint | |
| `play_time_minutes` | smallint | |
| `rating` | decimal(3,1) | 1.0–10.0 |
| `tags` | JSON | e.g. `["family","euro"]` — filter with `whereJsonContains` |
| `created_at` / `updated_at` | timestamp | |

Reference DDL: `backend/database/sql/schema.sql` · Sample INSERTs: `backend/database/sql/seed.sql`

### Setup (recommended)

```powershell
cd backend
php artisan db:setup          # migrate + seed (creates .sqlite if missing)
php artisan db:setup --fresh  # drop all tables, re-migrate, re-seed
```

Or manually: `php artisan migrate` then `php artisan db:seed`

### SQLite (default)

`backend/.env`:

```env
DB_CONNECTION=sqlite
```

### MySQL / MariaDB (optional)

1. Create database `crud_app` and run `backend/database/sql/schema.sql` (or `php artisan migrate`).
2. In `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_app
DB_USERNAME=root
DB_PASSWORD=your_password
```

3. `php artisan db:seed` or import `backend/database/sql/seed.sql`.

## Development commands

| Location | Command | Purpose |
|----------|---------|---------|
| `frontend/` | `npm run dev` | Vite dev server |
| `frontend/` | `npm run build` | Production build |
| `backend/` | `php artisan serve` | Laravel HTTP server |
| `backend/` | `php artisan db:setup` | Migrate + seed SQL database |
| `backend/` | `php artisan migrate` | Run migrations only |
| `backend/` | `php artisan test` | PHPUnit tests |
| Root | `composer.bat …` | Composer via bundled `composer.phar` |

## API ↔ frontend

- Laravel API routes: `backend/routes/api.php` (prefix `/api`).
- Vite dev proxy forwards `http://localhost:5173/api/*` → `http://127.0.0.1:8000/api/*`.
- Set `VITE_API_URL` in `frontend/.env` when calling the API from React (see `.env.example`).

## Tabletop Shelf (trial app)

Board game collection CRUD with **React + TypeScript** frontend and **Laravel** API.

### API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/games` | List games (`search`, `tag`, `sort`, `direction` query params) |
| POST | `/api/games` | Create game |
| GET | `/api/games/{id}` | Get one game |
| PUT | `/api/games/{id}` | Update game |
| DELETE | `/api/games/{id}` | Delete game |
| GET | `/api/games/{id}/enrichment` | Wikipedia summary (3rd-party) |

After migrating, seed sample data: `php artisan db:seed`

Set `VITE_USE_MOCK=false` in `frontend/.env` to use the real API.
