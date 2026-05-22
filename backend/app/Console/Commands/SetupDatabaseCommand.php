<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SetupDatabaseCommand extends Command
{
    protected $signature = 'db:setup
                            {--fresh : Drop all tables and re-run migrations}';

    protected $description = 'Prepare SQL database: create SQLite file, migrate, seed board games';

    public function handle(): int
    {
        if (config('database.default') === 'sqlite') {
            $path = database_path('database.sqlite');

            if (! file_exists($path)) {
                touch($path);
                $this->components->info('Created database/database.sqlite');
            }
        }

        if ($this->option('fresh')) {
            $this->call('migrate:fresh', ['--force' => true]);
        } else {
            $this->call('migrate', ['--force' => true]);
        }

        $this->call('db:seed', ['--force' => true]);

        $this->components->info('Database is ready (board_games table + sample data).');

        return self::SUCCESS;
    }
}
