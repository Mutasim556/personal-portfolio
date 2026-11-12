<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add image to about_sections
        if (Schema::hasTable('about_sections')) {
            Schema::table('about_sections', function (Blueprint $table) {
                if (! Schema::hasColumn('about_sections', 'image')) {
                    $table->string('image')->nullable()->after('paragraph_2');
                }
            });
        }

        // Add profile_image and background_image to hero_sections
        if (Schema::hasTable('hero_sections')) {
            Schema::table('hero_sections', function (Blueprint $table) {
                if (! Schema::hasColumn('hero_sections', 'profile_image')) {
                    $table->string('profile_image')->nullable()->after('secondary_button_url');
                }
                if (! Schema::hasColumn('hero_sections', 'background_image')) {
                    $table->string('background_image')->nullable()->after('profile_image');
                }
            });
        }

        // Add image to services
        if (Schema::hasTable('services')) {
            Schema::table('services', function (Blueprint $table) {
                if (! Schema::hasColumn('services', 'image')) {
                    $table->string('image')->nullable()->after('icon');
                }
            });
        }

        // Add logos and favicon to profile_settings
        if (Schema::hasTable('profile_settings')) {
            Schema::table('profile_settings', function (Blueprint $table) {
                if (! Schema::hasColumn('profile_settings', 'logo')) {
                    $table->string('logo')->nullable()->after('author_avatar');
                }
                if (! Schema::hasColumn('profile_settings', 'logo_dark')) {
                    $table->string('logo_dark')->nullable()->after('logo');
                }
                if (! Schema::hasColumn('profile_settings', 'favicon')) {
                    $table->string('favicon')->nullable()->after('logo_dark');
                }
                if (! Schema::hasColumn('profile_settings', 'footer_logo')) {
                    $table->string('footer_logo')->nullable()->after('favicon');
                }
            });
        }

        // Create project_images table for multi-image gallery support
        if (! Schema::hasTable('project_images')) {
            Schema::create('project_images', function (Blueprint $table) {
                $table->id();
                $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
                $table->string('image_path');
                $table->string('alt_text')->nullable();
                $table->integer('order')->default(0);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_images');

        if (Schema::hasTable('profile_settings')) {
            Schema::table('profile_settings', function (Blueprint $table) {
                $table->dropColumn(['logo', 'logo_dark', 'favicon', 'footer_logo']);
            });
        }

        if (Schema::hasTable('services')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }

        if (Schema::hasTable('hero_sections')) {
            Schema::table('hero_sections', function (Blueprint $table) {
                $table->dropColumn(['profile_image', 'background_image']);
            });
        }

        if (Schema::hasTable('about_sections')) {
            Schema::table('about_sections', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }
    }
};
