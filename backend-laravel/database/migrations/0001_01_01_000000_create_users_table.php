<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('student_number')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['admin', 'alumni'])->default('alumni');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('profile_picture')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
            $table->string('current_job_title')->nullable();
            $table->string('company_name')->nullable();
            $table->string('college_department');
            $table->string('program');
            $table->integer('batch_year');
            $table->string('section')->nullable();
            $table->string('thesis_title')->nullable();
            $table->text('awards')->nullable();
            $table->text('bio')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('portfolio_website')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};