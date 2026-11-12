import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import { StatusBadgeToggle, StatusField } from '@/components/admin/StatusToggle';
import { Badge } from '@/components/ui/badge';
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

interface SkillItem {
    id: number;
    name: string;
    percentage: number;
    icon: string | null;
    icon_url?: string | null;
    order: number;
    is_visible: boolean;
}

interface SkillsIndexProps {
    skills: SkillItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Skills', href: admin.skills.index().url },
];

export default function SkillsIndex({ skills }: SkillsIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

    const { data, setData, post, delete: destroy, reset, processing, errors } = useForm<{
        name: string;
        percentage: number;
        icon: string;
        icon_file: File | null;
        remove_icon: boolean;
        order: number;
        is_visible: boolean;
        _method?: string;
    }>({
        name: '',
        percentage: 80,
        icon: '',
        icon_file: null,
        remove_icon: false,
        order: 0,
        is_visible: true,
    });

    const openCreateDialog = () => {
        setEditingSkill(null);
        reset();
        setData({
            name: '',
            percentage: 80,
            icon: '',
            icon_file: null,
            remove_icon: false,
            order: skills.length + 1,
            is_visible: true,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (skill: SkillItem) => {
        setEditingSkill(skill);
        setData({
            name: skill.name,
            percentage: skill.percentage,
            icon: skill.icon || '',
            icon_file: null,
            remove_icon: false,
            order: skill.order,
            is_visible: Boolean(skill.is_visible),
            _method: 'PUT',
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSkill) {
            post(admin.skills.update(editingSkill.id).url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.skills.store().url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (skill: SkillItem) => {
        if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
            destroy(admin.skills.destroy(skill.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Skills" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Skills & Superpowers</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage technical skills, proficiency levels, and brand icons.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Skill
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Skill Items</CardTitle>
                        <CardDescription>
                            The skills and percentages below are displayed in the interactive grid on your portfolio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Icon</th>
                                        <th className="py-3 px-4">Skill</th>
                                        <th className="py-3 px-4">Proficiency</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((skill) => (
                                        <tr key={skill.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="h-9 w-9 rounded-lg border bg-muted/40 p-1 flex items-center justify-center">
                                                    {skill.icon_url || skill.icon ? (
                                                        <img
                                                            src={skill.icon_url || skill.icon!}
                                                            alt={skill.name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-4 w-4 text-muted-foreground/40" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">{skill.name}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs">{skill.percentage}%</span>
                                                    <div className="h-2 w-20 rounded-full bg-secondary overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary"
                                                            style={{ width: `${skill.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">{skill.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.skills.update(skill.id).url}
                                                    isActive={skill.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(skill)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(skill)}
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

                {/* Dialog for Add / Edit Skill */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
                            <DialogDescription>
                                Set skill name, percentage, icon image reference, and display order.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Skill Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. React, Laravel, Figma"
                                    required
                                />
                                {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="percentage">Proficiency Percentage (0 - 100)</Label>
                                <Input
                                    id="percentage"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={data.percentage}
                                    onChange={(e) => setData('percentage', parseInt(e.target.value) || 0)}
                                    required
                                />
                                {errors.percentage && (
                                    <p className="text-destructive text-xs">{errors.percentage}</p>
                                )}
                            </div>

                            {/* Skill Icon Uploader */}
                            <ImageUploader
                                name="icon_file"
                                label="Skill Icon / Logo Image"
                                description="PNG or SVG logo icon displayed in the skill cards"
                                currentImageUrl={editingSkill ? (editingSkill.icon_url || editingSkill.icon) : null}
                                selectedFile={data.icon_file}
                                onChange={(file) => {
                                    setData('icon_file', file);
                                    if (file) setData('remove_icon', false);
                                }}
                                onRemove={() => setData('remove_icon', true)}
                                error={errors.icon_file}
                                aspectRatio="square"
                            />

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
                                id="skill_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
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
                                    {processing ? 'Saving...' : 'Save Skill'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
