<?php

use App\Models\ContactMessage;
use App\Models\Skill;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('unauthenticated users cannot access admin dashboard', function () {
    $response = $this->get('/admin/dashboard');

    $response->assertRedirect('/login');
});

test('non-admin authenticated users receive 403 forbidden', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $response = $this->actingAs($user)->get('/admin/dashboard');

    $response->assertForbidden();
});

test('admin can access dashboard and view statistics', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($admin)->get('/admin/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/Dashboard')
        ->has('stats')
        ->has('recentMessages')
        ->has('recentProjects')
    );
});

test('admin can update hero section', function () {
    $admin = User::factory()->create(['is_admin' => true]);

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
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('hero_sections', [
        'badge' => 'WELCOME',
        'title_line_1' => 'Building Products',
    ]);
});

test('admin can create, update and delete a skill', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    // Create
    $createResponse = $this->actingAs($admin)->post('/admin/skills', [
        'name' => 'TypeScript',
        'percentage' => 95,
        'icon' => '/theme/img/react.png',
        'order' => 1,
        'is_visible' => true,
    ]);
    $createResponse->assertRedirect();
    $skill = Skill::where('name', 'TypeScript')->first();
    expect($skill)->not->toBeNull();

    // Update
    $updateResponse = $this->actingAs($admin)->put("/admin/skills/{$skill->id}", [
        'name' => 'TypeScript Expert',
        'percentage' => 99,
        'icon' => '/theme/img/react.png',
        'order' => 1,
        'is_visible' => true,
    ]);
    $updateResponse->assertRedirect();
    expect($skill->fresh()->percentage)->toBe(99);

    // Delete
    $deleteResponse = $this->actingAs($admin)->delete("/admin/skills/{$skill->id}");
    $deleteResponse->assertRedirect();
    expect(Skill::find($skill->id))->toBeNull();
});

test('contact messages are stored and can be marked as read by admin', function () {
    $message = ContactMessage::create([
        'name' => 'Recruiter Alice',
        'email' => 'alice@company.com',
        'message' => 'Great portfolio! Are you open to contract roles?',
        'is_read' => false,
    ]);

    $admin = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($admin)->patch("/admin/messages/{$message->id}/read");
    $response->assertRedirect();

    expect($message->fresh()->is_read)->toBeTrue();
});

test('admin can view and update about section', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $viewResponse = $this->actingAs($admin)->get('/admin/about');
    $viewResponse->assertOk();
    $viewResponse->assertInertia(fn (Assert $page) => $page
        ->component('admin/About/Edit')
        ->has('about')
    );

    $updateResponse = $this->actingAs($admin)->put('/admin/about', [
        'badge' => 'ABOUT ME',
        'title_primary' => 'My Background & ',
        'title_highlight' => 'Expertise',
        'paragraph_1' => 'Updated biography narrative.',
        'paragraph_2' => 'Updated second paragraph of about story.',
        'is_visible' => true,
    ]);
    $updateResponse->assertRedirect();

    $this->assertDatabaseHas('about_sections', [
        'badge' => 'ABOUT ME',
        'title_highlight' => 'Expertise',
    ]);
});
