import { Head, Link, useForm } from '@inertiajs/react';
import { Image as ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react';
import { StatusBadgeToggle } from '@/components/admin/StatusToggle';
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
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface ProjectCategoryItem {
    id: number;
    name: string;
    slug: string;
}

interface ProjectItem {
    id: number;
    title: string;
    slug: string;
    category_name: string | null;
    image: string | null;
    image_url?: string | null;
    full_width: boolean;
    is_featured: boolean;
    is_published: boolean;
    order: number;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProjects {
    data: ProjectItem[];
    links: PaginationLinks[];
    total: number;
}

interface ProjectsIndexProps {
    projects: PaginatedProjects;
    categories: ProjectCategoryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Projects', href: admin.projects.index().url },
];

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (project: ProjectItem) => {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            destroy(admin.projects.destroy(project.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Projects" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Portfolio Projects</h1>
                        <p className="text-muted-foreground text-sm">
                            Add, edit, publish, and order works featured in your portfolio showcase.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={admin.projects.create().url}>
                            <Plus className="mr-1.5 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Projects ({projects.total})</CardTitle>
                        <CardDescription>
                            Published projects appear immediately in the Projects section with lightbox viewing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Preview</th>
                                        <th className="py-3 px-4">Project Title</th>
                                        <th className="py-3 px-4">Category</th>
                                        <th className="py-3 px-4">Layout</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((proj) => (
                                        <tr key={proj.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="h-10 w-16 overflow-hidden rounded border bg-muted flex items-center justify-center">
                                                    {proj.image_url || proj.image ? (
                                                        <img
                                                            src={proj.image_url || proj.image!}
                                                            alt={proj.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-4 w-4 text-muted-foreground/40" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-semibold">{proj.title}</div>
                                                <div className="text-xs text-muted-foreground font-mono">
                                                    /{proj.slug}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">
                                                {proj.category_name || 'General'}
                                            </td>
                                            <td className="py-3 px-4 text-xs font-mono">
                                                {proj.full_width ? 'Full (12 col)' : 'Half (6 col)'}
                                            </td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.projects.update(proj.id).url}
                                                    isActive={proj.is_published}
                                                    fieldName="is_published"
                                                    activeLabel="Published"
                                                    inactiveLabel="Draft"
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild variant="ghost" size="icon">
                                                        <Link href={admin.projects.edit(proj.id).url}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(proj)}
                                                    >
                                                        <Trash2 className="text-destructive h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination links */}
                        <div className="flex items-center justify-end gap-2 pt-4">
                            {projects.links.map((link, idx) => (
                                <Button
                                    key={idx}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    asChild={Boolean(link.url)}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
