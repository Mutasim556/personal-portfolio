<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        protected ImageUploadService $imageUploadService
    ) {}

    public function index(): Response
    {
        $projects = Project::with('images')->orderBy('order')->latest()->paginate(10);
        $categories = ProjectCategory::all();

        return Inertia::render('admin/Projects/Index', [
            'projects' => $projects,
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        $categories = ProjectCategory::all();

        return Inertia::render('admin/Projects/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'project_category_id' => ['nullable', 'exists:project_categories,id'],
            'category_name' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'client' => ['nullable', 'string', 'max:100'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'full_width' => ['boolean'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'order' => ['nullable', 'integer'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ]);

        if ($request->hasFile('image_file')) {
            $validated['image'] = $this->imageUploadService->upload($request->file('image_file'), 'projects');
        }

        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }
        $validated['slug'] = $slug;

        unset($validated['image_file'], $validated['gallery_files']);

        $project = Project::create($validated);

        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $idx => $galleryFile) {
                $path = $this->imageUploadService->upload($galleryFile, 'projects/gallery');
                $project->images()->create([
                    'image_path' => $path,
                    'order' => $idx + 1,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        $project->load('images');
        $categories = ProjectCategory::all();

        return Inertia::render('admin/Projects/Edit', [
            'project' => $project,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'project_category_id' => ['nullable', 'exists:project_categories,id'],
            'category_name' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'client' => ['nullable', 'string', 'max:100'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'full_width' => ['boolean'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'order' => ['nullable', 'integer'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'remove_image' => ['nullable', 'boolean'],
            'gallery_files' => ['nullable', 'array'],
            'gallery_files.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'remove_gallery_ids' => ['nullable', 'array'],
            'remove_gallery_ids.*' => ['integer'],
        ]);

        if ($request->has('is_published')) {
            $validated['is_published'] = $request->boolean('is_published');
        }

        if ($request->has('is_featured')) {
            $validated['is_featured'] = $request->boolean('is_featured');
        }

        if ($request->has('full_width')) {
            $validated['full_width'] = $request->boolean('full_width');
        }

        if ($request->hasFile('image_file') || $request->boolean('remove_image')) {
            $validated['image'] = $this->imageUploadService->replace(
                $request->file('image_file'),
                $project->image,
                'projects',
                $request->boolean('remove_image')
            );
        }

        if ($project->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
            $validated['slug'] = $slug;
        }

        unset(
            $validated['image_file'],
            $validated['remove_image'],
            $validated['gallery_files'],
            $validated['remove_gallery_ids']
        );

        $project->update($validated);

        // Process removal of specific existing gallery images
        if ($request->filled('remove_gallery_ids')) {
            $idsToRemove = $request->input('remove_gallery_ids');
            $imagesToRemove = $project->images()->whereIn('id', $idsToRemove)->get();
            foreach ($imagesToRemove as $img) {
                $this->imageUploadService->delete($img->image_path);
                $img->delete();
            }
        }

        // Process newly uploaded gallery images
        if ($request->hasFile('gallery_files')) {
            $currentMaxOrder = $project->images()->max('order') ?? 0;
            foreach ($request->file('gallery_files') as $idx => $galleryFile) {
                $path = $this->imageUploadService->upload($galleryFile, 'projects/gallery');
                $project->images()->create([
                    'image_path' => $path,
                    'order' => $currentMaxOrder + $idx + 1,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->imageUploadService->delete($project->image);

        foreach ($project->images as $img) {
            $this->imageUploadService->delete($img->image_path);
            $img->delete();
        }

        $project->delete();

        return back()->with('success', 'Project deleted successfully.');
    }
}
