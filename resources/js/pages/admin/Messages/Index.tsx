import { Head, useForm } from '@inertiajs/react';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

interface MessageItem {
    id: number;
    name: string;
    email: string;
    website: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedMessages {
    data: MessageItem[];
    links: PaginationLinks[];
    total: number;
}

interface MessagesIndexProps {
    messages: PaginatedMessages;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: admin.dashboard().url },
    { title: 'Messages', href: admin.messages.index().url },
];

export default function MessagesIndex({ messages }: MessagesIndexProps) {
    const { patch, delete: destroy } = useForm();

    const markAsRead = (id: number) => {
        patch(admin.messages.read(id).url);
    };

    const markAsUnread = (id: number) => {
        patch(admin.messages.unread(id).url);
    };

    const handleDelete = (msg: MessageItem) => {
        if (confirm(`Are you sure you want to delete message from "${msg.name}"?`)) {
            destroy(admin.messages.destroy(msg.id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Contact Inquiries</h1>
                    <p className="text-muted-foreground text-sm">
                        View and manage client inquiries submitted via your website contact form.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Received Inquiries ({messages.total})</CardTitle>
                        <CardDescription>
                            All messages are captured securely in MySQL and emailed to your recipient address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messages.data.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground text-sm">
                                No inquiries received yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.data.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`rounded-lg border p-4 transition-colors ${
                                            msg.is_read ? 'bg-card' : 'bg-muted/40 border-primary/30'
                                        }`}
                                    >
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{msg.name}</span>
                                                <Badge
                                                    variant={msg.is_read ? 'secondary' : 'default'}
                                                    className="text-xs"
                                                >
                                                    {msg.is_read ? 'Read' : 'New'}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{msg.created_at}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        msg.is_read ? markAsUnread(msg.id) : markAsRead(msg.id)
                                                    }
                                                    title={msg.is_read ? 'Mark unread' : 'Mark read'}
                                                >
                                                    {msg.is_read ? (
                                                        <Mail className="h-4 w-4" />
                                                    ) : (
                                                        <MailOpen className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => handleDelete(msg)}
                                                    title="Delete message"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-xs text-muted-foreground">
                                            <a
                                                href={`mailto:${msg.email}`}
                                                className="underline hover:text-foreground"
                                            >
                                                {msg.email}
                                            </a>
                                            {msg.website && (
                                                <span className="ml-3">
                                                    Website:{' '}
                                                    <a
                                                        href={msg.website}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="underline hover:text-foreground"
                                                    >
                                                        {msg.website}
                                                    </a>
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-3 text-sm whitespace-pre-wrap rounded bg-muted/60 p-3">
                                            {msg.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
