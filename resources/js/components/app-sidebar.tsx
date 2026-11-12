import { Link } from '@inertiajs/react';
import {
    Briefcase,
    FileText,
    Globe,
    GraduationCap,
    Home,
    LayoutDashboard,
    Layers,
    Mail,
    MessageSquare,
    Navigation,
    Search,
    Settings,
    Share2,
    Sparkles,
    User,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

const cmsNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard().url,
        icon: LayoutDashboard,
    },
    {
        title: 'Hero Section',
        href: admin.hero.edit().url,
        icon: Home,
    },
    {
        title: 'About Me',
        href: admin.about.edit().url,
        icon: User,
    },
    {
        title: 'Skills',
        href: admin.skills.index().url,
        icon: Sparkles,
    },
    {
        title: 'Experience',
        href: admin.experiences.index().url,
        icon: Briefcase,
    },
    {
        title: 'Education',
        href: admin.education.index().url,
        icon: GraduationCap,
    },
    {
        title: 'Projects',
        href: admin.projects.index().url,
        icon: Layers,
    },
    {
        title: 'Services',
        href: admin.services.index().url,
        icon: Globe,
    },
    {
        title: 'Testimonials',
        href: admin.testimonials.index().url,
        icon: MessageSquare,
    },
    {
        title: 'Contact Messages',
        href: admin.messages.index().url,
        icon: Mail,
    },
    {
        title: 'Social Links',
        href: admin.socialLinks.index().url,
        icon: Share2,
    },
    {
        title: 'Resume / CV',
        href: admin.resume.edit().url,
        icon: FileText,
    },
    {
        title: 'Navigation Menu',
        href: admin.navigation.index().url,
        icon: Navigation,
    },
    {
        title: 'SEO Settings',
        href: admin.seo.edit().url,
        icon: Search,
    },
    {
        title: 'Website Settings',
        href: admin.settings.edit().url,
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={cmsNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={[
                        {
                            title: 'View Portfolio',
                            href: '/personal-portfolio/',
                            icon: Globe,
                        },
                    ]}
                    className="mt-auto"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
