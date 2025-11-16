<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $messages = Message::where('sender_id', $user->id)
            ->orWhere('receiver_id', $user->id)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $message = Message::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $request->receiver_id,
            'subject' => $request->subject,
            'content' => $request->content,
        ]);

        $message->load(['sender', 'receiver']);

        return response()->json($message, 201);
    }

    public function show($id)
    {
        $message = Message::with(['sender', 'receiver'])->findOrFail($id);

        // Mark as read if the current user is the receiver
        if (!$message->is_read && $message->receiver_id === auth()->id()) {
            $message->update(['is_read' => true]);
        }

        return response()->json($message);
    }

    public function markAsRead($id)
    {
        $message = Message::where('receiver_id', auth()->id())
            ->findOrFail($id);

        $message->update(['is_read' => true]);

        return response()->json(['message' => 'Message marked as read']);
    }

    public function getConversation($userId)
    {
        $currentUserId = auth()->id();

        $messages = Message::where(function ($query) use ($currentUserId, $userId) {
            $query->where('sender_id', $currentUserId)
                ->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($currentUserId, $userId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $currentUserId);
        })
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }
}