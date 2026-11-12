<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function index(): Response
    {
        $testimonials = Testimonial::orderBy('order')->get();

        return Inertia::render('admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'author' => ['required', 'string', 'max:255'],
            'quote' => ['required', 'string'],
            'company' => ['nullable', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'avatar_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
        ]);

        if ($request->hasFile('avatar_file')) {
            $validated['avatar'] = $this->imageUploadService->upload($request->file('avatar_file'), 'testimonials');
        }

        unset($validated['avatar_file']);

        Testimonial::create($validated);

        return back()->with('success', 'Testimonial created successfully.');
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'author' => ['sometimes', 'required', 'string', 'max:255'],
            'quote' => ['sometimes', 'required', 'string'],
            'company' => ['nullable', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'avatar_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_avatar' => ['nullable', 'boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->hasFile('avatar_file') || $request->boolean('remove_avatar')) {
            $validated['avatar'] = $this->imageUploadService->replace(
                $request->file('avatar_file'),
                $testimonial->avatar,
                'testimonials',
                $request->boolean('remove_avatar')
            );
        }

        unset($validated['avatar_file'], $validated['remove_avatar']);

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->imageUploadService->delete($testimonial->avatar);
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully.');
    }
}
