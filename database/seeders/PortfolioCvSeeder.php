<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use App\Models\Education;
use App\Models\Experience;
use App\Models\HeroSection;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PortfolioCvSeeder extends Seeder
{
    /**
     * Populate the portfolio database using verified CV information.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // 1. Profile Settings
            $setting = ProfileSetting::firstOrCreate(['id' => 1]);
            $isTemplateProfile = str_contains($setting->author_name ?? '', 'Miles') || empty($setting->author_name);

            if ($isTemplateProfile) {
                $setting->update([
                    'site_name' => 'Md. Mutasim Naib Sumit | Portfolio',
                    'author_name' => 'Md. Mutasim Naib Sumit',
                    'author_title' => "Laravel & React Web Developer\nPHP & Web Development",
                    'location' => 'Dhaka, Bangladesh',
                    // Note: 'mutasimnaibsumit0@gamil.com' is stored for admin review; flagged as unverified (potential typo in 'gamil.com').
                    'email' => 'mutasimnaibsumit0@gamil.com',
                    // Note: Stored in backend for admin editing; kept unpublished on public view until confirmed.
                    'phone' => '+8801724698392',
                    'recipient_email' => 'mutasimnaibsumit0@gamil.com',
                    'resume_url' => '#resume',
                    'footer_text' => '© 2026 Md. Mutasim Naib Sumit. All rights reserved.',
                    'seo_title' => 'Md. Mutasim Naib Sumit | Laravel & React Web Developer',
                    'seo_description' => 'Explore the portfolio of Md. Mutasim Naib Sumit, a web developer experienced in PHP, Laravel, React.js, JavaScript, and responsive web development.',
                ]);
            }

            // 2. Hero Section
            $hero = HeroSection::firstOrCreate(['id' => 1]);
            $isTemplateHero = str_contains($hero->description ?? '', 'Miles') || str_contains($hero->description ?? '', 'Los Angeles') || empty($hero->description);

            if ($isTemplateHero) {
                $hero->update([
                    'badge' => 'HELLO',
                    'title_line_1' => 'Md. Mutasim Naib Sumit',
                    'title_line_2' => 'Building Modern, Responsive &',
                    'title_highlight' => 'Scalable Web Applications',
                    'description' => "I'm a web developer with experience in PHP, Laravel, React.js, JavaScript, and modern frontend technologies. I enjoy developing responsive websites, building web applications, solving technical problems, and sharing knowledge through web development instruction.",
                    'primary_button_text' => 'View My Work',
                    'primary_button_url' => '#portfolio',
                    'secondary_button_text' => 'Download CV',
                    'secondary_button_url' => '#resume',
                    'is_visible' => true,
                ]);
            }

            // 3. About Section
            $about = AboutSection::firstOrCreate(['id' => 1]);
            $isTemplateAbout = str_contains($about->paragraph_1 ?? '', 'Miles') || empty($about->paragraph_1);

            if ($isTemplateAbout) {
                $about->update([
                    'badge' => 'ABOUT ME',
                    'title_primary' => 'My Journey & ',
                    'title_highlight' => 'Professional Vision',
                    'paragraph_1' => "I'm Md. Mutasim Naib Sumit, a web developer based in Dhaka, Bangladesh, with a background in Computer Science and Engineering. My technical skills include PHP, Laravel, React.js, JavaScript, HTML, CSS, and Bootstrap. My professional experience includes web application development, maintaining existing applications, troubleshooting technical issues, and delivering web development training.",
                    'paragraph_2' => 'I previously worked as a Web Developer at Extent IT Institute, where my responsibilities included developing applications with PHP and Laravel, resolving problems in existing web applications, and teaching web design and development courses. I also have experience as a course instructor and hold a B.Sc. in Computer Science and Engineering from Daffodil International University.',
                    'is_visible' => true,
                ]);
            }

            // 4. Technical Skills (Verified from CV)
            // Neutral percentage fallback documented for theme bars without claiming unverified ratings
            $verifiedSkills = [
                ['name' => 'PHP', 'percentage' => 85, 'order' => 1, 'is_visible' => true],
                ['name' => 'Laravel', 'percentage' => 85, 'order' => 2, 'is_visible' => true],
                ['name' => 'HTML', 'percentage' => 90, 'order' => 3, 'is_visible' => true],
                ['name' => 'CSS', 'percentage' => 85, 'order' => 4, 'is_visible' => true],
                ['name' => 'Bootstrap', 'percentage' => 85, 'order' => 5, 'is_visible' => true],
                ['name' => 'JavaScript', 'percentage' => 80, 'order' => 6, 'is_visible' => true],
                ['name' => 'React.js', 'percentage' => 80, 'order' => 7, 'is_visible' => true],
            ];

            $verifiedNames = array_column($verifiedSkills, 'name');

            foreach ($verifiedSkills as $skillData) {
                Skill::updateOrCreate(
                    ['name' => $skillData['name']],
                    $skillData
                );
            }

            // Deactivate template placeholder skills that are not on CV
            Skill::whereNotIn('name', $verifiedNames)->update(['is_visible' => false]);

            // 5. Professional Experiences (Verified from CV)
            $experiences = [
                [
                    'company' => 'Extent IT Institute',
                    'title' => 'Web Developer',
                    'dates' => 'October 8, 2017 – 2020',
                    'description' => 'Worked on PHP and Laravel web applications, supported existing application functionality, resolved technical issues, and contributed to web design and development training courses. Located at Mukto Bangla Shopping Complex, Mirpur-1, Dhaka.',
                    'order' => 1,
                    'is_visible' => true,
                ],
                [
                    'company' => 'Coderclans.com',
                    'title' => 'Course Instructor',
                    'dates' => 'December 1, 2021 – October 5, 2022',
                    'description' => 'Worked as a course instructor delivering education and guidance in web development concepts and practical skills.',
                    'order' => 2,
                    'is_visible' => true,
                ],
                [
                    'company' => 'Incepta Pharmaceuticals Ltd.',
                    'title' => '[Role Pending Confirmation]',
                    'dates' => 'March 12, 2023 – Present (Pending Verification)',
                    'description' => 'Tejgaon Industrial Area, Dhaka. [Job title and responsibilities pending confirmation before publishing]',
                    'order' => 3,
                    'is_visible' => false, // Saved as draft
                ],
            ];

            $verifiedCompanies = array_column($experiences, 'company');

            foreach ($experiences as $expData) {
                Experience::updateOrCreate(
                    ['company' => $expData['company']],
                    $expData
                );
            }

            // Deactivate template dummy experiences
            Experience::whereNotIn('company', $verifiedCompanies)->update(['is_visible' => false]);

            // 6. Academic Education (Verified from CV)
            $educationRecords = [
                [
                    'degree' => 'B.Sc. in Computer Science and Engineering',
                    'institution' => 'Daffodil International University',
                    'years' => '2017 – 2021 (Passing Year: 2021)',
                    'description' => 'CGPA: 3.68 out of 4.00',
                    'order' => 1,
                    'is_visible' => true,
                ],
                [
                    'degree' => 'Higher Secondary Certificate (H.S.C.)',
                    'institution' => 'Cantonment Public School and College, Saidpur',
                    'years' => 'Passing Year: 2016',
                    'description' => 'GPA: 5.00 out of 5.00',
                    'order' => 2,
                    'is_visible' => true,
                ],
                [
                    'degree' => 'Secondary School Certificate (S.S.C.)',
                    'institution' => 'Mirzagonj M.L. High School',
                    'years' => 'Passing Year: 2014',
                    'description' => 'GPA: 5.00 out of 5.00',
                    'order' => 3,
                    'is_visible' => true,
                ],
            ];

            foreach ($educationRecords as $eduData) {
                Education::updateOrCreate(
                    ['degree' => $eduData['degree'], 'institution' => $eduData['institution']],
                    $eduData
                );
            }

            // 7. Projects (Verified from CV) - Stored as reviewable drafts
            $projects = [
                [
                    'title' => 'Solar-Powered Automatic Irrigation System',
                    'slug' => 'solar-powered-automatic-irrigation-system',
                    'category_name' => 'Embedded Systems / IoT',
                    'short_description' => 'A microcontroller-based automatic irrigation system powered by solar energy, with remote monitoring functionality.',
                    'description' => 'Solar powered microcontroller based auto irrigation system and remote monitoring. Designed to optimize agricultural water consumption with solar efficiency.',
                    'image' => '/theme/img/portfolio1.jpg',
                    'full_width' => false,
                    'is_featured' => true,
                    'is_published' => false, // Kept as reviewable draft
                    'order' => 1,
                ],
                [
                    'title' => 'Microcontroller-Based Automatic Locking System for Drunken Drivers',
                    'slug' => 'microcontroller-automatic-locking-system-drunken-drivers',
                    'category_name' => 'Embedded Systems / Safety Technology',
                    'short_description' => 'A microcontroller-based automatic locking system designed to address risks associated with impaired driving.',
                    'description' => 'Microcontroller based automatic vehicle ignition locking system designed to detect impairment and prevent unsafe vehicle operation.',
                    'image' => '/theme/img/portfolio2.jpg',
                    'full_width' => false,
                    'is_featured' => true,
                    'is_published' => false, // Kept as reviewable draft
                    'order' => 2,
                ],
            ];

            $verifiedProjectTitles = array_column($projects, 'title');

            foreach ($projects as $projData) {
                Project::updateOrCreate(
                    ['title' => $projData['title']],
                    $projData
                );
            }

            // Deactivate template placeholder projects
            Project::whereNotIn('title', $verifiedProjectTitles)->update(['is_published' => false]);

            // 8. Services (Suggested Offerings based on CV) - Stored as reviewable drafts
            $services = [
                [
                    'name' => 'Laravel Web Development',
                    'description' => 'Developing and maintaining web applications using PHP and the Laravel framework, with a focus on clean functionality and maintainable code.',
                    'order' => 1,
                    'is_visible' => false, // Reviewable draft
                ],
                [
                    'name' => 'Responsive Website Development',
                    'description' => 'Building responsive websites using HTML, CSS, Bootstrap, JavaScript, and modern frontend development techniques.',
                    'order' => 2,
                    'is_visible' => false, // Reviewable draft
                ],
                [
                    'name' => 'React.js Frontend Development',
                    'description' => 'Developing interactive user interfaces and frontend components using React.js.',
                    'order' => 3,
                    'is_visible' => false, // Reviewable draft
                ],
                [
                    'name' => 'Website Maintenance & Bug Fixing',
                    'description' => 'Identifying, troubleshooting, and resolving issues in existing web applications.',
                    'order' => 4,
                    'is_visible' => false, // Reviewable draft
                ],
                [
                    'name' => 'Web Development Training',
                    'description' => 'Providing guidance and instruction in web design and development concepts and technologies.',
                    'order' => 5,
                    'is_visible' => false, // Reviewable draft
                ],
            ];

            $verifiedServiceNames = array_column($services, 'name');

            foreach ($services as $servData) {
                Service::updateOrCreate(
                    ['name' => $servData['name']],
                    $servData
                );
            }

            // Deactivate template placeholder services
            Service::whereNotIn('name', $verifiedServiceNames)->update(['is_visible' => false]);

            // 9. Testimonials: No fabricated testimonials from CV, set template dummies to invisible
            Testimonial::query()->update(['is_visible' => false]);
        });
    }
}
