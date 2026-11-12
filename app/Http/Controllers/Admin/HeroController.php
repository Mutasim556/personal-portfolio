<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function edit(): Response
    {
        $hero = HeroSection::firstOrCreate(['id' => 1]);

        return Inertia::render('admin/Hero/Edit', [
            'hero' => $hero,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'badge' => ['required', 'string', 'max:50'],
            'title_line_1' => ['required', 'string', 'max:255'],
            'title_line_2' => ['nullable', 'string', 'max:255'],
            'title_highlight' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'primary_button_text' => ['required', 'string', 'max:100'],
            'primary_button_url' => ['required', 'string', 'max:255'],
            'secondary_button_text' => ['nullable', 'string', 'max:100'],
            'secondary_button_url' => ['nullable', 'string', 'max:255'],
            'background_video' => ['nullable', 'string', 'max:255'],
            'is_visible' => ['boolean'],
            'profile_image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'background_image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:10240'],
            'remove_profile_image' => ['nullable', 'boolean'],
            'remove_background_image' => ['nullable', 'boolean'],
        ]);

        $hero = HeroSection::firstOrCreate(['id' => 1]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->hasFile('profile_image_file') || $request->boolean('remove_profile_image')) {
            $validated['profile_image'] = $this->imageUploadService->replace(
                $request->file('profile_image_file'),
                $hero->profile_image,
                'hero',
                $request->boolean('remove_profile_image')
            );
        }

        if ($request->hasFile('background_image_file') || $request->boolean('remove_background_image')) {
            $validated['background_image'] = $this->imageUploadService->replace(
                $request->file('background_image_file'),
                $hero->background_image,
                'hero',
                $request->boolean('remove_background_image')
            );
        }

        unset(
            $validated['profile_image_file'],
            $validated['background_image_file'],
            $validated['remove_profile_image'],
            $validated['remove_background_image']
        );

        $hero->update($validated);

        return back()->with('success', 'Hero section updated successfully.');
    }
}
