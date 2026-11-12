<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NavigationController extends Controller
{
    public function index(): Response
    {
        $items = NavigationItem::orderBy('order')->get();

        return Inertia::render('admin/Navigation/Index', [
            'items' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:100'],
            'url' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'is_external' => ['boolean'],
        ]);

        NavigationItem::create($validated);

        return back()->with('success', 'Navigation item created successfully.');
    }

    public function update(Request $request, NavigationItem $navigationItem): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['sometimes', 'required', 'string', 'max:100'],
            'url' => ['sometimes', 'required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
            'is_visible' => ['boolean'],
            'is_external' => ['boolean'],
        ]);

        if ($request->has('is_visible')) {
            $validated['is_visible'] = $request->boolean('is_visible');
        }

        if ($request->has('is_external')) {
            $validated['is_external'] = $request->boolean('is_external');
        }

        $navigationItem->update($validated);

        return back()->with('success', 'Navigation item updated successfully.');
    }

    public function destroy(NavigationItem $navigationItem): RedirectResponse
    {
        $navigationItem->delete();

        return back()->with('success', 'Navigation item deleted successfully.');
    }
}
