<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $experiences = Experience::orderBy('order')->get();

        return Inertia::render('admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'dates' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        Experience::create($validated);

        return back()->with('success', 'Experience added successfully.');
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'company' => ['sometimes', 'required', 'string', 'max:255'],
            'dates' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        $experience->update($validated);

        return back()->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return back()->with('success', 'Experience deleted successfully.');
    }
}
