<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('board_games', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('designer');
            $table->string('publisher');
            $table->unsignedSmallInteger('year_published');
            $table->unsignedTinyInteger('min_players');
            $table->unsignedTinyInteger('max_players');
            $table->unsignedSmallInteger('play_time_minutes');
            $table->decimal('rating', 3, 1);
            $table->json('tags');
            $table->timestamps();

            $table->index('designer');
            $table->index('title');
            $table->index('rating');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('board_games');
    }
};
