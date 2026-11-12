<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SeoController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function edit(): Response
    {
        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        return Inertia::render('admin/Seo/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'seo_title' => ['required', 'string', 'max:255'],
            'seo_description' => ['required', 'string', 'max:1000'],
            'seo_og_image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_seo_og_image' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('seo_og_image_file') || $request->boolean('remove_seo_og_image')) {
            $validated['seo_og_image'] = $this->imageUploadService->replace(
                $request->file('seo_og_image_file'),
                $setting->seo_og_image,
                'seo',
                $request->boolean('remove_seo_og_image')
            );
        }

        unset($validated['seo_og_image_file'], $validated['remove_seo_og_image']);

        $setting->update($validated);

        return back()->with('success', 'SEO settings updated successfully.');
    }
}
