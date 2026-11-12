<?php

use App\Mail\ContactMessageMail;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

test('portfolio home page loads successfully with inertia props', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home')
        ->has('profile')
        ->has('experiences')
        ->has('services')
        ->has('skills')
        ->has('projects')
        ->has('testimonials')
        ->has('clients')
    );
});

test('contact form requires valid inputs', function () {
    $response = $this->post('/contact', []);

    $response->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact form sends an email and redirects back with success message', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'website' => 'https://example.com',
        'message' => 'Hello Miles, I would love to discuss a project with you!',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Mail::assertSent(ContactMessageMail::class, function ($mail) {
        return $mail->contactData['name'] === 'Jane Doe' &&
               $mail->contactData['email'] === 'jane@example.com';
    });
});

test('resume download route delivers cv file as attachment', function () {
    $response = $this->get('/resume/download');

    $response->assertOk();
    expect($response->headers->get('content-disposition'))->toContain('attachment');
});
