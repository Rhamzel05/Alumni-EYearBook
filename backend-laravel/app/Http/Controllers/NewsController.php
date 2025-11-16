<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::with('author')->published();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $news = $query->orderBy('published_at', 'desc')->paginate(10);

        return response()->json($news);
    }

    public function show($id)
    {
        $news = News::with('author')->published()->findOrFail($id);
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:news,achievement,event,job_opportunity',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $newsData = [
            'title' => $request->title,
            'content' => $request->content,
            'type' => $request->type,
            'author_id' => $request->user()->id,
            'is_published' => $request->boolean('is_published', true),
            'published_at' => $request->boolean('is_published', true) ? now() : null,
        ];

        if ($request->hasFile('image')) {
            $newsData['image'] = $request->file('image')->store('news_images', 'public');
        }

        $news = News::create($newsData);
        $news->load('author');

        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:news,achievement,event,job_opportunity',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $newsData = $request->only(['title', 'content', 'type']);

        if ($request->has('is_published')) {
            $newsData['is_published'] = $request->boolean('is_published');
            $newsData['published_at'] = $request->boolean('is_published') ? now() : null;
        }

        if ($request->hasFile('image')) {
            // Delete old image
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $newsData['image'] = $request->file('image')->store('news_images', 'public');
        }

        $news->update($newsData);
        $news->load('author');

        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);

        // Delete associated image
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }
}