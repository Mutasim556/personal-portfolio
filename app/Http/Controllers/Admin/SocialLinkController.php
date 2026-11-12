<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinkController extends Controller
{
    public function index(): Response
    {
        $socialLinks = SocialLink::orderBy('order')->get();

        return Inertia::render('admin/SocialLinks/Index', [
            'socialLinks' => $socialLinks,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'max:100'],
            'url' => ['required', 'url', 'max:255'],
            'icon' => ['required', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        SocialLink::create($validated);

        return back()->with('success', 'Social link created successfully.');
    }

    public function update(Request $request, SocialLink $socialLink): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => ['sometimes', 'required', 'string', 'max:100'],
            'url' => ['sometimes', 'required', 'url', 'max:255'],
            'icon' => ['sometimes', 'required', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        $socialLink->update($validated);

        return back()->with('success', 'Social link updated successfully.');
    }

    public function destroy(SocialLink $socialLink): RedirectResponse
    {
        $socialLink->delete();

        return back()->with('success', 'Social link deleted successfully.');
    }
}
