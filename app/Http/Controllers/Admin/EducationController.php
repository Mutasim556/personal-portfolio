<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function index(): Response
    {
        $education = Education::orderBy('order')->get();

        return Inertia::render('admin/Education/Index', [
            'education' => $education,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'degree' => ['required', 'string', 'max:255'],
            'institution' => ['required', 'string', 'max:255'],
            'years' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        Education::create($validated);

        return back()->with('success', 'Education record added successfully.');
    }

    public function update(Request $request, Education $education): RedirectResponse
    {
        $validated = $request->validate([
            'degree' => ['sometimes', 'required', 'string', 'max:255'],
            'institution' => ['sometimes', 'required', 'string', 'max:255'],
            'years' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        $education->update($validated);

        return back()->with('success', 'Education record updated successfully.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return back()->with('success', 'Education record deleted successfully.');
    }
}
