import { Head, router, useForm } from '@inertiajs/react';
import { Briefcase, ImageIcon, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';
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

interface ServiceItem {
    id: number;
    name: string;
    description: string;
    icon: string | null;
    image: string | null;
    image_url?: string | null;
    order: number;
    is_visible: boolean;
}

interface ServicesIndexProps {
    services: ServiceItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Services', href: admin.services.index().url },
];

export default function ServicesIndex({ services }: ServicesIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<{
        _method: string;
        name: string;
        description: string;
        order: number;
        is_visible: boolean;
        image_file: File | null;
        remove_image: boolean;
    }>({
        _method: 'POST',
        name: '',
        description: '',
        order: 0,
        is_visible: true,
        image_file: null,
        remove_image: false,
    });

    const openCreateDialog = () => {
        setEditingService(null);
        reset();
        setData({
            _method: 'POST',
            name: '',
            description: '',
            order: services.length + 1,
            is_visible: true,
            image_file: null,
            remove_image: false,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (service: ServiceItem) => {
        setEditingService(service);
        setData({
            _method: 'PUT',
            name: service.name,
            description: service.description,
            order: service.order,
            is_visible: Boolean(service.is_visible),
            image_file: null,
            remove_image: false,
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            post(admin.services.update(editingService.id).url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.services.store().url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (service: ServiceItem) => {
        if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
            router.delete(admin.services.destroy(service.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Services" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Services & Offerings</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage the accordion offerings presented in your Services section.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Service
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Services Accordion Items</CardTitle>
                        <CardDescription>
                            Each service expands with description copy and optional visual banner in the portfolio layout.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Image</th>
                                        <th className="py-3 px-4">Service Name</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service) => (
                                        <tr key={service.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="h-10 w-14 rounded-md border bg-muted/40 overflow-hidden flex items-center justify-center">
                                                    {service.image_url || service.image ? (
                                                        <img
                                                            src={service.image_url || service.image!}
                                                            alt={service.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Briefcase className="h-4 w-4 text-muted-foreground/40" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">{service.name}</td>
                                            <td className="py-3 px-4 text-muted-foreground max-w-md truncate">
                                                {service.description}
                                            </td>
                                            <td className="py-3 px-4">{service.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.services.update(service.id).url}
                                                    isActive={service.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(service)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(service)}
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
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                            <DialogDescription>
                                Set the service title, optional banner image, description, and display order.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <ImageUploader
                                name="image_file"
                                label="Service Image / Banner (Optional)"
                                currentImageUrl={editingService?.image_url || editingService?.image}
                                onChange={(file: File | null) => {
                                    setData('image_file', file);
                                    setData('remove_image', false);
                                }}
                                onRemove={() => {
                                    setData('image_file', null);
                                    setData('remove_image', true);
                                }}
                                error={errors.image_file}
                                aspectRatio="video"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="name">Service Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Web Design & Development"
                                    required
                                />
                                {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Service Description</Label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe this service offering..."
                                    required
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
                                id="service_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this service card is visible in the Services section."
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
                                    {processing ? 'Saving...' : 'Save Service'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
