<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware(function ($request, $next) {
            if (!$request->user() || !$request->user()->isAdmin()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return $next($request);
        });
    }

    public function dashboardStats()
    {
        $stats = [
            'total_alumni' => User::alumni()->count(),
            'approved_alumni' => User::alumni()->approved()->count(),
            'pending_alumni' => User::alumni()->where('status', 'pending')->count(),
            'total_batches' => User::alumni()->distinct('batch_year')->count('batch_year'),
            'employment_rate' => User::alumni()->approved()->whereNotNull('current_job_title')->count(),
        ];

        $stats['employment_rate_percentage'] = $stats['approved_alumni'] > 0
            ? round(($stats['employment_rate'] / $stats['approved_alumni']) * 100, 2)
            : 0;

        return response()->json($stats);
    }

    public function pendingRegistrations()
    {
        $pending = User::alumni()->where('status', 'pending')->paginate(10);
        return response()->json($pending);
    }

    public function approveRegistration($id)
    {
        $user = User::alumni()->findOrFail($id);
        $user->update(['status' => 'approved']);

        // Send approval email notification here

        return response()->json(['message' => 'Alumni registration approved']);
    }

    public function rejectRegistration($id)
    {
        $user = User::alumni()->findOrFail($id);
        $user->update(['status' => 'rejected']);

        // Send rejection email notification here

        return response()->json(['message' => 'Alumni registration rejected']);
    }

    public function alumniPerProgram()
    {
        $data = User::alumni()->approved()
            ->select('program', DB::raw('count(*) as count'))
            ->groupBy('program')
            ->get();

        return response()->json($data);
    }

    public function alumniPerBatch()
    {
        $data = User::alumni()->approved()
            ->select('batch_year', DB::raw('count(*) as count'))
            ->groupBy('batch_year')
            ->orderBy('batch_year')
            ->get();

        return response()->json($data);
    }

    public function getAllAlumni(Request $request)
    {
        $query = User::alumni();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $alumni = $query->paginate(20);

        return response()->json($alumni);
    }

    public function updateAlumni(Request $request, $id)
    {
        $user = User::alumni()->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'status' => 'sometimes|in:pending,approved,rejected',
            'current_job_title' => 'nullable|string',
            'company_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    public function deleteAlumni($id)
    {
        $user = User::alumni()->findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Alumni deleted successfully']);
    }
}