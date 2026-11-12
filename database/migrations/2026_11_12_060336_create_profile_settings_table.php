<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Visiblo Portfolio');
            $table->string('author_name')->default('Miles Thatcher');
            $table->string('author_title')->default("Web Designer &\nWordPress developer");
            $table->string('author_avatar')->nullable();
            $table->string('email')->default('hello@mthatcher.com');
            $table->string('phone')->default('+49 493 39 29 23');
            $table->text('location')->nullable();
            $table->string('resume_url')->nullable();
            $table->string('resume_file')->nullable();
            $table->string('recipient_email')->nullable();
            $table->string('footer_text')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_og_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_settings');
    }
};
