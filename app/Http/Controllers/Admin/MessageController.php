<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $messages = ContactMessage::latest()->paginate(15);

        return Inertia::render('admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function markAsRead(ContactMessage $message): RedirectResponse
    {
        $message->update(['is_read' => true]);

        return back()->with('success', 'Message marked as read.');
    }

    public function markAsUnread(ContactMessage $message): RedirectResponse
    {
        $message->update(['is_read' => false]);

        return back()->with('success', 'Message marked as unread.');
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message deleted successfully.');
    }
}
