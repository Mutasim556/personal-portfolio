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

interface SeoData {
    seo_title: string | null;
    seo_description: string | null;
    seo_og_image: string | null;
    seo_og_image_url?: string | null;
}

interface SeoEditProps {
    setting: SeoData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'SEO Settings', href: admin.seo.edit().url },
];

export default function SeoEdit({ setting }: SeoEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        _method: string;
        seo_title: string;
        seo_description: string;
        seo_og_image_file: File | null;
        remove_seo_og_image: boolean;
    }>({
        _method: 'PUT',
        seo_title: setting.seo_title || 'Miles Thatcher - Portfolio & Web Developer',
        seo_description:
            setting.seo_description ||
            'A Digital Designer and Web Developer based in Los Angeles. Portfolio showcasing branding, development, and innovative digital solutions.',
        seo_og_image_file: null,
        remove_seo_og_image: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.seo.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SEO Settings" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">SEO & Social Sharing</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage search engine meta tags and Open Graph social preview cards.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata Configuration</CardTitle>
                            <CardDescription>
                                These values will populate HTML &lt;title&gt;, meta description, and og:image tags.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="seo_title">Default Meta Title</Label>
                                <Input
                                    id="seo_title"
                                    value={data.seo_title}
                                    onChange={(e) => setData('seo_title', e.target.value)}
                                    placeholder="Miles Thatcher - Portfolio"
                                    required
                                />
                                {errors.seo_title && (
                                    <p className="text-destructive text-xs">{errors.seo_title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seo_description">Default Meta Description</Label>
                                <textarea
                                    id="seo_description"
                                    rows={3}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.seo_description}
                                    onChange={(e) => setData('seo_description', e.target.value)}
                                    required
                                />
                                {errors.seo_description && (
                                    <p className="text-destructive text-xs">{errors.seo_description}</p>
                                )}
                            </div>

                            <ImageUploader
                                name="seo_og_image_file"
                                label="Social Sharing Image (og:image)"
                                currentImageUrl={setting.seo_og_image_url || setting.seo_og_image}
                                onChange={(file: File | null) => {
                                    setData('seo_og_image_file', file);
                                    setData('remove_seo_og_image', false);
                                }}
                                onRemove={() => {
                                    setData('seo_og_image_file', null);
                                    setData('remove_seo_og_image', true);
                                }}
                                error={errors.seo_og_image_file}
                                aspectRatio="wide"
                            />

                            <div className="flex items-center gap-3 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save SEO'}
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
