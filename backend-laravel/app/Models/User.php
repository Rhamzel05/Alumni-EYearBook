<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'student_number',
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'password',
        'role',
        'status',
        'profile_picture',
        'phone_number',
        'address',
        'current_job_title',
        'company_name',
        'college_department',
        'program',
        'batch_year',
        'section',
        'thesis_title',
        'awards',
        'bio',
        'facebook_url',
        'linkedin_url',
        'portfolio_website',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];

    // Relationships
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function news()
    {
        return $this->hasMany(News::class, 'author_id');
    }

    // Scopes
    public function scopeAlumni($query)
    {
        return $query->where('role', 'alumni');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeByBatch($query, $batchYear)
    {
        return $query->where('batch_year', $batchYear);
    }

    public function scopeByProgram($query, $program)
    {
        return $query->where('program', $program);
    }

    // Methods
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isApproved()
    {
        return $this->status === 'approved';
    }
}