<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        User::create([
            'student_number' => 'admin001',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@minstateu.edu.ph',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'status' => 'approved',
            'college_department' => 'Administration',
            'program' => 'Administration',
            'batch_year' => date('Y'),
        ]);

        // You can add more sample data here
    }
}