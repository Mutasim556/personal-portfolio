<?php

use App\Models\Education;
use App\Models\Experience;
use App\Models\HeroSection;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\User;
use Database\Seeders\PortfolioCvSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('portfolio cv seeder executes idempotently and populates real CV information', function () {
    // Run twice to test idempotence
    $this->seed(PortfolioCvSeeder::class);
    $this->seed(PortfolioCvSeeder::class);

    $setting = ProfileSetting::first();
    expect($setting->author_name)->toBe('Md. Mutasim Naib Sumit');
    expect($setting->location)->toBe('Dhaka, Bangladesh');

    $hero = HeroSection::first();
    expect($hero->title_line_1)->toBe('Md. Mutasim Naib Sumit');
    expect($hero->description)->toContain('PHP, Laravel, React.js');

    // 7 Verified skills
    $skills = Skill::where('is_visible', true)->pluck('name')->toArray();
    expect($skills)->toContain('PHP', 'Laravel', 'HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React.js');

    // Experience: Extent IT and Coderclans visible, Incepta kept as unpublished draft
    $visibleExp = Experience::where('is_visible', true)->pluck('company')->toArray();
    expect($visibleExp)->toContain('Extent IT Institute', 'Coderclans.com');
    expect($visibleExp)->not->toContain('Incepta Pharmaceuticals Ltd.');

    $incepta = Experience::where('company', 'Incepta Pharmaceuticals Ltd.')->first();
    expect($incepta)->not->toBeNull();
    expect($incepta->is_visible)->toBeFalse();

    // Education
    $edu = Education::where('is_visible', true)->pluck('degree')->toArray();
    expect($edu)->toContain('B.Sc. in Computer Science and Engineering');
    expect($edu)->toContain('Higher Secondary Certificate (H.S.C.)');
    expect($edu)->toContain('Secondary School Certificate (S.S.C.)');

    // Projects: 2 CV projects saved as reviewable drafts
    $p1 = Project::where('title', 'Solar-Powered Automatic Irrigation System')->first();
    $p2 = Project::where('title', 'Microcontroller-Based Automatic Locking System for Drunken Drivers')->first();
    expect($p1)->not->toBeNull();
    expect($p1->is_published)->toBeFalse();
    expect($p2)->not->toBeNull();
    expect($p2->is_published)->toBeFalse();

    // Services: 5 suggested services saved as reviewable drafts
    $services = Service::where('is_visible', false)->pluck('name')->toArray();
    expect($services)->toContain('Laravel Web Development', 'React.js Frontend Development');
});

test('public homepage displays real CV content and protects private data', function () {
    $this->seed(PortfolioCvSeeder::class);

    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->where('profile.name', 'Md. Mutasim Naib Sumit')
        ->where('profile.location', 'Dhaka, Bangladesh')
        ->where('hero.titleLine1', 'Md. Mutasim Naib Sumit')
        // Sensitive data protection: phone and unverified email are not published publicly
        ->where('profile.phone', '')
        ->where('profile.email', '')
        ->has('education', 3)
        ->has('experiences', 2) // Extent IT and Coderclans (Incepta is draft)
        ->has('skills', 7)
        ->has('projects', 0) // Projects are drafts awaiting user approval/screenshots
    );
});

test('admin can manage academic education records', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    // Index
    $this->actingAs($admin)->get('/admin/education')->assertOk();

    // Create
    $postResponse = $this->actingAs($admin)->post('/admin/education', [
        'degree' => 'Professional Web Development Certificate',
        'institution' => 'Creative IT Institute',
        'years' => '2022',
        'description' => '6 Months intensive training',
        'order' => 10,
        'is_visible' => true,
    ]);
    $postResponse->assertRedirect();
    $this->assertDatabaseHas('education', [
        'degree' => 'Professional Web Development Certificate',
        'institution' => 'Creative IT Institute',
    ]);

    $record = Education::where('institution', 'Creative IT Institute')->first();

    // Update
    $updateResponse = $this->actingAs($admin)->put("/admin/education/{$record->id}", [
        'degree' => 'Professional Web Development with Laravel',
        'institution' => 'Creative IT Institute',
        'years' => '2022',
        'description' => '6 Months intensive certification',
        'order' => 10,
        'is_visible' => true,
    ]);
    $updateResponse->assertRedirect();
    $this->assertDatabaseHas('education', [
        'degree' => 'Professional Web Development with Laravel',
    ]);

    // Delete
    $deleteResponse = $this->actingAs($admin)->delete("/admin/education/{$record->id}");
    $deleteResponse->assertRedirect();
    $this->assertDatabaseMissing('education', [
        'id' => $record->id,
    ]);
});
