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

php artisan migrate
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

## Database

Default: **SQLite** file at `backend/database/database.sqlite`.

`backend/.env`:

```env
DB_CONNECTION=sqlite
```

### MySQL / MariaDB (optional)

1. Create a database (e.g. `crud_app`).
2. In `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_app
DB_USERNAME=root
DB_PASSWORD=your_password
```

3. Run `php artisan migrate`.

## Development commands

| Location | Command | Purpose |
|----------|---------|---------|
| `frontend/` | `npm run dev` | Vite dev server |
| `frontend/` | `npm run build` | Production build |
| `backend/` | `php artisan serve` | Laravel HTTP server |
| `backend/` | `php artisan migrate` | Run SQL migrations |
| `backend/` | `php artisan test` | PHPUnit tests |
| Root | `composer.bat …` | Composer via bundled `composer.phar` |

## API ↔ frontend

- Laravel API routes: `backend/routes/api.php` (prefix `/api`).
- Vite dev proxy forwards `http://localhost:5173/api/*` → `http://127.0.0.1:8000/api/*`.
- Set `VITE_API_URL` in `frontend/.env` when calling the API from React (see `.env.example`).

## Next steps

Build your CRUD resources: models and migrations in Laravel, API controllers/routes, and React pages/components that call the API.
