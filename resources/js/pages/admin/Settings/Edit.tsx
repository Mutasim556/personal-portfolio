import { Head, useForm } from '@inertiajs/react';
import { ImageUploader } from '@/components/admin/ImageUploader';
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

interface SettingsData {
    site_name: string;
    author_name: string;
    author_title: string;
    author_avatar: string | null;
    author_avatar_url?: string | null;
    logo: string | null;
    logo_url?: string | null;
    logo_dark: string | null;
    logo_dark_url?: string | null;
    favicon: string | null;
    favicon_url?: string | null;
    footer_logo: string | null;
    footer_logo_url?: string | null;
    email: string;
    phone: string;
    location: string | null;
    recipient_email: string | null;
    footer_text: string | null;
}

interface SettingsEditProps {
    setting: SettingsData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Website Settings', href: admin.settings.edit().url },
];

export default function SettingsEdit({ setting }: SettingsEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        _method: string;
        site_name: string;
        author_name: string;
        author_title: string;
        email: string;
        phone: string;
        location: string;
        recipient_email: string;
        footer_text: string;
        author_avatar_file: File | null;
        remove_author_avatar: boolean;
        logo_file: File | null;
        remove_logo: boolean;
        logo_dark_file: File | null;
        remove_logo_dark: boolean;
        favicon_file: File | null;
        remove_favicon: boolean;
        footer_logo_file: File | null;
        remove_footer_logo: boolean;
    }>({
        _method: 'PUT',
        site_name: setting.site_name || 'Visiblo Portfolio',
        author_name: setting.author_name || 'Miles Thatcher',
        author_title: setting.author_title || "Web Designer &\nWordPress developer",
        email: setting.email || 'hello@mthatcher.com',
        phone: setting.phone || '+49 493 39 29 23',
        location: setting.location || "1245 Sunset Boulevard,\nLos Angeles, CA 90026",
        recipient_email: setting.recipient_email || 'hello@mthatcher.com',
        footer_text: setting.footer_text || '© 2026 Miles Thatcher. All rights reserved.',
        author_avatar_file: null,
        remove_author_avatar: false,
        logo_file: null,
        remove_logo: false,
        logo_dark_file: null,
        remove_logo_dark: false,
        favicon_file: null,
        remove_favicon: false,
        footer_logo_file: null,
        remove_footer_logo: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.settings.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Website Settings" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Website Settings</h1>
                    <p className="text-muted-foreground text-sm">
                        Configure branding, site identity, author profile image, contact recipient, and footer copy.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Branding and Logos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Branding & Logos</CardTitle>
                            <CardDescription>
                                Upload your portfolio logos and browser favicon.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ImageUploader
                                    name="logo_file"
                                    label="Site Logo (Light Background)"
                                    currentImageUrl={setting.logo_url || setting.logo}
                                    onChange={(file: File | null) => {
                                        setData('logo_file', file);
                                        setData('remove_logo', false);
                                    }}
                                    onRemove={() => {
                                        setData('logo_file', null);
                                        setData('remove_logo', true);
                                    }}
                                    error={errors.logo_file}
                                    aspectRatio="wide"
                                />

                                <ImageUploader
                                    name="logo_dark_file"
                                    label="Site Logo (Dark Background)"
                                    currentImageUrl={setting.logo_dark_url || setting.logo_dark}
                                    onChange={(file: File | null) => {
                                        setData('logo_dark_file', file);
                                        setData('remove_logo_dark', false);
                                    }}
                                    onRemove={() => {
                                        setData('logo_dark_file', null);
                                        setData('remove_logo_dark', true);
                                    }}
                                    error={errors.logo_dark_file}
                                    aspectRatio="wide"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ImageUploader
                                    name="favicon_file"
                                    label="Browser Favicon (.png, .ico, .svg)"
                                    currentImageUrl={setting.favicon_url || setting.favicon}
                                    onChange={(file: File | null) => {
                                        setData('favicon_file', file);
                                        setData('remove_favicon', false);
                                    }}
                                    onRemove={() => {
                                        setData('favicon_file', null);
                                        setData('remove_favicon', true);
                                    }}
                                    error={errors.favicon_file}
                                    aspectRatio="square"
                                />

                                <ImageUploader
                                    name="footer_logo_file"
                                    label="Footer Logo (Optional)"
                                    currentImageUrl={setting.footer_logo_url || setting.footer_logo}
                                    onChange={(file: File | null) => {
                                        setData('footer_logo_file', file);
                                        setData('remove_footer_logo', false);
                                    }}
                                    onRemove={() => {
                                        setData('footer_logo_file', null);
                                        setData('remove_footer_logo', true);
                                    }}
                                    error={errors.footer_logo_file}
                                    aspectRatio="wide"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Author & Bio */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Global Profile & Author Details</CardTitle>
                            <CardDescription>
                                Used across the sticky sidebar bio card, navigation, and portfolio header.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <ImageUploader
                                name="author_avatar_file"
                                label="Author Avatar (Sidebar Profile Photo)"
                                currentImageUrl={setting.author_avatar_url || setting.author_avatar}
                                onChange={(file: File | null) => {
                                    setData('author_avatar_file', file);
                                    setData('remove_author_avatar', false);
                                }}
                                onRemove={() => {
                                    setData('author_avatar_file', null);
                                    setData('remove_author_avatar', true);
                                }}
                                error={errors.author_avatar_file}
                                aspectRatio="square"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author_name">Author Name</Label>
                                    <Input
                                        id="author_name"
                                        value={data.author_name}
                                        onChange={(e) => setData('author_name', e.target.value)}
                                        required
                                    />
                                    {errors.author_name && (
                                        <p className="text-destructive text-xs">{errors.author_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="site_name">Website Name</Label>
                                    <Input
                                        id="site_name"
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author_title">Professional Title</Label>
                                <textarea
                                    id="author_title"
                                    rows={2}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.author_title}
                                    onChange={(e) => setData('author_title', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Display Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Display Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Address / Location</Label>
                                <textarea
                                    id="location"
                                    rows={2}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.location || ''}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipient_email">
                                    Contact Form Destination Email (Where inquiries are sent)
                                </Label>
                                <Input
                                    id="recipient_email"
                                    type="email"
                                    value={data.recipient_email || ''}
                                    onChange={(e) => setData('recipient_email', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="footer_text">Footer Copyright Text</Label>
                                <Input
                                    id="footer_text"
                                    value={data.footer_text || ''}
                                    onChange={(e) => setData('footer_text', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Settings'}
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
