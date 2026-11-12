<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('badge')->default('HELLO');
            $table->string('title_line_1')->default('Helping Businesses');
            $table->string('title_line_2')->default('Grow Through');
            $table->string('title_highlight')->default('Digital Innovation');
            $table->text('description')->nullable();
            $table->string('primary_button_text')->default("Let's Work Together");
            $table->string('primary_button_url')->default('#contact');
            $table->string('secondary_button_text')->default('Download Cv');
            $table->string('secondary_button_url')->default('#resume');
            $table->string('background_video')->default('/theme/video/ball.mp4');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
