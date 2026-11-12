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

interface NavigationItemData {
    id: number;
    label: string;
    url: string;
    icon: string | null;
    order: number;
    is_visible: boolean;
    is_external: boolean;
}

interface NavigationIndexProps {
    items: NavigationItemData[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Navigation Menu', href: admin.navigation.index().url },
];

export default function NavigationIndex({ items }: NavigationIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NavigationItemData | null>(null);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        label: '',
        url: '',
        icon: 'ri-home-3-line',
        order: 0,
        is_visible: true,
        is_external: false,
    });

    const openCreateDialog = () => {
        setEditingItem(null);
        reset();
        setData({
            label: '',
            url: '#home',
            icon: 'ri-link',
            order: items.length + 1,
            is_visible: true,
            is_external: false,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (item: NavigationItemData) => {
        setEditingItem(item);
        setData({
            label: item.label,
            url: item.url,
            icon: item.icon || 'ri-link',
            order: item.order,
            is_visible: Boolean(item.is_visible),
            is_external: Boolean(item.is_external),
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            put(admin.navigation.update(editingItem.id).url, {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.navigation.store().url, {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (item: NavigationItemData) => {
        if (confirm(`Are you sure you want to delete navigation item "${item.label}"?`)) {
            destroy(admin.navigation.destroy(item.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Navigation Menu" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Navigation & Mobile Menu</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage links in the floating left icon-bar and the mobile slide-out drawer.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Nav Link
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Menu Items</CardTitle>
                        <CardDescription>
                            Each item supports section anchor jumps (e.g. #home, #resume) or external URLs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Label</th>
                                        <th className="py-3 px-4">Target / Anchor</th>
                                        <th className="py-3 px-4">Icon Class</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4 font-semibold">{item.label}</td>
                                            <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                                                {item.url}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-xs">
                                                <i className={`${item.icon} mr-1 text-base`} /> {item.icon}
                                            </td>
                                            <td className="py-3 px-4">{item.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.navigation.update(item.id).url}
                                                    isActive={item.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(item)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(item)}
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

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}
                            </DialogTitle>
                            <DialogDescription>
                                Set menu label, target hash/url, and icon class.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="label">Link Label</Label>
                                <Input
                                    id="label"
                                    value={data.label}
                                    onChange={(e) => setData('label', e.target.value)}
                                    placeholder="e.g. Projects"
                                    required
                                />
                                {errors.label && <p className="text-destructive text-xs">{errors.label}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url">URL / Anchor</Label>
                                <Input
                                    id="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="#portfolio"
                                    required
                                />
                                {errors.url && <p className="text-destructive text-xs">{errors.url}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Remixicon Icon</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="ri-macbook-line"
                                />
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
                                id="nav_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this link is shown in the portfolio header and mobile drawer."
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
                                    {processing ? 'Saving...' : 'Save Item'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
