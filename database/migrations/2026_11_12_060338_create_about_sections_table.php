<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_sections', function (Blueprint $table) {
            $table->id();
            $table->string('badge')->default('ABOUT');
            $table->string('title_primary')->default('My Journey & ');
            $table->string('title_highlight')->default('Vision');
            $table->text('paragraph_1')->nullable();
            $table->text('paragraph_2')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_sections');
    }
};
