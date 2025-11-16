<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AlumniController extends Controller
{
    public function index(Request $request)
    {
        $query = User::alumni()->approved();

        // Search filters
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                    ->orWhere('last_name', 'like', '%' . $request->search . '%')
                    ->orWhere('student_number', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('batch_year') && $request->batch_year) {
            $query->where('batch_year', $request->batch_year);
        }

        if ($request->has('program') && $request->program) {
            $query->where('program', $request->program);
        }

        if ($request->has('department') && $request->department) {
            $query->where('college_department', $request->department);
        }

        $alumni = $query->paginate(12);

        return response()->json($alumni);
    }

    public function show($id)
    {
        $alumni = User::alumni()->approved()->findOrFail($id);
        return response()->json($alumni);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'phone_number' => 'nullable|string',
            'address' => 'nullable|string',
            'current_job_title' => 'nullable|string',
            'company_name' => 'nullable|string',
            'thesis_title' => 'nullable|string',
            'awards' => 'nullable|string',
            'bio' => 'nullable|string|max:1000',
            'facebook_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'portfolio_website' => 'nullable|url',
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            if ($user->profile_picture) {
                Storage::delete($user->profile_picture);
            }
            $validated['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $user->update($validated);

        return response()->json($user);
    }

    public function getBatchYears()
    {
        $years = User::alumni()->approved()
            ->distinct('batch_year')
            ->pluck('batch_year')
            ->sort();

        return response()->json($years);
    }

    public function getPrograms()
    {
        $programs = User::alumni()->approved()
            ->distinct('program')
            ->pluck('program')
            ->sort();

        return response()->json($programs);
    }

    public function getDepartments()
    {
        $departments = User::alumni()->approved()
            ->distinct('college_department')
            ->pluck('college_department')
            ->sort();

        return response()->json($departments);
    }
}