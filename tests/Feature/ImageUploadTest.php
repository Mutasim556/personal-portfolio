<?php

use App\Models\AboutSection;
use App\Models\HeroSection;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\User;
use App\Services\ImageUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

test('admin can upload and replace hero section images', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $profileImage = UploadedFile::fake()->image('profile.jpg', 400, 400);
    $bgImage = UploadedFile::fake()->image('hero-bg.jpg', 1920, 1080);

    $response = $this->actingAs($admin)->put('/admin/hero', [
        'badge' => 'WELCOME',
        'title_line_1' => 'Building Products',
        'title_line_2' => 'That Scale',
        'title_highlight' => 'Modern Architecture',
        'description' => 'Updated developer intro description.',
        'primary_button_text' => 'Hire Me',
        'primary_button_url' => '#contact',
        'secondary_button_text' => 'View CV',
        'secondary_button_url' => '#resume',
        'background_video' => '/theme/video/ball.mp4',
        'is_visible' => true,
        'profile_image_file' => $profileImage,
        'background_image_file' => $bgImage,
    ]);

    $response->assertRedirect();

    $hero = HeroSection::first();
    expect($hero->profile_image)->not->toBeNull();
    expect($hero->background_image)->not->toBeNull();

    Storage::disk('public')->assertExists($hero->profile_image);
    Storage::disk('public')->assertExists($hero->background_image);
});

test('admin can upload, replace and remove about section image', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $image = UploadedFile::fake()->image('about-me.jpg', 800, 600);

    $response = $this->actingAs($admin)->put('/admin/about', [
        'badge' => 'ABOUT',
        'title_primary' => 'My Journey & ',
        'title_highlight' => 'Vision',
        'paragraph_1' => 'First paragraph.',
        'paragraph_2' => 'Second paragraph.',
        'is_visible' => true,
        'image_file' => $image,
    ]);

    $response->assertRedirect();
    $about = AboutSection::first();
    expect($about->image)->not->toBeNull();
    Storage::disk('public')->assertExists($about->image);

    // Remove the image
    $removeResponse = $this->actingAs($admin)->put('/admin/about', [
        'badge' => 'ABOUT',
        'title_primary' => 'My Journey & ',
        'title_highlight' => 'Vision',
        'paragraph_1' => 'First paragraph.',
        'paragraph_2' => 'Second paragraph.',
        'is_visible' => true,
        'remove_image' => true,
    ]);

    $removeResponse->assertRedirect();
    $about->refresh();
    expect($about->image)->toBeNull();
});

test('admin can upload project thumbnail and multiple gallery images', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $thumbnail = UploadedFile::fake()->image('project-thumb.jpg', 600, 400);
    $gallery1 = UploadedFile::fake()->image('screen1.png', 1200, 800);
    $gallery2 = UploadedFile::fake()->image('screen2.png', 1200, 800);

    $response = $this->actingAs($admin)->post('/admin/projects', [
        'title' => 'E-Commerce Superapp',
        'category_name' => 'Web App',
        'description' => 'Full-stack e-commerce project with microservices.',
        'full_width' => false,
        'order' => 1,
        'is_published' => true,
        'image_file' => $thumbnail,
        'gallery_files' => [$gallery1, $gallery2],
    ]);

    $response->assertRedirect();

    $project = Project::where('title', 'E-Commerce Superapp')->first();
    expect($project)->not->toBeNull();
    expect($project->image)->not->toBeNull();
    Storage::disk('public')->assertExists($project->image);

    $galleryImages = ProjectImage::where('project_id', $project->id)->get();
    expect($galleryImages)->toHaveCount(2);

    foreach ($galleryImages as $img) {
        Storage::disk('public')->assertExists($img->image_path);
    }
});

test('admin can upload skill icon and testimonial avatar', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $skillIcon = UploadedFile::fake()->image('react-icon.png', 100, 100);
    $skillResponse = $this->actingAs($admin)->post('/admin/skills', [
        'name' => 'React & Next.js',
        'percentage' => 95,
        'order' => 1,
        'is_visible' => true,
        'icon_file' => $skillIcon,
    ]);

    $skillResponse->assertRedirect();
    $skill = Skill::where('name', 'React & Next.js')->first();
    expect($skill->icon)->not->toBeNull();
    Storage::disk('public')->assertExists($skill->icon);

    $clientAvatar = UploadedFile::fake()->image('sarah.jpg', 200, 200);
    $testimResponse = $this->actingAs($admin)->post('/admin/testimonials', [
        'author' => 'Sarah Connor',
        'quote' => 'Miles delivered exceptional quality and clean architecture.',
        'company' => 'Cyberdyne Systems',
        'designation' => 'CTO',
        'order' => 1,
        'is_visible' => true,
        'avatar_file' => $clientAvatar,
    ]);

    $testimResponse->assertRedirect();
    $testimonial = Testimonial::where('author', 'Sarah Connor')->first();
    expect($testimonial->avatar)->not->toBeNull();
    Storage::disk('public')->assertExists($testimonial->avatar);
});

test('admin can upload service image and update branding settings', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $serviceImage = UploadedFile::fake()->image('service-banner.jpg', 800, 450);
    $serviceResponse = $this->actingAs($admin)->post('/admin/services', [
        'name' => 'Full-Stack Architecture',
        'description' => 'Scalable backend APIs paired with modern Inertia React frontends.',
        'order' => 1,
        'is_visible' => true,
        'image_file' => $serviceImage,
    ]);

    $serviceResponse->assertRedirect();
    $service = Service::where('name', 'Full-Stack Architecture')->first();
    expect($service->image)->not->toBeNull();
    Storage::disk('public')->assertExists($service->image);

    $logo = UploadedFile::fake()->image('brand-logo.png', 300, 100);
    $favicon = UploadedFile::fake()->image('favicon.png', 64, 64);

    $settingsResponse = $this->actingAs($admin)->put('/admin/settings', [
        'site_name' => 'Miles Tech Portfolio',
        'author_name' => 'Miles Thatcher',
        'author_title' => 'Senior Full Stack Engineer',
        'email' => 'contact@miles.test',
        'phone' => '+1 555 123 4567',
        'location' => 'Los Angeles, CA',
        'recipient_email' => 'admin@miles.test',
        'footer_text' => '© 2026 Miles. All rights reserved.',
        'logo_file' => $logo,
        'favicon_file' => $favicon,
    ]);

    $settingsResponse->assertRedirect();
    $setting = ProfileSetting::first();
    expect($setting->logo)->not->toBeNull();
    expect($setting->favicon)->not->toBeNull();
    Storage::disk('public')->assertExists($setting->logo);
    Storage::disk('public')->assertExists($setting->favicon);
});

test('image upload service does not delete static theme assets', function () {
    $service = app(ImageUploadService::class);

    // Passing a static theme path should return false and not delete anything
    expect($service->delete('/theme/img/profile.jpg'))->toBeFalse();
    expect($service->delete('theme/img/profile.jpg'))->toBeFalse();
    expect($service->delete('/storage/theme/img/profile.jpg'))->toBeFalse();
});
