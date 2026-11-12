import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { StatusBadgeToggle, StatusField } from '@/components/admin/StatusToggle';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface ExperienceItem {
    id: number;
    title: string;
    company: string;
    dates: string;
    description: string | null;
    order: number;
    is_visible: boolean;
}

interface ExperiencesIndexProps {
    experiences: ExperienceItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Experiences', href: admin.experiences.index().url },
];

export default function ExperiencesIndex({ experiences }: ExperiencesIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        title: '',
        company: '',
        dates: '',
        description: '',
        order: 0,
        is_visible: true,
    });

    const openCreateDialog = () => {
        setEditingExp(null);
        reset();
        setData({
            title: '',
            company: '',
            dates: '',
            description: '',
            order: experiences.length + 1,
            is_visible: true,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (exp: ExperienceItem) => {
        setEditingExp(exp);
        setData({
            title: exp.title,
            company: exp.company,
            dates: exp.dates,
            description: exp.description || '',
            order: exp.order,
            is_visible: Boolean(exp.is_visible),
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingExp) {
            put(admin.experiences.update(editingExp.id).url, {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.experiences.store().url, {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (exp: ExperienceItem) => {
        if (confirm(`Are you sure you want to delete "${exp.title} at ${exp.company}"?`)) {
            destroy(admin.experiences.destroy(exp.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Experiences" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Work Experience</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage the job history and timeline entries displayed in your Resume section.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Experience
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Experience Timeline</CardTitle>
                        <CardDescription>
                            Past and current professional roles displayed on the portfolio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Role / Title</th>
                                        <th className="py-3 px-4">Company</th>
                                        <th className="py-3 px-4">Period / Dates</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiences.map((exp) => (
                                        <tr key={exp.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4 font-semibold">{exp.title}</td>
                                            <td className="py-3 px-4 text-muted-foreground">{exp.company}</td>
                                            <td className="py-3 px-4 font-mono text-xs">{exp.dates}</td>
                                            <td className="py-3 px-4">{exp.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.experiences.update(exp.id).url}
                                                    isActive={exp.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(exp)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(exp)}
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
                    </CardContent>
                </Card>

                {/* Dialog for Add / Edit Experience */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingExp ? 'Edit Experience' : 'Add New Experience'}
                            </DialogTitle>
                            <DialogDescription>
                                Set job title, company name, employment dates, and display order.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title / Role</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Senior Frontend Engineer"
                                    required
                                />
                                {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company / Organization</Label>
                                <Input
                                    id="company"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    placeholder="e.g. PixelLab Interactive"
                                    required
                                />
                                {errors.company && (
                                    <p className="text-destructive text-xs">{errors.company}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dates">Work Dates</Label>
                                <Input
                                    id="dates"
                                    value={data.dates}
                                    onChange={(e) => setData('dates', e.target.value)}
                                    placeholder="e.g. January 2021 – Present"
                                    required
                                />
                                {errors.dates && <p className="text-destructive text-xs">{errors.dates}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order">Sort Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                />
                            </div>

                            <StatusField
                                id="exp_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this experience item will be displayed publicly on your resume."
                            />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Experience'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
