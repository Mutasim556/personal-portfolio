import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutSection from '@/components/portfolio/AboutSection';
import ContactSection from '@/components/portfolio/ContactSection';
import HeroSection from '@/components/portfolio/HeroSection';
import IconBar from '@/components/portfolio/IconBar';
import ProfileCard from '@/components/portfolio/ProfileCard';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ResumeSection from '@/components/portfolio/ResumeSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import SidebarNavigation from '@/components/portfolio/SidebarNavigation';
import SkillsSection from '@/components/portfolio/SkillsSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import type { PortfolioHomeProps } from '@/types/portfolio';

// Register GSAP ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home({
    profile,
    hero,
    about,
    experiences,
    education = [],
    services,
    skills,
    projects,
    testimonials,
    navigationItems,
    clients,
    flash,
}: PortfolioHomeProps) {
    useEffect(() => {
        // Detect Safari for theme compatibility
        const ua = navigator.userAgent;
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        if (isSafari) {
            document.documentElement.classList.add('safari-browser');
        }

        // GSAP fade-up animations matching original theme
        const fadeElements = document.querySelectorAll('.fade-up-anime');
        fadeElements.forEach((el) => {
            gsap.fromTo(
                el,
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom-=20%',
                        end: 'center 100px',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const seoTitle = profile.seoTitle || `${profile.name} - Portfolio & Web Developer`;
    const seoDesc =
        profile.seoDescription ||
        'A Digital Designer and Web Developer based in Los Angeles. Portfolio showcasing branding, development, and innovative digital solutions.';

    return (
        <PortfolioLayout videoSrc={hero.backgroundVideo}>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDesc} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDesc} />
                <meta property="og:image" content={profile.avatar} />
            </Head>

            <div className="wrapper row">
                {/* Mobile Hamburger + Slide-out Sidebar */}
                <SidebarNavigation items={navigationItems} />

                {/* Left Floating Icon Bar */}
                <IconBar items={navigationItems} />

                {/* Sticky Left Profile Card */}
                <ProfileCard profile={profile} />

                {/* Main Content Side */}
                <div className="content-side col-12 offset-md-1 col-md-10 offset-lg-4 col-lg-7">
                    {/* Hero Section */}
                    <HeroSection hero={hero} />

                    {/* About Section */}
                    <AboutSection about={about} />

                    {/* Resume / Experience Section */}
                    <ResumeSection
                        experiences={experiences}
                        education={education}
                        resumeUrl={profile.resumeUrl}
                    />

                    {/* Services Accordion Section */}
                    <ServicesSection services={services} />

                    {/* Skills Grid Section */}
                    <SkillsSection skills={skills} />

                    {/* Portfolio Projects Section */}
                    <ProjectsSection projects={projects} />

                    {/* Testimonials & Brands Section */}
                    <TestimonialsSection
                        testimonials={testimonials}
                        clients={clients}
                    />

                    {/* Contact Section */}
                    <ContactSection
                        profile={profile}
                        flashMessage={flash?.success}
                    />
                </div>
            </div>
        </PortfolioLayout>
    );
}
