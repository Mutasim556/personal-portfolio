import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MultiImageUploader, { type ExistingGalleryImage } from '@/components/admin/MultiImageUploader';
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

interface ProjectData {
    id: number;
    title: string;
    slug: string;
    category_name: string | null;
    image: string | null;
    image_url?: string | null;
    images?: ExistingGalleryImage[];
    short_description: string | null;
    description: string | null;
    project_url: string | null;
    github_url: string | null;
    full_width: boolean;
    is_featured: boolean;
    is_published: boolean;
    order: number;
}

interface ProjectsEditProps {
    project: ProjectData;
    categories: ProjectCategoryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Projects', href: admin.projects.index().url },
    { title: 'Edit', href: '#' },
];

export default function ProjectsEdit({ project, categories }: ProjectsEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        title: string;
        category_name: string;
        image: string;
        image_file: File | null;
        remove_image: boolean;
        gallery_files: File[];
        remove_gallery_ids: number[];
        short_description: string;
        description: string;
        project_url: string;
        github_url: string;
        full_width: boolean;
        is_featured: boolean;
        is_published: boolean;
        order: number;
        _method: string;
    }>({
        title: project.title || '',
        category_name: project.category_name || '',
        image: project.image || '',
        image_file: null,
        remove_image: false,
        gallery_files: [],
        remove_gallery_ids: [],
        short_description: project.short_description || '',
        description: project.description || '',
        project_url: project.project_url || '',
        github_url: project.github_url || '',
        full_width: Boolean(project.full_width),
        is_featured: Boolean(project.is_featured),
        is_published: Boolean(project.is_published),
        order: project.order || 0,
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.projects.update(project.id).url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project - ${project.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" size="icon">
                        <Link href={admin.projects.index().url}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
                        <p className="text-muted-foreground text-sm">
                            Update project details, images, links, and publication status.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                            <CardDescription>
                                Changes will update the live showcase immediately upon saving.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
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
                                    />
                                </div>
                            </div>

                            {/* Project Thumbnail Image */}
                            <div className="pt-2">
                                <ImageUploader
                                    name="image_file"
                                    label="Project Thumbnail / Main Image"
                                    description="Featured image for portfolio listing and lightbox cover"
                                    currentImageUrl={project.image_url || project.image}
                                    selectedFile={data.image_file}
                                    onChange={(file) => {
                                        setData('image_file', file);
                                        if (file) setData('remove_image', false);
                                    }}
                                    onRemove={() => setData('remove_image', true)}
                                    error={errors.image_file}
                                    aspectRatio="video"
                                />
                            </div>

                            {/* Multiple Gallery Images */}
                            <div className="pt-2">
                                <MultiImageUploader
                                    label="Project Gallery Images"
                                    description="Manage existing images and stage new screenshots for lightbox viewing"
                                    existingImages={project.images || []}
                                    newFiles={data.gallery_files}
                                    onNewFilesChange={(files) => setData('gallery_files', files)}
                                    onRemoveExisting={(id) => {
                                        if (!data.remove_gallery_ids.includes(id)) {
                                            setData('remove_gallery_ids', [...data.remove_gallery_ids, id]);
                                        }
                                    }}
                                    removedExistingIds={data.remove_gallery_ids}
                                    onUndoRemoveExisting={(id) => {
                                        setData(
                                            'remove_gallery_ids',
                                            data.remove_gallery_ids.filter((removedId) => removedId !== id)
                                        );
                                    }}
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
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
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
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                {recentlySuccessful && (
                                    <p className="text-xs text-green-600 font-medium">Saved successfully!</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
