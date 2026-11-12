import { Head, router, useForm } from '@inertiajs/react';
import { GraduationCap, Pencil, Plus, Trash2 } from 'lucide-react';
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

interface EducationItem {
    id: number;
    degree: string;
    institution: string;
    years: string;
    description: string | null;
    order: number;
    is_visible: boolean;
}

interface EducationIndexProps {
    education: EducationItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Education', href: admin.education.index().url },
];

export default function EducationIndex({ education }: EducationIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        degree: '',
        institution: '',
        years: '',
        description: '',
        order: 0,
        is_visible: true,
    });

    const openCreateDialog = () => {
        setEditingEdu(null);
        reset();
        setData({
            degree: '',
            institution: '',
            years: '',
            description: '',
            order: education.length + 1,
            is_visible: true,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (edu: EducationItem) => {
        setEditingEdu(edu);
        setData({
            degree: edu.degree,
            institution: edu.institution,
            years: edu.years,
            description: edu.description || '',
            order: edu.order,
            is_visible: Boolean(edu.is_visible),
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEdu) {
            put(admin.education.update(editingEdu.id).url, {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.education.store().url, {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (edu: EducationItem) => {
        if (confirm(`Are you sure you want to delete "${edu.degree} from ${edu.institution}"?`)) {
            router.delete(admin.education.destroy(edu.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Education" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Academic Education</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage degrees, diplomas, institutions, and academic qualifications.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Qualification
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Academic Qualifications</CardTitle>
                        <CardDescription>
                            All visible education qualifications appear on your public Resume section timeline.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Degree / Qualification</th>
                                        <th className="py-3 px-4">Institution</th>
                                        <th className="py-3 px-4">Passing / Years</th>
                                        <th className="py-3 px-4">Grade / CGPA</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {education.map((edu) => (
                                        <tr key={edu.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4 font-semibold flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                                                <span>{edu.degree}</span>
                                            </td>
                                            <td className="py-3 px-4">{edu.institution}</td>
                                            <td className="py-3 px-4 font-mono text-xs">{edu.years}</td>
                                            <td className="py-3 px-4 text-muted-foreground text-xs">
                                                {edu.description || '-'}
                                            </td>
                                            <td className="py-3 px-4">{edu.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.education.update(edu.id).url}
                                                    isActive={edu.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(edu)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(edu)}
                                                    >
                                                        <Trash2 className="text-destructive h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {education.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No education records yet. Click &quot;Add Qualification&quot; to add one.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingEdu ? 'Edit Qualification' : 'Add New Qualification'}
                            </DialogTitle>
                            <DialogDescription>
                                Set the degree name, institution, passing year, and CGPA/grade.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="degree">Degree / Qualification</Label>
                                <Input
                                    id="degree"
                                    value={data.degree}
                                    onChange={(e) => setData('degree', e.target.value)}
                                    placeholder="e.g. B.Sc. in Computer Science and Engineering"
                                    required
                                />
                                {errors.degree && <p className="text-destructive text-xs">{errors.degree}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="institution">Institution / University / College</Label>
                                <Input
                                    id="institution"
                                    value={data.institution}
                                    onChange={(e) => setData('institution', e.target.value)}
                                    placeholder="e.g. Daffodil International University"
                                    required
                                />
                                {errors.institution && (
                                    <p className="text-destructive text-xs">{errors.institution}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="years">Passing Year / Academic Period</Label>
                                <Input
                                    id="years"
                                    value={data.years}
                                    onChange={(e) => setData('years', e.target.value)}
                                    placeholder="e.g. 2017 – 2021 (Passing Year: 2021)"
                                    required
                                />
                                {errors.years && <p className="text-destructive text-xs">{errors.years}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Result / CGPA / Notes</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="e.g. CGPA: 3.68 out of 4.00"
                                />
                                {errors.description && (
                                    <p className="text-destructive text-xs">{errors.description}</p>
                                )}
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
                                id="edu_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this qualification is displayed publicly on your resume."
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
                                    {processing ? 'Saving...' : 'Save Qualification'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
