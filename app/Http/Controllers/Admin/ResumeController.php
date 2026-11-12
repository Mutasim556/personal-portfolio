<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResumeController extends Controller
{
    public function edit(): Response
    {
        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        return Inertia::render('admin/Resume/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'resume_file' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'resume_url' => ['nullable', 'string', 'max:255'],
        ]);

        $setting = ProfileSetting::firstOrCreate(['id' => 1]);

        if ($request->hasFile('resume_file')) {
            $path = $request->file('resume_file')->store('resumes', 'public');
            $setting->resume_file = $path;
        }

        if ($request->filled('resume_url')) {
            $setting->resume_url = $request->input('resume_url');
        }

        $setting->save();

        return back()->with('success', 'Resume configuration updated successfully.');
    }
}
