<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use App\Models\ContactMessage;
use App\Models\ProfileSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle incoming contact form submissions.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'website' => ['nullable', 'url', 'max:255'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
        ]);

        // Store message in database
        ContactMessage::create($validated);

        $setting = ProfileSetting::first();
        $recipient = $setting?->recipient_email ?: config('mail.from.address', 'hello@mthatcher.com');

        try {
            Mail::to($recipient)->send(new ContactMessageMail($validated));
        } catch (\Throwable $e) {
            Log::error('Failed to send contact form email: '.$e->getMessage(), [
                'exception' => $e,
                'data' => [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ],
            ]);

            return back()->with('success', 'Thank you for reaching out! Your message was received.');
        }

        return back()->with('success', 'Thank you for reaching out! Your message was sent successfully.');
    }
}
