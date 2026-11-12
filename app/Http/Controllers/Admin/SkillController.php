<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function index(): Response
    {
        $skills = Skill::orderBy('order')->get();

        return Inertia::render('admin/Skills/Index', [
            'skills' => $skills,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'icon' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'icon_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
        ]);

        if ($request->hasFile('icon_file')) {
            $validated['icon'] = $this->imageUploadService->upload($request->file('icon_file'), 'skills');
        }

        unset($validated['icon_file']);

        Skill::create($validated);

        return back()->with('success', 'Skill added successfully.');
    }

    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:100'],
            'percentage' => ['sometimes', 'required', 'integer', 'min:0', 'max:100'],
            'icon' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'icon_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_icon' => ['nullable', 'boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->hasFile('icon_file') || $request->boolean('remove_icon')) {
            $validated['icon'] = $this->imageUploadService->replace(
                $request->file('icon_file'),
                $skill->icon,
                'skills',
                $request->boolean('remove_icon')
            );
        }

        unset($validated['icon_file'], $validated['remove_icon']);

        $skill->update($validated);

        return back()->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $this->imageUploadService->delete($skill->icon);
        $skill->delete();

        return back()->with('success', 'Skill deleted successfully.');
    }
}
