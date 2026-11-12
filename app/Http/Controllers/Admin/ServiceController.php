<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function index(): Response
    {
        $services = Service::orderBy('order')->get();

        return Inertia::render('admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
        ]);

        if ($request->hasFile('image_file')) {
            $validated['image'] = $this->imageUploadService->upload($request->file('image_file'), 'services');
        }

        unset($validated['image_file']);

        Service::create($validated);

        return back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_image' => ['nullable', 'boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->hasFile('image_file') || $request->boolean('remove_image')) {
            $validated['image'] = $this->imageUploadService->replace(
                $request->file('image_file'),
                $service->image,
                'services',
                $request->boolean('remove_image')
            );
        }

        unset($validated['image_file'], $validated['remove_image']);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $this->imageUploadService->delete($service->image);
        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
    }
}
