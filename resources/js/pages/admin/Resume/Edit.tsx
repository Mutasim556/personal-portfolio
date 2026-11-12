import { Head, useForm } from '@inertiajs/react';
import { Download, FileText } from 'lucide-react';
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

interface SettingData {
    resume_file: string | null;
    resume_url: string | null;
}

interface ResumeEditProps {
    setting: SettingData;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Resume / CV', href: admin.resume.edit().url },
];

export default function ResumeEdit({ setting }: ResumeEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        resume_file: File | null;
        resume_url: string;
        _method: string;
    }>({
        resume_file: null,
        resume_url: setting.resume_url || '',
        _method: 'PUT',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.resume.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Resume / CV" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Resume / CV Document</h1>
                    <p className="text-muted-foreground text-sm">
                        Upload your PDF resume or provide an external link for the Download CV button.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Resume File & Settings</CardTitle>
                            <CardDescription>
                                When visitors click &quot;Download Cv&quot; in the Hero section, this file will be delivered.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {setting.resume_file && (
                                <div className="rounded-lg border p-4 bg-muted/30 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="font-semibold text-sm">Current Active Resume File</p>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {setting.resume_file}
                                            </p>
                                        </div>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <a
                                            href="/personal-portfolio/resume/download"
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                        >
                                            <Download className="mr-1.5 h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="resume_file">Upload New Resume (PDF, DOC, DOCX - max 10MB)</Label>
                                <Input
                                    id="resume_file"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setData('resume_file', e.target.files ? e.target.files[0] : null)}
                                />
                                {errors.resume_file && (
                                    <p className="text-destructive text-xs">{errors.resume_file}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resume_url">Alternative Resume URL / Section Anchor</Label>
                                <Input
                                    id="resume_url"
                                    value={data.resume_url}
                                    onChange={(e) => setData('resume_url', e.target.value)}
                                    placeholder="#resume or https://drive.google.com/..."
                                />
                                <p className="text-xs text-muted-foreground">
                                    Used as fallback when no PDF file is uploaded. Default is #resume to scroll to the timeline.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Update Resume'}
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
