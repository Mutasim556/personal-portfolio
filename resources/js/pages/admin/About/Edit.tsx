import { Head, useForm } from '@inertiajs/react';
import ImageUploader from '@/components/admin/ImageUploader';
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

interface AboutData {
    badge: string;
    title_primary: string;
    title_highlight: string;
    paragraph_1: string;
    paragraph_2: string | null;
    image: string | null;
    image_url: string | null;
    is_visible: boolean;
}

interface AboutEditProps {
    about: AboutData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'About Section', href: admin.about.edit().url },
];

export default function AboutEdit({ about }: AboutEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        badge: string;
        title_primary: string;
        title_highlight: string;
        paragraph_1: string;
        paragraph_2: string;
        image_file: File | null;
        remove_image: boolean;
        is_visible: boolean;
        _method: string;
    }>({
        badge: about.badge || 'ABOUT',
        title_primary: about.title_primary || 'My Journey & ',
        title_highlight: about.title_highlight || 'Vision',
        paragraph_1: about.paragraph_1 || '',
        paragraph_2: about.paragraph_2 || '',
        image_file: null,
        remove_image: false,
        is_visible: Boolean(about.is_visible),
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.about.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About Section" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">About Section</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage your personal story, journey, and professional vision.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>About Content</CardTitle>
                            <CardDescription>
                                Modify the text content displayed in the About section of the portfolio.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="badge">Badge Text</Label>
                                <Input
                                    id="badge"
                                    value={data.badge}
                                    onChange={(e) => setData('badge', e.target.value)}
                                    placeholder="ABOUT"
                                    required
                                />
                                {errors.badge && <p className="text-destructive text-xs">{errors.badge}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title_primary">Title Prefix</Label>
                                    <Input
                                        id="title_primary"
                                        value={data.title_primary}
                                        onChange={(e) => setData('title_primary', e.target.value)}
                                        placeholder="My Journey & "
                                        required
                                    />
                                    {errors.title_primary && (
                                        <p className="text-destructive text-xs">{errors.title_primary}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title_highlight">Title Highlight (Theme Color)</Label>
                                    <Input
                                        id="title_highlight"
                                        value={data.title_highlight}
                                        onChange={(e) => setData('title_highlight', e.target.value)}
                                        placeholder="Vision"
                                        required
                                    />
                                    {errors.title_highlight && (
                                        <p className="text-destructive text-xs">{errors.title_highlight}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="paragraph_1">First Paragraph</Label>
                                <textarea
                                    id="paragraph_1"
                                    rows={4}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.paragraph_1}
                                    onChange={(e) => setData('paragraph_1', e.target.value)}
                                    required
                                />
                                {errors.paragraph_1 && (
                                    <p className="text-destructive text-xs">{errors.paragraph_1}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="paragraph_2">Second Paragraph</Label>
                                <textarea
                                    id="paragraph_2"
                                    rows={4}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.paragraph_2}
                                    onChange={(e) => setData('paragraph_2', e.target.value)}
                                />
                                {errors.paragraph_2 && (
                                    <p className="text-destructive text-xs">{errors.paragraph_2}</p>
                                )}
                            </div>

                            {/* About Image Upload */}
                            <div className="pt-2">
                                <ImageUploader
                                    name="image_file"
                                    label="About Profile / Story Image"
                                    description="Display a personal or team portrait in your About section"
                                    currentImageUrl={about.image_url}
                                    selectedFile={data.image_file}
                                    onChange={(file) => {
                                        setData('image_file', file);
                                        if (file) setData('remove_image', false);
                                    }}
                                    onRemove={() => setData('remove_image', true)}
                                    error={errors.image_file}
                                    aspectRatio="square"
                                />
                            </div>

                            <StatusField
                                id="about_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="About Section Visibility"
                                description="Toggle whether the About Me story and profile section is visible on your portfolio homepage."
                            />

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
