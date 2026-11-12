<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'totalProjects' => Project::count(),
            'publishedProjects' => Project::where('is_published', true)->count(),
            'totalSkills' => Skill::count(),
            'totalServices' => Service::count(),
            'totalTestimonials' => Testimonial::count(),
            'unreadMessages' => ContactMessage::where('is_read', false)->count(),
            'totalMessages' => ContactMessage::count(),
            'totalExperiences' => Experience::count(),
        ];

        $recentMessages = ContactMessage::latest()->take(5)->get();
        $recentProjects = Project::latest()->take(5)->get(['id', 'title', 'category_name', 'image', 'is_published', 'created_at']);

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats,
            'recentMessages' => $recentMessages,
            'recentProjects' => $recentProjects,
        ]);
    }
}
