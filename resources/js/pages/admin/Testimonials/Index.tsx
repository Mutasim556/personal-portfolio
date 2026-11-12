import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, User } from 'lucide-react';
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

interface TestimonialItem {
    id: number;
    author: string;
    quote: string;
    company: string | null;
    designation: string | null;
    avatar: string | null;
    avatar_url?: string | null;
    order: number;
    is_visible: boolean;
}

interface TestimonialsIndexProps {
    testimonials: TestimonialItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Testimonials', href: admin.testimonials.index().url },
];

export default function TestimonialsIndex({ testimonials }: TestimonialsIndexProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

    const { data, setData, post, reset, processing, errors } = useForm<{
        _method: string;
        author: string;
        quote: string;
        company: string;
        designation: string;
        order: number;
        is_visible: boolean;
        avatar_file: File | null;
        remove_avatar: boolean;
    }>({
        _method: 'POST',
        author: '',
        quote: '',
        company: '',
        designation: '',
        order: 0,
        is_visible: true,
        avatar_file: null,
        remove_avatar: false,
    });

    const openCreateDialog = () => {
        setEditingTestimonial(null);
        reset();
        setData({
            _method: 'POST',
            author: '',
            quote: '',
            company: '',
            designation: '',
            order: testimonials.length + 1,
            is_visible: true,
            avatar_file: null,
            remove_avatar: false,
        });
        setDialogOpen(true);
    };

    const openEditDialog = (t: TestimonialItem) => {
        setEditingTestimonial(t);
        setData({
            _method: 'PUT',
            author: t.author,
            quote: t.quote,
            company: t.company || '',
            designation: t.designation || '',
            order: t.order,
            is_visible: Boolean(t.is_visible),
            avatar_file: null,
            remove_avatar: false,
        });
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTestimonial) {
            post(admin.testimonials.update(editingTestimonial.id).url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            post(admin.testimonials.store().url, {
                forceFormData: true,
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleDelete = (t: TestimonialItem) => {
        if (confirm(`Are you sure you want to delete testimonial from "${t.author}"?`)) {
            router.delete(admin.testimonials.destroy(t.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Testimonials" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Client Testimonials</h1>
                        <p className="text-muted-foreground text-sm">
                            Manage recommendations and reviews rotating in your testimonial carousel.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Testimonial
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quotes & Reviews</CardTitle>
                        <CardDescription>
                            All active testimonials appear in the continuous Swiper carousel on the public website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="py-3 px-4">Avatar</th>
                                        <th className="py-3 px-4">Author</th>
                                        <th className="py-3 px-4">Role / Company</th>
                                        <th className="py-3 px-4">Quote</th>
                                        <th className="py-3 px-4">Order</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testimonials.map((t) => (
                                        <tr key={t.id} className="border-b hover:bg-muted/50">
                                            <td className="py-3 px-4">
                                                <div className="h-10 w-10 rounded-full border bg-muted/40 overflow-hidden flex items-center justify-center">
                                                    {t.avatar_url || t.avatar ? (
                                                        <img
                                                            src={t.avatar_url || t.avatar!}
                                                            alt={t.author}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="h-4 w-4 text-muted-foreground/40" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">{t.author}</td>
                                            <td className="py-3 px-4 text-muted-foreground text-xs">
                                                {t.designation}
                                                {t.company ? ` at ${t.company}` : ''}
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">
                                                {t.quote}
                                            </td>
                                            <td className="py-3 px-4">{t.order}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadgeToggle
                                                    url={admin.testimonials.update(t.id).url}
                                                    isActive={t.is_visible}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(t)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(t)}
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
                            <DialogTitle>
                                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
                            </DialogTitle>
                            <DialogDescription>
                                Set author photo, name, title, and quotation text.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <ImageUploader
                                name="avatar_file"
                                label="Client Avatar / Photo"
                                currentImageUrl={editingTestimonial?.avatar_url || editingTestimonial?.avatar}
                                onChange={(file: File | null) => {
                                    setData('avatar_file', file);
                                    setData('remove_avatar', false);
                                }}
                                onRemove={() => {
                                    setData('avatar_file', null);
                                    setData('remove_avatar', true);
                                }}
                                error={errors.avatar_file}
                                aspectRatio="square"
                            />

                            <div className="space-y-2">
                                <Label htmlFor="author">Author Name</Label>
                                <Input
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    placeholder="e.g. Kevin Lawson"
                                    required
                                />
                                {errors.author && (
                                    <p className="text-destructive text-xs">{errors.author}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="designation">Designation / Role</Label>
                                    <Input
                                        id="designation"
                                        value={data.designation}
                                        onChange={(e) => setData('designation', e.target.value)}
                                        placeholder="e.g. Product VP"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        placeholder="e.g. TechCorp"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quote">Quotation / Review</Label>
                                <textarea
                                    id="quote"
                                    rows={4}
                                    className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] outline-none"
                                    value={data.quote}
                                    onChange={(e) => setData('quote', e.target.value)}
                                    placeholder="Miles understands that shipping matters..."
                                    required
                                />
                                {errors.quote && (
                                    <p className="text-destructive text-xs">{errors.quote}</p>
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
                                id="testimonial_is_visible"
                                checked={data.is_visible}
                                onChange={(val) => setData('is_visible', val)}
                                label="Visibility on Portfolio"
                                description="When enabled, this testimonial appears in the Testimonials carousel."
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
                                    {processing ? 'Saving...' : 'Save Testimonial'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
