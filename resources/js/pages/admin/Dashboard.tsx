import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    CheckCircle2,
    Clock,
    Globe,
    Layers,
    Mail,
    Plus,
    Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface DashboardStats {
    totalProjects: number;
    publishedProjects: number;
    totalSkills: number;
    totalServices: number;
    totalTestimonials: number;
    unreadMessages: number;
    totalMessages: number;
    totalExperiences: number;
}

interface RecentMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface RecentProject {
    id: number;
    title: string;
    category_name: string | null;
    is_published: boolean;
    created_at: string;
}

interface DashboardProps {
    stats: DashboardStats;
    recentMessages: RecentMessage[];
    recentProjects: RecentProject[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
];

export default function Dashboard({
    stats,
    recentMessages,
    recentProjects,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Top Welcome Card */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Portfolio CMS Overview
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Manage your dynamic portfolio content, projects, and inquiries.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="outline">
                            <a href="/personal-portfolio/" target="_blank" rel="noreferrer">
                                <Globe className="mr-1.5 h-4 w-4" />
                                Live Portfolio
                            </a>
                        </Button>
                        <Button asChild size="sm">
                            <Link href={admin.projects.create().url}>
                                <Plus className="mr-1.5 h-4 w-4" />
                                New Project
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistic Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Projects</CardTitle>
                            <Layers className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProjects}</div>
                            <p className="text-muted-foreground text-xs">
                                {stats.publishedProjects} published on website
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Skills</CardTitle>
                            <Sparkles className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalSkills}</div>
                            <p className="text-muted-foreground text-xs">Active technical skills</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                            <Mail className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalMessages}</div>
                            <p className="text-muted-foreground text-xs">
                                {stats.unreadMessages} unread messages
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Services</CardTitle>
                            <Briefcase className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalServices}</div>
                            <p className="text-muted-foreground text-xs">Offered services</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid: Recent Messages & Recent Projects */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Inquiries */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Inquiries</CardTitle>
                                <CardDescription>
                                    Latest messages sent through the portfolio contact form
                                </CardDescription>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={admin.messages.index().url}>View all</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {recentMessages.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No messages received yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="flex items-start justify-between rounded-lg border p-3 text-sm"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{msg.name}</span>
                                                    {!msg.is_read && (
                                                        <Badge variant="destructive" className="text-[10px] px-1 py-0">
                                                            New
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground text-xs">{msg.email}</p>
                                                <p className="line-clamp-2 text-xs">{msg.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Latest Projects */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Latest Projects</CardTitle>
                                <CardDescription>Recently updated portfolio works</CardDescription>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={admin.projects.index().url}>View all</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {recentProjects.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No projects created yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {recentProjects.map((proj) => (
                                        <div
                                            key={proj.id}
                                            className="flex items-center justify-between rounded-lg border p-3 text-sm"
                                        >
                                            <div className="space-y-1">
                                                <p className="font-semibold">{proj.title}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {proj.category_name || 'General'}
                                                </p>
                                            </div>
                                            <div>
                                                {proj.is_published ? (
                                                    <Badge variant="default" className="gap-1 text-xs">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Published
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="gap-1 text-xs">
                                                        <Clock className="h-3 w-3" />
                                                        Draft
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
