<?php


use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public news route
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Alumni routes
    Route::get('/alumni', [AlumniController::class, 'index']);
    Route::get('/alumni/{id}', [AlumniController::class, 'show']);
    Route::put('/profile', [AlumniController::class, 'updateProfile']);
    Route::get('/batch-years', [AlumniController::class, 'getBatchYears']);
    Route::get('/programs', [AlumniController::class, 'getPrograms']);
    Route::get('/departments', [AlumniController::class, 'getDepartments']);

    // Message routes
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
    Route::get('/messages/conversation/{userId}', [MessageController::class, 'getConversation']);

    // News routes (for authenticated users)
    Route::middleware('admin')->group(function () {
        Route::post('/news', [NewsController::class, 'store']);
        Route::put('/news/{id}', [NewsController::class, 'update']);
        Route::delete('/news/{id}', [NewsController::class, 'destroy']);
    });


    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/admin/dashboard-stats', [AdminDashboardController::class, 'stats']);
    });


    // Admin routes
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('/dashboard-stats', [AdminController::class, 'dashboardStats']);
        Route::get('/pending-registrations', [AdminController::class, 'pendingRegistrations']);
        Route::post('/approve-registration/{id}', [AdminController::class, 'approveRegistration']);
        Route::post('/reject-registration/{id}', [AdminController::class, 'rejectRegistration']);
        Route::get('/alumni-per-program', [AdminController::class, 'alumniPerProgram']);
        Route::get('/alumni-per-batch', [AdminController::class, 'alumniPerBatch']);
        Route::get('/alumni', [AdminController::class, 'getAllAlumni']);
        Route::put('/alumni/{id}', [AdminController::class, 'updateAlumni']);
        Route::delete('/alumni/{id}', [AdminController::class, 'deleteAlumni']);
    });
});