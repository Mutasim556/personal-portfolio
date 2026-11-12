import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader from '@/components/admin/MultiImageUploader';
import { StatusField } from '@/components/admin/StatusToggle';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface ProjectCategoryItem {
    id: number;
    name: string;
}

interface ProjectsCreateProps {
    categories: ProjectCategoryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Projects', href: admin.projects.index().url },
    { title: 'Create', href: admin.projects.create().url },
];

export default function ProjectsCreate({ categories }: ProjectsCreateProps) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        category_name: string;
        image: string;
        image_file: File | null;
        gallery_files: File[];
        short_description: string;
        description: string;
        project_url: string;
        github_url: string;
        full_width: boolean;
        is_featured: boolean;
        is_published: boolean;
        order: number;
    }>({
        title: '',
        category_name: '',
        image: '',
        image_file: null,
        gallery_files: [],
        short_description: '',
        description: '',
        project_url: '',
        github_url: '',
        full_width: false,
        is_featured: false,
        is_published: true,
        order: 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.projects.store().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Project" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" size="icon">
                        <Link href={admin.projects.index().url}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Project</h1>
                        <p className="text-muted-foreground text-sm">
                            Add a new showcase work to your portfolio.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Set the title, image path, layout width, and categories.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Glød Branding"
                                    required
                                />
                                {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category_name">Category Name</Label>
                                    <Input
                                        id="category_name"
                                        value={data.category_name}
                                        onChange={(e) => setData('category_name', e.target.value)}
                                        placeholder="e.g. Branding & Identity"
                                    />
                                </div>
                            </div>

                            {/* Project Thumbnail Image Upload */}
                            <div className="pt-2">
                                <ImageUploader
                                    name="image_file"
                                    label="Project Thumbnail / Cover Image"
                                    description="Main image displayed on the portfolio grid and lightbox cover"
                                    selectedFile={data.image_file}
                                    onChange={(file) => setData('image_file', file)}
                                    error={errors.image_file}
                                    aspectRatio="video"
                                />
                            </div>

                            {/* Multiple Gallery Images */}
                            <div className="pt-2">
                                <MultiImageUploader
                                    label="Project Gallery Images"
                                    description="Upload additional screenshots or showcase images for lightbox viewing"
                                    newFiles={data.gallery_files}
                                    onNewFilesChange={(files) => setData('gallery_files', files)}
                                    error={errors.gallery_files}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <textarea
                                    id="short_description"
                                    rows={3}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="Brief summary of the work..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="project_url">Demo / Live URL</Label>
                                    <Input
                                        id="project_url"
                                        type="url"
                                        value={data.project_url}
                                        onChange={(e) => setData('project_url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="full_width"
                                        checked={data.full_width}
                                        onChange={(e) => setData('full_width', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="full_width" className="cursor-pointer">
                                        Full Width (12-col)
                                    </Label>
                                </div>

                                <StatusField
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={(val) => setData('is_published', val)}
                                    label="Publish Project"
                                    description="When enabled, this project is visible to visitors on the portfolio."
                                />

                                <StatusField
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={(val) => setData('is_featured', val)}
                                    label="Featured Project"
                                    description="Featured projects receive highlighted placement on the homepage."
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Project'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
