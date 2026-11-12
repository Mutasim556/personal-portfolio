<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function edit(): Response
    {
        $about = AboutSection::firstOrCreate(['id' => 1]);

        return Inertia::render('admin/About/Edit', [
            'about' => $about,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'badge' => ['required', 'string', 'max:50'],
            'title_primary' => ['required', 'string', 'max:255'],
            'title_highlight' => ['required', 'string', 'max:255'],
            'paragraph_1' => ['required', 'string', 'max:2000'],
            'paragraph_2' => ['nullable', 'string', 'max:2000'],
            'is_visible' => ['boolean'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_image' => ['nullable', 'boolean'],
        ]);

        $about = AboutSection::firstOrCreate(['id' => 1]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->hasFile('image_file') || $request->boolean('remove_image')) {
            $validated['image'] = $this->imageUploadService->replace(
                $request->file('image_file'),
                $about->image,
                'about',
                $request->boolean('remove_image')
            );
        }

        unset($validated['image_file'], $validated['remove_image']);

        $about->update($validated);

        return back()->with('success', 'About section updated successfully.');
    }
}
