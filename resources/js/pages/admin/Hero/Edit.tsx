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

interface HeroData {
    badge: string;
    title_line_1: string;
    title_line_2: string | null;
    title_highlight: string;
    description: string;
    primary_button_text: string;
    primary_button_url: string;
    secondary_button_text: string | null;
    secondary_button_url: string | null;
    background_video: string | null;
    profile_image: string | null;
    profile_image_url: string | null;
    background_image: string | null;
    background_image_url: string | null;
    is_visible: boolean;
}

interface HeroEditProps {
    hero: HeroData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Hero Section', href: admin.hero.edit().url },
];

export default function HeroEdit({ hero }: HeroEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        badge: string;
        title_line_1: string;
        title_line_2: string;
        title_highlight: string;
        description: string;
        primary_button_text: string;
        primary_button_url: string;
        secondary_button_text: string;
        secondary_button_url: string;
        background_video: string;
        profile_image_file: File | null;
        background_image_file: File | null;
        remove_profile_image: boolean;
        remove_background_image: boolean;
        is_visible: boolean;
        _method: string;
    }>({
        badge: hero.badge || 'HELLO',
        title_line_1: hero.title_line_1 || '',
        title_line_2: hero.title_line_2 || '',
        title_highlight: hero.title_highlight || '',
        description: hero.description || '',
        primary_button_text: hero.primary_button_text || "Let's Work Together",
        primary_button_url: hero.primary_button_url || '#contact',
        secondary_button_text: hero.secondary_button_text || 'Download Cv',
        secondary_button_url: hero.secondary_button_url || '#resume',
        background_video: hero.background_video || '/theme/video/ball.mp4',
        profile_image_file: null,
        background_image_file: null,
        remove_profile_image: false,
        remove_background_image: false,
        is_visible: Boolean(hero.is_visible),
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.hero.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Hero Section" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
                    <p className="text-muted-foreground text-sm">
                        Configure the headline, intro copy, buttons, and ambient background video.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Content</CardTitle>
                            <CardDescription>
                                Changes will be immediately reflected on your public portfolio homepage.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="badge">Badge Text</Label>
                                <Input
                                    id="badge"
                                    value={data.badge}
                                    onChange={(e) => setData('badge', e.target.value)}
                                    placeholder="e.g. HELLO"
                                    required
                                />
                                {errors.badge && <p className="text-destructive text-xs">{errors.badge}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title_line_1">Headline Line 1</Label>
                                    <Input
                                        id="title_line_1"
                                        value={data.title_line_1}
                                        onChange={(e) => setData('title_line_1', e.target.value)}
                                        placeholder="Helping Businesses"
                                        required
                                    />
                                    {errors.title_line_1 && (
                                        <p className="text-destructive text-xs">{errors.title_line_1}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title_line_2">Headline Line 2</Label>
                                    <Input
                                        id="title_line_2"
                                        value={data.title_line_2}
                                        onChange={(e) => setData('title_line_2', e.target.value)}
                                        placeholder="Grow Through"
                                    />
                                    {errors.title_line_2 && (
                                        <p className="text-destructive text-xs">{errors.title_line_2}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title_highlight">Highlighted Title Text (Theme Colored)</Label>
                                <Input
                                    id="title_highlight"
                                    value={data.title_highlight}
                                    onChange={(e) => setData('title_highlight', e.target.value)}
                                    placeholder="Digital Innovation"
                                    required
                                />
                                {errors.title_highlight && (
                                    <p className="text-destructive text-xs">{errors.title_highlight}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Introduction Paragraph</Label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-destructive text-xs">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary_button_text">Primary Button Text</Label>
                                    <Input
                                        id="primary_button_text"
                                        value={data.primary_button_text}
                                        onChange={(e) => setData('primary_button_text', e.target.value)}
                                        placeholder="Let's Work Together"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="primary_button_url">Primary Button URL</Label>
                                    <Input
                                        id="primary_button_url"
                                        value={data.primary_button_url}
                                        onChange={(e) => setData('primary_button_url', e.target.value)}
                                        placeholder="#contact"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="secondary_button_text">Secondary Button Text</Label>
                                    <Input
                                        id="secondary_button_text"
                                        value={data.secondary_button_text}
                                        onChange={(e) => setData('secondary_button_text', e.target.value)}
                                        placeholder="Download Cv"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="secondary_button_url">Secondary Button URL</Label>
                                    <Input
                                        id="secondary_button_url"
                                        value={data.secondary_button_url}
                                        onChange={(e) => setData('secondary_button_url', e.target.value)}
                                        placeholder="#resume"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="background_video">Background Video Path</Label>
                                <Input
                                    id="background_video"
                                    value={data.background_video}
                                    onChange={(e) => setData('background_video', e.target.value)}
                                    placeholder="/theme/video/ball.mp4"
                                />
                                <p className="text-muted-foreground text-xs">
                                    Available presets: /theme/video/ball.mp4, /theme/video/jely.mp4, /theme/video/code.mp4, /theme/video/world.mp4, /theme/video/ocean.mp4
                                </p>
                            </div>

                            {/* Image Upload Modules */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <ImageUploader
                                    name="profile_image_file"
                                    label="Hero Profile / Avatar Image"
                                    description="Display your profile picture in the hero intro"
                                    currentImageUrl={hero.profile_image_url}
                                    selectedFile={data.profile_image_file}
                                    onChange={(file) => {
                                        setData('profile_image_file', file);
                                        if (file) setData('remove_profile_image', false);
                                    }}
                                    onRemove={() => setData('remove_profile_image', true)}
                                    error={errors.profile_image_file}
                                    aspectRatio="square"
                                />

                                <ImageUploader
                                    name="background_image_file"
                                    label="Hero Background Image (Optional)"
                                    description="Fallback or alternative ambient background photo"
                                    currentImageUrl={hero.background_image_url}
                                    selectedFile={data.background_image_file}
                                    onChange={(file) => {
                                        setData('background_image_file', file);
                                        if (file) setData('remove_background_image', false);
                                    }}
                                    onRemove={() => setData('remove_background_image', true)}
                                    error={errors.background_image_file}
                                    aspectRatio="video"
                                />
                            </div>

                            <StatusField
                                id="hero_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Hero Section Visibility"
                                description="Toggle whether the introductory hero banner is visible on your portfolio homepage."
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
