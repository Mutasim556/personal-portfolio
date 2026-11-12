<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function edit(): Response
    {
        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        return Inertia::render('admin/Settings/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'author_name' => ['required', 'string', 'max:255'],
            'author_title' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:500'],
            'recipient_email' => ['nullable', 'email', 'max:255'],
            'footer_text' => ['nullable', 'string', 'max:255'],
            'author_avatar_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_author_avatar' => ['nullable', 'boolean'],
            'logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_logo' => ['nullable', 'boolean'],
            'logo_dark_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_logo_dark' => ['nullable', 'boolean'],
            'favicon_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg,ico', 'max:2048'],
            'remove_favicon' => ['nullable', 'boolean'],
            'footer_logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_footer_logo' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('author_avatar_file') || $request->boolean('remove_author_avatar')) {
            $validated['author_avatar'] = $this->imageUploadService->replace(
                $request->file('author_avatar_file'),
                $setting->author_avatar,
                'profile',
                $request->boolean('remove_author_avatar')
            );
        }

        if ($request->hasFile('logo_file') || $request->boolean('remove_logo')) {
            $validated['logo'] = $this->imageUploadService->replace(
                $request->file('logo_file'),
                $setting->logo,
                'branding',
                $request->boolean('remove_logo')
            );
        }

        if ($request->hasFile('logo_dark_file') || $request->boolean('remove_logo_dark')) {
            $validated['logo_dark'] = $this->imageUploadService->replace(
                $request->file('logo_dark_file'),
                $setting->logo_dark,
                'branding',
                $request->boolean('remove_logo_dark')
            );
        }

        if ($request->hasFile('favicon_file') || $request->boolean('remove_favicon')) {
            $validated['favicon'] = $this->imageUploadService->replace(
                $request->file('favicon_file'),
                $setting->favicon,
                'branding',
                $request->boolean('remove_favicon')
            );
        }

        if ($request->hasFile('footer_logo_file') || $request->boolean('remove_footer_logo')) {
            $validated['footer_logo'] = $this->imageUploadService->replace(
                $request->file('footer_logo_file'),
                $setting->footer_logo,
                'branding',
                $request->boolean('remove_footer_logo')
            );
        }

        unset(
            $validated['author_avatar_file'],
            $validated['remove_author_avatar'],
            $validated['logo_file'],
            $validated['remove_logo'],
            $validated['logo_dark_file'],
            $validated['remove_logo_dark'],
            $validated['favicon_file'],
            $validated['remove_favicon'],
            $validated['footer_logo_file'],
            $validated['remove_footer_logo']
        );

        $setting->update($validated);

        return back()->with('success', 'Website settings updated successfully.');
    }
}
