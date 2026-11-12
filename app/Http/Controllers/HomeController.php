<?php

namespace App\Http\Controllers;

use App\Models\AboutSection;
use App\Models\Education;
use App\Models\Experience;
use App\Models\HeroSection;
use App\Models\NavigationItem;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class HomeController extends Controller
{
    /**
     * Display the dynamic portfolio homepage.
     */
    public function index(): Response
    {
        $setting = ProfileSetting::first() ?? new ProfileSetting([
            'author_name' => 'Md. Mutasim Naib Sumit',
            'author_title' => "Laravel & React Web Developer\nPHP & Web Development",
            'author_avatar' => '/theme/img/profile.jpg',
            'email' => 'mutasimnaibsumit0@gamil.com',
            'phone' => '+8801724698392',
            'location' => 'Dhaka, Bangladesh',
            'resume_url' => '#resume',
            'seo_title' => 'Md. Mutasim Naib Sumit | Laravel & React Web Developer',
            'seo_description' => 'Explore the portfolio of Md. Mutasim Naib Sumit, a web developer experienced in PHP, Laravel, React.js, JavaScript, and responsive web development.',
        ]);

        $hero = HeroSection::where('is_visible', true)->first() ?? new HeroSection([
            'badge' => 'HELLO',
            'title_line_1' => 'Md. Mutasim Naib Sumit',
            'title_line_2' => 'Building Modern, Responsive &',
            'title_highlight' => 'Scalable Web Applications',
            'description' => "I'm a web developer with experience in PHP, Laravel, React.js, JavaScript, and modern frontend technologies. I enjoy developing responsive websites, building web applications, solving technical problems, and sharing knowledge through web development instruction.",
            'primary_button_text' => 'View My Work',
            'primary_button_url' => '#portfolio',
            'secondary_button_text' => 'Download CV',
            'secondary_button_url' => '#resume',
            'background_video' => '/theme/video/ball.mp4',
            'is_visible' => true,
        ]);

        $about = AboutSection::where('is_visible', true)->first() ?? new AboutSection([
            'badge' => 'ABOUT ME',
            'title_primary' => 'My Journey & ',
            'title_highlight' => 'Professional Vision',
            'paragraph_1' => "I'm Md. Mutasim Naib Sumit, a web developer based in Dhaka, Bangladesh, with a background in Computer Science and Engineering. My technical skills include PHP, Laravel, React.js, JavaScript, HTML, CSS, and Bootstrap. My professional experience includes web application development, maintaining existing applications, troubleshooting technical issues, and delivering web development training.",
            'paragraph_2' => 'I previously worked as a Web Developer at Extent IT Institute, where my responsibilities included developing applications with PHP and Laravel, resolving problems in existing web applications, and teaching web design and development courses. I also have experience as a course instructor and hold a B.Sc. in Computer Science and Engineering from Daffodil International University.',
            'is_visible' => true,
        ]);

        $skills = Skill::where('is_visible', true)
            ->orderBy('order')
            ->get()
            ->map(function ($skill) {
                return [
                    'name' => $skill->name,
                    'percentage' => $skill->percentage,
                    'icon' => $skill->icon_url ?: ($skill->icon ? asset(ltrim($skill->icon, '/')) : ''),
                ];
            });

        $experiences = Experience::where('is_visible', true)
            ->orderBy('order')
            ->get(['title', 'company', 'dates', 'description']);

        $education = Education::where('is_visible', true)
            ->orderBy('order')
            ->get(['degree', 'institution', 'years', 'description']);

        $services = Service::where('is_visible', true)
            ->orderBy('order')
            ->get()
            ->map(function ($service) {
                return [
                    'name' => $service->name,
                    'description' => $service->description,
                    'icon' => $service->icon,
                    'image' => $service->image_url ?: ($service->image ? asset(ltrim($service->image, '/')) : null),
                ];
            });

        $projects = Project::where('is_published', true)
            ->with(['images' => fn ($q) => $q->orderBy('order')])
            ->orderBy('order')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'category' => $project->category_name,
                    'image' => $project->image_url ?: ($project->image ? asset(ltrim($project->image, '/')) : asset('theme/img/portfolio1.jpg')),
                    'gallery' => $project->images->map(fn ($img) => [
                        'id' => $img->id,
                        'imageUrl' => $img->image_url,
                        'altText' => $img->alt_text,
                    ])->values()->all(),
                    'fullWidth' => (bool) $project->full_width,
                ];
            });

        $testimonials = Testimonial::where('is_visible', true)
            ->orderBy('order')
            ->get()
            ->map(function ($t) {
                return [
                    'id' => $t->id,
                    'author' => $t->author,
                    'quote' => $t->quote,
                    'company' => $t->company,
                    'designation' => $t->designation,
                    'avatar' => $t->avatar_url ?: ($t->avatar ? asset(ltrim($t->avatar, '/')) : null),
                ];
            });

        $socialLinks = SocialLink::where('is_visible', true)
            ->orderBy('order')
            ->get(['platform', 'url', 'icon']);

        $navigationItems = NavigationItem::where('is_visible', true)
            ->orderBy('order')
            ->get(['label', 'url', 'icon', 'is_external']);

        $clients = [
            ['name' => 'Spotify', 'icon' => 'ri-spotify-fill'],
            ['name' => 'Slack', 'icon' => 'ri-slack-fill'],
            ['name' => 'Github', 'icon' => 'ri-github-fill'],
            ['name' => 'Amazon', 'icon' => 'ri-amazon-fill'],
        ];

        // Safe resume handling: only provide direct download if a confirmed safe file is uploaded
        $hasApprovedResume = $setting->resume_file && Storage::disk('public')->exists($setting->resume_file);
        $resumeDownloadUrl = $hasApprovedResume ? route('resume.download') : '#contact';

        return Inertia::render('Home', [
            'profile' => [
                'name' => $setting->author_name,
                'title' => $setting->author_title,
                'avatar' => $setting->author_avatar_url ?: ($setting->author_avatar ? asset(ltrim($setting->author_avatar, '/')) : asset('theme/img/profile.jpg')),
                'logo' => $setting->logo_url ?: asset('theme/img/logo.png'),
                'logoDark' => $setting->logo_dark_url ?: asset('theme/img/logo.png'),
                'favicon' => $setting->favicon_url ?: asset('favicon.ico'),
                'footerLogo' => $setting->footer_logo_url,
                // Privacy protection: email and phone remain managed in Admin Settings,
                // and are not publicly exposed until explicitly confirmed/verified by user.
                'email' => '',
                'phone' => '',
                'location' => $setting->location,
                'resumeUrl' => $resumeDownloadUrl,
                'socialLinks' => $socialLinks,
                'seoTitle' => $setting->seo_title,
                'seoDescription' => $setting->seo_description,
                'seoOgImage' => $setting->seo_og_image_url ?: ($setting->seo_og_image ? asset(ltrim($setting->seo_og_image, '/')) : asset('theme/img/profile.jpg')),
            ],
            'hero' => [
                'badge' => $hero->badge,
                'titleLine1' => $hero->title_line_1,
                'titleLine2' => $hero->title_line_2,
                'titleHighlight' => $hero->title_highlight,
                'description' => $hero->description,
                'profileImage' => $hero->profile_image_url,
                'backgroundImage' => $hero->background_image_url,
                'primaryButtonText' => $hero->primary_button_text,
                'primaryButtonUrl' => $hero->primary_button_url,
                'secondaryButtonText' => $hero->secondary_button_text ?: 'Download CV',
                'secondaryButtonUrl' => ($hero->secondary_button_url && $hero->secondary_button_url !== '#resume')
                    ? $hero->secondary_button_url
                    : $resumeDownloadUrl,
                'backgroundVideo' => asset(ltrim($hero->background_video ?: '/theme/video/ball.mp4', '/')),
            ],
            'about' => [
                'badge' => $about->badge,
                'titlePrimary' => $about->title_primary,
                'titleHighlight' => $about->title_highlight,
                'paragraph1' => $about->paragraph_1,
                'paragraph2' => $about->paragraph_2,
                'image' => $about->image_url ?: ($about->image ? asset(ltrim($about->image, '/')) : null),
            ],
            'experiences' => $experiences,
            'education' => $education,
            'services' => $services,
            'skills' => $skills,
            'projects' => $projects,
            'testimonials' => $testimonials,
            'navigationItems' => $navigationItems,
            'clients' => $clients,
        ]);
    }

    /**
     * Download the active resume file or redirect to external resume URL.
     */
    public function downloadResume(): SymfonyResponse|RedirectResponse
    {
        $setting = ProfileSetting::first();

        if ($setting && $setting->resume_file && Storage::disk('public')->exists($setting->resume_file)) {
            $filename = ($setting->author_name ? Str::slug($setting->author_name) : 'resume').'-cv.'.pathinfo($setting->resume_file, PATHINFO_EXTENSION);

            return Storage::disk('public')->download($setting->resume_file, $filename);
        }

        if ($setting && $setting->resume_url && ! str_starts_with($setting->resume_url, '#')) {
            return redirect()->away($setting->resume_url);
        }

        $samplePath = storage_path('app/public/resumes/miles-thatcher-cv.pdf');
        if (file_exists($samplePath)) {
            return response()->download($samplePath, 'cv-preview.pdf');
        }

        return redirect()->route('home');
    }
}
