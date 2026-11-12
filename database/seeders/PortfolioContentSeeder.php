<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use App\Models\Experience;
use App\Models\HeroSection;
use App\Models\NavigationItem;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class PortfolioContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Profile Settings
        ProfileSetting::firstOrCreate(['id' => 1], [
            'site_name' => 'Miles Thatcher - Portfolio',
            'author_name' => 'Miles Thatcher',
            'author_title' => "Web Designer &\nWordPress developer",
            'author_avatar' => '/theme/img/profile.jpg',
            'email' => 'hello@mthatcher.com',
            'phone' => '+49 493 39 29 23',
            'location' => "1245 Sunset Boulevard,\nLos Angeles, CA 90026",
            'resume_url' => '#resume',
            'recipient_email' => 'hello@mthatcher.com',
            'footer_text' => '© 2026 Miles Thatcher. All rights reserved.',
            'seo_title' => 'Miles Thatcher - Web Designer & Developer Portfolio',
            'seo_description' => 'A Digital Designer and Web Developer based in Los Angeles.',
        ]);

        // 2. Hero Section
        HeroSection::firstOrCreate(['id' => 1], [
            'badge' => 'HELLO',
            'title_line_1' => 'Helping Businesses',
            'title_line_2' => 'Grow Through',
            'title_highlight' => 'Digital Innovation',
            'description' => 'A Digital Designer and Web Developer based in Los Angeles. My aim is to transform the tricky web flows and overcrowded designs to elegant website solutions!',
            'primary_button_text' => "Let's Work Together",
            'primary_button_url' => '#contact',
            'secondary_button_text' => 'Download Cv',
            'secondary_button_url' => '#resume',
            'background_video' => '/theme/video/ball.mp4',
            'is_visible' => true,
        ]);

        // 3. About Section
        AboutSection::firstOrCreate(['id' => 1], [
            'badge' => 'ABOUT',
            'title_primary' => 'My Journey & ',
            'title_highlight' => 'Vision',
            'paragraph_1' => 'Hi, I’m Miles Thatcher—a creative mind passionate about innovation, storytelling, and design. With a deep love for technology and aesthetics, I strive to bring ideas to life in meaningful and impactful ways.',
            'paragraph_2' => "Over the years, I've worked on diverse projects, blending creativity with strategy to craft unique digital experiences. Whether it's through design, writing, or problem-solving, I believe in pushing boundaries and constantly evolving.",
            'is_visible' => true,
        ]);

        // 4. Skills
        $skills = [
            ['name' => 'Figma', 'percentage' => 92, 'icon' => '/theme/img/figma.png', 'order' => 1],
            ['name' => 'Framer', 'percentage' => 85, 'icon' => '/theme/img/framer.png', 'order' => 2],
            ['name' => 'Laravel', 'percentage' => 70, 'icon' => '/theme/img/laravel.png', 'order' => 3],
            ['name' => 'WordPress', 'percentage' => 95, 'icon' => '/theme/img/wordpress.png', 'order' => 4],
            ['name' => 'Sass', 'percentage' => 80, 'icon' => '/theme/img/sass.png', 'order' => 5],
            ['name' => 'React', 'percentage' => 88, 'icon' => '/theme/img/React.png', 'order' => 6],
            ['name' => 'GraphQL', 'percentage' => 75, 'icon' => '/theme/img/graphql.png', 'order' => 7],
        ];
        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']], $skill);
        }

        // 5. Experiences
        $experiences = [
            [
                'title' => 'Freelancer',
                'company' => 'GreenSprout Design',
                'dates' => 'January 2021 – Present',
                'order' => 1,
            ],
            [
                'title' => 'Frontend Developer',
                'company' => 'PixelLab Interactive',
                'dates' => 'May 2019 – December 2020',
                'order' => 2,
            ],
            [
                'title' => 'Graphic Designer',
                'company' => 'CreativeWave Agency',
                'dates' => 'March 2017 – April 2018',
                'order' => 3,
            ],
            [
                'title' => 'UX/UI Designer',
                'company' => 'BlueSky Digital Studio',
                'dates' => 'June 2018 – August 2020',
                'order' => 4,
            ],
        ];
        foreach ($experiences as $exp) {
            Experience::firstOrCreate(['company' => $exp['company'], 'title' => $exp['title']], $exp);
        }

        // 6. Services
        $services = [
            [
                'name' => 'Web Design & Development',
                'description' => 'Custom website design and development solutions tailored to your business needs. From responsive layouts to interactive features.',
                'order' => 1,
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'User-centered design approach focusing on creating intuitive and engaging user experiences across all digital platforms.',
                'order' => 2,
            ],
            [
                'name' => 'Branding & Identity',
                'description' => 'Complete brand identity development including logo design, brand guidelines, and visual identity systems.',
                'order' => 3,
            ],
            [
                'name' => 'WordPress Solutions',
                'description' => 'Custom WordPress themes, plugins, and full website solutions with content management capabilities.',
                'order' => 4,
            ],
            [
                'name' => 'SEO & Performance Optimization',
                'description' => 'Search engine optimization and website performance optimization to improve visibility and user experience.',
                'order' => 5,
            ],
        ];
        foreach ($services as $srv) {
            Service::firstOrCreate(['name' => $srv['name']], $srv);
        }

        // 7. Projects & Categories
        $brandingCat = ProjectCategory::firstOrCreate(['slug' => 'branding'], ['name' => 'Branding & Identity']);
        $webCat = ProjectCategory::firstOrCreate(['slug' => 'web-development'], ['name' => 'Web Development']);
        $designCat = ProjectCategory::firstOrCreate(['slug' => 'ui-ux'], ['name' => 'UI/UX Design']);

        $projects = [
            [
                'title' => 'Glød Branding',
                'slug' => 'glod-branding',
                'project_category_id' => $brandingCat->id,
                'category_name' => 'Branding & Identity',
                'image' => '/theme/img/project-01.jpg',
                'full_width' => true,
                'is_published' => true,
                'order' => 1,
            ],
            [
                'title' => 'Jasper Jeon',
                'slug' => 'jasper-jeon',
                'project_category_id' => $webCat->id,
                'category_name' => 'Web Development',
                'image' => '/theme/img/project-02.jpg',
                'full_width' => false,
                'is_published' => true,
                'order' => 2,
            ],
            [
                'title' => 'Hafh',
                'slug' => 'hafh',
                'project_category_id' => $designCat->id,
                'category_name' => 'UI/UX Design',
                'image' => '/theme/img/project-03.jpg',
                'full_width' => false,
                'is_published' => true,
                'order' => 3,
            ],
            [
                'title' => 'Sensum',
                'slug' => 'sensum',
                'project_category_id' => $brandingCat->id,
                'category_name' => 'Interactive Design',
                'image' => '/theme/img/project-04.jpg',
                'full_width' => true,
                'is_published' => true,
                'order' => 4,
            ],
        ];
        foreach ($projects as $proj) {
            Project::firstOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 8. Testimonials
        $testimonials = [
            [
                'author' => 'Kevin Lawson',
                'quote' => '“Miles understands that shipping matters. He cuts through complexity, explains options clearly, and takes full responsibility for outcomes, not just tasks.”',
                'order' => 1,
            ],
            [
                'author' => 'Alex Turner',
                'quote' => '“You always know where things stand with Miles. No fluff, no over-engineering — just clear decisions, solid execution, and consistent results.”',
                'order' => 2,
            ],
            [
                'author' => 'Sarah Mitchell',
                'quote' => '“Miles understands that shipping matters. He cuts through complexity, explains options clearly, and takes full responsibility for outcomes, not just tasks.”',
                'order' => 3,
            ],
            [
                'author' => 'Laura Chen',
                'quote' => '“With Miles, there’s no hand-holding. He owns his work, communicates risks early, and delivers without excuses. Simple, professional, and effective.”',
                'order' => 4,
            ],
            [
                'author' => 'Ethan Morris',
                'quote' => '“Miles works like someone who cares about the end result. Clear communication, firm decisions, and consistent delivery. Exactly what you want in a senior developer.”',
                'order' => 5,
            ],
            [
                'author' => 'Sophie Reynolds',
                'quote' => '“Instead of asking endless questions, Miles comes with answers. He understands the constraints, makes informed decisions, and takes full responsibility for the outcome.”',
                'order' => 6,
            ],
            [
                'author' => 'Mark Stevens',
                'quote' => '“Miles doesn’t overcomplicate problems to look smart. He makes practical decisions, explains them clearly, and delivers work that actually ships. That mindset is invaluable.”',
                'order' => 7,
            ],
            [
                'author' => 'Oliver Grant',
                'quote' => '“We worked with several developers before, but Miles stood out immediately. Reliable, disciplined, and extremely focused on outcomes. Once he commits to a deadline, he hits it.”',
                'order' => 8,
            ],
        ];
        foreach ($testimonials as $t) {
            Testimonial::firstOrCreate(['author' => $t['author']], $t);
        }

        // 9. Social Links
        $socialLinks = [
            ['platform' => 'Facebook', 'url' => 'https://facebook.com', 'icon' => 'ri-facebook-fill', 'order' => 1],
            ['platform' => 'Twitter / X', 'url' => 'https://twitter.com', 'icon' => 'ri-twitter-x-line', 'order' => 2],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com', 'icon' => 'ri-instagram-line', 'order' => 3],
            ['platform' => 'Dribbble', 'url' => 'https://dribbble.com', 'icon' => 'ri-dribbble-line', 'order' => 4],
        ];
        foreach ($socialLinks as $s) {
            SocialLink::firstOrCreate(['platform' => $s['platform']], $s);
        }

        // 10. Navigation Items
        $navs = [
            ['label' => 'Home', 'url' => '#home', 'icon' => 'ri-home-3-line', 'order' => 1],
            ['label' => 'About', 'url' => '#about', 'icon' => 'ri-user-3-line', 'order' => 2],
            ['label' => 'Resume', 'url' => '#resume', 'icon' => 'ri-align-center', 'order' => 3],
            ['label' => 'Services', 'url' => '#services', 'icon' => 'ri-briefcase-2-line', 'order' => 4],
            ['label' => 'Skills', 'url' => '#skills', 'icon' => 'ri-shapes-line', 'order' => 5],
            ['label' => 'Projects', 'url' => '#portfolio', 'icon' => 'ri-macbook-line', 'order' => 6],
            ['label' => 'Testimonials', 'url' => '#comments', 'icon' => 'ri-message-2-line', 'order' => 7],
            ['label' => 'Contact', 'url' => '#contact', 'icon' => 'ri-mail-send-line', 'order' => 8],
        ];
        foreach ($navs as $n) {
            NavigationItem::firstOrCreate(['label' => $n['label']], $n);
        }
    }
}
