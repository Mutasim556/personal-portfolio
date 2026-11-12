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

interface SocialLinkItem {
    id: number;
    platform: string;
    url: string;
    icon: string;
    order: number;
    is_visible: boolean;
}

interface SocialLinksIndexProps {
    socialLinks: SocialLinkItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Social Links', href: admin.socialLinks.index().url },
];

export default function SocialLinksIndex({ socialLinks }: SocialLinksIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLinkItem | null>(null);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        platform: '',
        url: '',
        icon: 'ri-link',
        order: 0,
        is_visible: true,
    });

    const openCreateDialog = () => {
        setEditingLink(null);
        reset();
        setData({
            platform: '',
            url: '',
            icon: 'ri-link',
            order: socialLinks.length + 1,
            is_visible: true,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (item: SocialLinkItem) => {
        setEditingLink(item);
        setData({
            platform: item.platform,
            url: item.url,
            icon: item.icon,
            order: item.order,
            is_visible: Boolean(item.is_visible),
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            put(admin.socialLinks.update(editingLink.id).url, {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.socialLinks.store().url, {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (item: SocialLinkItem) => {
        if (confirm(`Are you sure you want to delete "${item.platform}" link?`)) {
            destroy(admin.socialLinks.destroy(item.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Social Links" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Social Profiles</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage social media links displayed in the sticky profile card.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Link
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Social Links</CardTitle>
                        <CardDescription>
                            Supported icons use Remixicon class names (e.g. ri-github-fill, ri-twitter-x-line, ri-instagram-line).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Platform</th>
                                        <th className="py-3 px-4">URL</th>
                                        <th className="py-3 px-4">Remixicon Icon</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {socialLinks.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4 font-semibold">{item.platform}</td>
                                            <td className="py-3 px-4 font-mono text-xs text-muted-foreground truncate max-w-xs">
                                                {item.url}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-xs">
                                                <i className={`${item.icon} mr-1 text-base`} /> {item.icon}
                                            </td>
                                            <td className="py-3 px-4">{item.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.socialLinks.update(item.id).url}
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
                                {editingLink ? 'Edit Social Link' : 'Add Social Link'}
                            </DialogTitle>
                            <DialogDescription>
                                Set platform name, destination URL, and Remixicon class name.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform Name</Label>
                                <Input
                                    id="platform"
                                    value={data.platform}
                                    onChange={(e) => setData('platform', e.target.value)}
                                    placeholder="e.g. GitHub"
                                    required
                                />
                                {errors.platform && (
                                    <p className="text-destructive text-xs">{errors.platform}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url">Profile URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="https://github.com/username"
                                    required
                                />
                                {errors.url && <p className="text-destructive text-xs">{errors.url}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">Remixicon Icon Class</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    placeholder="ri-github-fill"
                                    required
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
                                id="link_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this social link is visible on your website header and footer."
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
                                    {processing ? 'Saving...' : 'Save Link'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
