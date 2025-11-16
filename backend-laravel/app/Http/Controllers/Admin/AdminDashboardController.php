<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        $totalAlumni = User::where('role', 'alumni')->count();

        $pendingRegistrations = User::where('role', 'alumni')
            ->where('status', 'pending')
            ->count();

        $newThisMonth = User::where('role', 'alumni')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        $activeUsers = User::where('role', 'alumni')
            ->whereNotNull('last_login_at') // adjust if you track differently
            ->count();

        return response()->json([
            'data' => [
                'totalAlumni' => $totalAlumni,
                'pendingRegistrations' => $pendingRegistrations,
                'newThisMonth' => $newThisMonth,
                'activeUsers' => $activeUsers,
            ]
        ], 200);
    }
}
