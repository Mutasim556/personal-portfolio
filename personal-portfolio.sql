-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2026 at 03:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personal-portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_sections`
--

CREATE TABLE `about_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge` varchar(255) NOT NULL DEFAULT 'ABOUT',
  `title_primary` varchar(255) NOT NULL DEFAULT 'My Journey & ',
  `title_highlight` varchar(255) NOT NULL DEFAULT 'Vision',
  `paragraph_1` text DEFAULT NULL,
  `paragraph_2` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_sections`
--

INSERT INTO `about_sections` (`id`, `badge`, `title_primary`, `title_highlight`, `paragraph_1`, `paragraph_2`, `image`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'ABOUT ME', 'My Journey &', 'Professional Vision', 'I\'m Md. Mutasim Naib Sumit, a web developer based in Dhaka, Bangladesh, with a background in Computer Science and Engineering. My technical skills include PHP, Laravel, React.js, JavaScript, HTML, CSS, and Bootstrap. My professional experience includes web application development, maintaining existing applications, troubleshooting technical issues, and delivering web development training.', 'I previously worked as a Web Developer at Extent IT Institute, where my responsibilities included developing applications with PHP and Laravel, resolving problems in existing web applications, and teaching web design and development courses. I also have experience as a course instructor and hold a B.Sc. in Computer Science and Engineering from Daffodil International University.', 'portfolio/about/s7bbEDeYRfPTOp5biqUpccaM4NTiGPItdWNAOO0n.jpg', 1, '2026-11-12 00:07:02', '2026-11-12 04:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `degree` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `years` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `degree`, `institution`, `years`, `description`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'B.Sc. in Computer Science and Engineering', 'Daffodil International University', '2017 – 2021 (Passing Year: 2021)', 'CGPA: 3.68 out of 4.00', 1, 1, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(2, 'Higher Secondary Certificate (H.S.C.)', 'Cantonment Public School and College, Saidpur', 'Passing Year: 2016', 'GPA: 5.00 out of 5.00', 2, 1, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(3, 'Secondary School Certificate (S.S.C.)', 'Mirzagonj M.L. High School', 'Passing Year: 2014', 'GPA: 5.00 out of 5.00', 3, 1, '2026-11-12 03:30:43', '2026-11-12 03:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `dates` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `title`, `company`, `dates`, `description`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'Freelancer', 'GreenSprout Design', 'January 2021 – Present', NULL, 1, 0, '2026-11-12 00:07:03', '2026-11-12 03:59:34'),
(2, 'Frontend Developer', 'PixelLab Interactive', 'May 2019 – December 2020', NULL, 2, 0, '2026-11-12 00:07:03', '2026-11-12 03:59:31'),
(3, 'Graphic Designer', 'CreativeWave Agency', 'March 2017 – April 2018', NULL, 3, 0, '2026-11-12 00:07:03', '2026-11-12 03:58:48'),
(4, 'UX/UI Designer', 'BlueSky Digital Studio', 'June 2018 – August 2020', NULL, 4, 0, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(5, 'Web Developer', 'Extent IT Institute', 'October 8, 2017 – 2020', 'Worked on PHP and Laravel web applications, supported existing application functionality, resolved technical issues, and contributed to web design and development training courses. Located at Mukto Bangla Shopping Complex, Mirpur-1, Dhaka.', 3, 1, '2026-11-12 03:30:43', '2026-11-12 04:02:10'),
(6, 'Course Instructor', 'Coderclans.com', 'December 1, 2021 – October 5, 2022', 'Worked as a course instructor delivering education and guidance in web development concepts and practical skills.', 2, 1, '2026-11-12 03:30:43', '2026-11-12 04:02:18'),
(7, '[Role Pending Confirmation]', 'Incepta Pharmaceuticals Ltd.', 'March 12, 2023 – Present (Pending Verification)', 'Tejgaon Industrial Area, Dhaka. [Job title and responsibilities pending confirmation before publishing]', 3, 0, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(8, 'Software Engineer', 'Incepta Pharmaceuticals Ltd.', 'March 12 , 2022 – Present', NULL, 1, 1, '2026-11-12 04:00:27', '2026-11-12 04:03:01');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hero_sections`
--

CREATE TABLE `hero_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge` varchar(255) NOT NULL DEFAULT 'HELLO',
  `title_line_1` varchar(255) NOT NULL DEFAULT 'Helping Businesses',
  `title_line_2` varchar(255) NOT NULL DEFAULT 'Grow Through',
  `title_highlight` varchar(255) NOT NULL DEFAULT 'Digital Innovation',
  `description` text DEFAULT NULL,
  `primary_button_text` varchar(255) NOT NULL DEFAULT 'Let''s Work Together',
  `primary_button_url` varchar(255) NOT NULL DEFAULT '#contact',
  `secondary_button_text` varchar(255) NOT NULL DEFAULT 'Download Cv',
  `secondary_button_url` varchar(255) NOT NULL DEFAULT '#resume',
  `profile_image` varchar(255) DEFAULT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  `background_video` varchar(255) NOT NULL DEFAULT '/theme/video/ball.mp4',
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_sections`
--

INSERT INTO `hero_sections` (`id`, `badge`, `title_line_1`, `title_line_2`, `title_highlight`, `description`, `primary_button_text`, `primary_button_url`, `secondary_button_text`, `secondary_button_url`, `profile_image`, `background_image`, `background_video`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'HELLO', 'Building Modern,', 'Responsive &', 'Scalable Web Applications', 'I\'m a web developer with experience in PHP, Laravel, React.js, JavaScript, and modern frontend technologies. I enjoy developing responsive websites, building web applications, solving technical problems, and sharing knowledge through web development instruction.', 'View My Work', '#portfolio', 'Download CV', '#resume', NULL, NULL, '/theme/video/ocean.mp4', 1, '2026-11-12 00:07:02', '2026-11-12 05:30:51');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_files`
--

CREATE TABLE `media_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `size` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_11_12_060217_add_is_admin_to_users_table', 2),
(5, '2026_11_12_060336_create_profile_settings_table', 3),
(6, '2026_11_12_060337_create_hero_sections_table', 3),
(7, '2026_11_12_060338_create_about_sections_table', 3),
(8, '2026_11_12_060339_create_skills_table', 3),
(9, '2026_11_12_060340_create_experiences_table', 3),
(10, '2026_11_12_060341_create_education_table', 3),
(11, '2026_11_12_060342_create_project_categories_table', 3),
(12, '2026_11_12_060343_create_projects_table', 3),
(13, '2026_11_12_060344_create_services_table', 3),
(14, '2026_11_12_060345_create_testimonials_table', 3),
(15, '2026_11_12_060346_create_contact_messages_table', 3),
(16, '2026_11_12_060347_create_social_links_table', 3),
(17, '2026_11_12_060348_create_media_files_table', 3),
(18, '2026_11_12_060349_create_navigation_items_table', 3),
(19, '2026_11_12_084948_add_image_fields_and_create_project_images_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `navigation_items`
--

CREATE TABLE `navigation_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `is_external` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `navigation_items`
--

INSERT INTO `navigation_items` (`id`, `label`, `url`, `icon`, `order`, `is_visible`, `is_external`, `created_at`, `updated_at`) VALUES
(1, 'Home', '#home', 'ri-home-3-line', 1, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(2, 'About', '#about', 'ri-user-3-line', 2, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(3, 'Resume', '#resume', 'ri-align-center', 3, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(4, 'Services', '#services', 'ri-briefcase-2-line', 4, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(5, 'Skills', '#skills', 'ri-shapes-line', 5, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(6, 'Projects', '#portfolio', 'ri-macbook-line', 6, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(7, 'Testimonials', '#comments', 'ri-message-2-line', 7, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(8, 'Contact', '#contact', 'ri-mail-send-line', 8, 1, 0, '2026-11-12 00:07:04', '2026-11-12 00:07:04');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile_settings`
--

CREATE TABLE `profile_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) NOT NULL DEFAULT 'Visiblo Portfolio',
  `author_name` varchar(255) NOT NULL DEFAULT 'Miles Thatcher',
  `author_title` varchar(255) NOT NULL DEFAULT 'Web Designer &\nWordPress developer',
  `author_avatar` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `logo_dark` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `footer_logo` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL DEFAULT 'hello@mthatcher.com',
  `phone` varchar(255) NOT NULL DEFAULT '+49 493 39 29 23',
  `location` text DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `resume_file` varchar(255) DEFAULT NULL,
  `recipient_email` varchar(255) DEFAULT NULL,
  `footer_text` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `seo_og_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile_settings`
--

INSERT INTO `profile_settings` (`id`, `site_name`, `author_name`, `author_title`, `author_avatar`, `logo`, `logo_dark`, `favicon`, `footer_logo`, `email`, `phone`, `location`, `resume_url`, `resume_file`, `recipient_email`, `footer_text`, `seo_title`, `seo_description`, `seo_og_image`, `created_at`, `updated_at`) VALUES
(1, 'Md. Mutasim Naib Sumit | Portfolio', 'Md. Mutasim Naib Sumit', 'Laravel & React Web Developer\r\nPHP & Web Development', 'portfolio/profile/BPRp82FnqdcQ9C18sEFVRj4hErPiZMNy3hRVIngF.jpg', 'portfolio/branding/czLSBqfyq93UFIUp5vtR3wDYXBxNdMlGE1BClVlC.jpg', 'portfolio/branding/jVjbcQ786l4o9n3mRofM4UsD5KRVafD05nzvlAhn.jpg', 'portfolio/branding/b6J0maXBDMJG4a13Shs8KTA9YdhA2u8ZrzZmstsG.jpg', 'portfolio/branding/ZZAptavgaNFelyULGjb87j4QfTl4siWwHhCgTRwZ.jpg', 'mutasimnaibsumit0@gamil.com', '+8801724698392', 'Dhaka, Bangladesh', '#resume', 'resumes/qaHZykJV52jn3CxPf5gXu2TmwQUgu5JbHSlm5lDL.pdf', 'mutasimnaibsumit0@gamil.com', '© 2026 Md. Mutasim Naib Sumit. All rights reserved.', 'Md. Mutasim Naib Sumit | Laravel & React Web Developer', 'Explore the portfolio of Md. Mutasim Naib Sumit, a web developer experienced in PHP, Laravel, React.js, JavaScript, and responsive web development.', NULL, '2026-11-12 00:07:02', '2026-11-12 04:13:08');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `full_width` tinyint(1) NOT NULL DEFAULT 0,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_category_id`, `title`, `slug`, `category_name`, `image`, `short_description`, `description`, `client`, `project_url`, `github_url`, `full_width`, `is_featured`, `is_published`, `order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Glød Branding', 'glod-branding', 'Branding & Identity', '/theme/img/project-01.jpg', NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 1, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(2, 2, 'Jasper Jeon', 'jasper-jeon', 'Web Development', '/theme/img/project-02.jpg', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 2, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(3, 3, 'Hafh', 'hafh', 'UI/UX Design', '/theme/img/project-03.jpg', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 3, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(4, 1, 'Sensum', 'sensum', 'Interactive Design', '/theme/img/project-04.jpg', NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 4, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(5, NULL, 'Solar-Powered Automatic Irrigation System', 'solar-powered-automatic-irrigation-system', 'Embedded Systems / IoT', '/theme/img/portfolio1.jpg', 'A microcontroller-based automatic irrigation system powered by solar energy, with remote monitoring functionality.', 'Solar powered microcontroller based auto irrigation system and remote monitoring. Designed to optimize agricultural water consumption with solar efficiency.', NULL, NULL, NULL, 0, 1, 0, 1, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(6, NULL, 'Microcontroller-Based Automatic Locking System for Drunken Drivers', 'microcontroller-automatic-locking-system-drunken-drivers', 'Embedded Systems / Safety Technology', '/theme/img/portfolio2.jpg', 'A microcontroller-based automatic locking system designed to address risks associated with impaired driving.', 'Microcontroller based automatic vehicle ignition locking system designed to detect impairment and prevent unsafe vehicle operation.', NULL, NULL, NULL, 0, 1, 0, 2, '2026-11-12 03:30:43', '2026-11-12 03:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `project_categories`
--

CREATE TABLE `project_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_categories`
--

INSERT INTO `project_categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Branding & Identity', 'branding', '2026-11-12 00:07:03', '2026-11-12 00:07:03'),
(2, 'Web Development', 'web-development', '2026-11-12 00:07:03', '2026-11-12 00:07:03'),
(3, 'UI/UX Design', 'ui-ux', '2026-11-12 00:07:03', '2026-11-12 00:07:03');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`id`, `project_id`, `image_path`, `alt_text`, `order`, `created_at`, `updated_at`) VALUES
(1, 5, 'portfolio/projects/gallery/xaweimUtgbwNvp0VVypWy8wEZJPzRUr9IaaUYcmb.jpg', NULL, 1, '2026-11-12 05:05:02', '2026-11-12 05:05:02');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `icon`, `image`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'Web Design & Development', 'Custom website design and development solutions tailored to your business needs. From responsive layouts to interactive features.', NULL, NULL, 1, 1, '2026-11-12 00:07:03', '2026-11-12 04:33:40'),
(2, 'UI/UX Design', 'User-centered design approach focusing on creating intuitive and engaging user experiences across all digital platforms.', NULL, NULL, 2, 1, '2026-11-12 00:07:03', '2026-11-12 04:33:43'),
(3, 'Branding & Identity', 'Complete brand identity development including logo design, brand guidelines, and visual identity systems.', NULL, NULL, 3, 0, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(4, 'WordPress Solutions', 'Custom WordPress themes, plugins, and full website solutions with content management capabilities.', NULL, NULL, 4, 0, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(5, 'SEO & Performance Optimization', 'Search engine optimization and website performance optimization to improve visibility and user experience.', NULL, NULL, 5, 0, '2026-11-12 00:07:03', '2026-11-12 03:30:43'),
(6, 'Laravel Web Development', 'Developing and maintaining web applications using PHP and the Laravel framework, with a focus on clean functionality and maintainable code.', NULL, NULL, 1, 1, '2026-11-12 03:30:43', '2026-11-12 04:33:41'),
(7, 'Responsive Website Development', 'Building responsive websites using HTML, CSS, Bootstrap, JavaScript, and modern frontend development techniques.', NULL, NULL, 2, 0, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(8, 'React.js Frontend Development', 'Developing interactive user interfaces and frontend components using React.js.', NULL, NULL, 3, 0, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(9, 'Website Maintenance & Bug Fixing', 'Identifying, troubleshooting, and resolving issues in existing web applications.', NULL, NULL, 4, 0, '2026-11-12 03:30:43', '2026-11-12 03:30:43'),
(10, 'Web Development Training', 'Providing guidance and instruction in web design and development concepts and technologies.', NULL, NULL, 5, 0, '2026-11-12 03:30:43', '2026-11-12 03:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `percentage` int(11) NOT NULL DEFAULT 80,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `percentage`, `icon`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'Figma', 92, '/theme/img/figma.png', 1, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(2, 'Framer', 85, '/theme/img/framer.png', 2, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(3, 'Laravel', 85, '/theme/img/laravel.png', 2, 1, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(4, 'WordPress', 95, '/theme/img/wordpress.png', 4, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(5, 'Sass', 80, '/theme/img/sass.png', 5, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(6, 'React', 88, '/theme/img/React.png', 6, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(7, 'GraphQL', 75, '/theme/img/graphql.png', 7, 0, '2026-11-12 00:07:02', '2026-11-12 03:30:43'),
(8, 'PHP', 85, 'portfolio/skills/SH9COymqMZydjDjpZeYvMzehF8V8bDLcbBi3D7JI.png', 1, 1, '2026-11-12 03:30:43', '2026-11-12 03:48:32'),
(9, 'HTML', 90, 'portfolio/skills/Er5xXXy7u1PcPVot456LSKop26FaKNRNUTz89XLQ.png', 3, 1, '2026-11-12 03:30:43', '2026-11-12 03:50:12'),
(10, 'CSS', 85, 'portfolio/skills/2n31BiuqAJRK18x1IwBqsAGfotrTzoVMcU1IlqM8.webp', 4, 1, '2026-11-12 03:30:43', '2026-11-12 03:50:20'),
(11, 'Bootstrap', 85, 'portfolio/skills/C8pKcj72eJJbnwk2UAmxFeKo7ubSyZOi46yB5Zqv.png', 5, 1, '2026-11-12 03:30:43', '2026-11-12 03:51:52'),
(12, 'JavaScript', 80, 'portfolio/skills/ViQgM7X6ZEzAa0qoXw9FerSfl6qZ5SrHDCG5euml.png', 6, 1, '2026-11-12 03:30:43', '2026-11-12 03:57:57'),
(13, 'React.js', 80, 'portfolio/skills/ejo7b6udqaSRleUBD8dRx1D7XmJ3MD09dfAvAlb4.png', 7, 1, '2026-11-12 03:30:43', '2026-11-12 03:54:40');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `platform` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT 'ri-link',
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `platform`, `url`, `icon`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'Facebook', 'https://www.facebook.com/mutasim.sumit.71/', 'ri-facebook-fill', 1, 1, '2026-11-12 00:07:04', '2026-11-12 04:15:49'),
(2, 'Twitter / X', 'https://twitter.com', 'ri-twitter-x-line', 2, 1, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(3, 'Instagram', 'https://instagram.com', 'ri-instagram-line', 3, 1, '2026-11-12 00:07:04', '2026-11-12 00:07:04'),
(4, 'Dribbble', 'https://dribbble.com', 'ri-dribbble-line', 4, 1, '2026-11-12 00:07:04', '2026-11-12 00:07:04');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `quote` text NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `author`, `designation`, `company`, `avatar`, `quote`, `order`, `is_visible`, `created_at`, `updated_at`) VALUES
(1, 'Kevin Lawson', NULL, NULL, NULL, '“Miles understands that shipping matters. He cuts through complexity, explains options clearly, and takes full responsibility for outcomes, not just tasks.”', 1, 1, '2026-11-12 00:07:03', '2026-11-12 05:01:15'),
(2, 'Alex Turner', NULL, NULL, NULL, '“You always know where things stand with Miles. No fluff, no over-engineering — just clear decisions, solid execution, and consistent results.”', 2, 1, '2026-11-12 00:07:03', '2026-11-12 05:01:17'),
(3, 'Sarah Mitchell', NULL, NULL, NULL, '“Miles understands that shipping matters. He cuts through complexity, explains options clearly, and takes full responsibility for outcomes, not just tasks.”', 3, 1, '2026-11-12 00:07:03', '2026-11-12 05:01:38'),
(4, 'Laura Chen', NULL, NULL, NULL, '“With Miles, there’s no hand-holding. He owns his work, communicates risks early, and delivers without excuses. Simple, professional, and effective.”', 4, 1, '2026-11-12 00:07:03', '2026-11-12 05:01:39'),
(5, 'Ethan Morris', NULL, NULL, NULL, '“Miles works like someone who cares about the end result. Clear communication, firm decisions, and consistent delivery. Exactly what you want in a senior developer.”', 5, 1, '2026-11-12 00:07:03', '2026-11-12 05:01:40'),
(6, 'Sophie Reynolds', NULL, NULL, NULL, '“Instead of asking endless questions, Miles comes with answers. He understands the constraints, makes informed decisions, and takes full responsibility for the outcome.”', 6, 1, '2026-11-12 00:07:04', '2026-11-12 05:01:41'),
(7, 'Mark Stevens', NULL, NULL, NULL, '“Miles doesn’t overcomplicate problems to look smart. He makes practical decisions, explains them clearly, and delivers work that actually ships. That mindset is invaluable.”', 7, 1, '2026-11-12 00:07:04', '2026-11-12 05:01:42'),
(8, 'Oliver Grant', NULL, NULL, NULL, '“We worked with several developers before, but Miles stood out immediately. Reliable, disciplined, and extremely focused on outcomes. Once he commits to a deadline, he hits it.”', 8, 0, '2026-11-12 00:07:04', '2026-11-12 03:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `is_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@portfolio.local', '2026-11-12 00:03:10', '$2y$12$AmCZn2mfU.Ra9RUdcsH1iuE86YvLgfki/v7iDiyG8Ap/44q2aOBne', 1, 'V28vNhyfPxlv5SpVCsINFwrtXUNoDIYUJ61UfPa7WAjNxZDsNTkwTS414C0L', '2026-11-12 00:03:10', '2026-11-12 00:03:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_sections`
--
ALTER TABLE `about_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `hero_sections`
--
ALTER TABLE `hero_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_files`
--
ALTER TABLE `media_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `navigation_items`
--
ALTER TABLE `navigation_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `profile_settings`
--
ALTER TABLE `profile_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_slug_unique` (`slug`),
  ADD KEY `projects_project_category_id_foreign` (`project_category_id`);

--
-- Indexes for table `project_categories`
--
ALTER TABLE `project_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_categories_slug_unique` (`slug`);

--
-- Indexes for table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_images_project_id_foreign` (`project_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_sections`
--
ALTER TABLE `about_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hero_sections`
--
ALTER TABLE `hero_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `navigation_items`
--
ALTER TABLE `navigation_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `profile_settings`
--
ALTER TABLE `profile_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `project_categories`
--
ALTER TABLE `project_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_project_category_id_foreign` FOREIGN KEY (`project_category_id`) REFERENCES `project_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `project_images`
--
ALTER TABLE `project_images`
  ADD CONSTRAINT `project_images_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
