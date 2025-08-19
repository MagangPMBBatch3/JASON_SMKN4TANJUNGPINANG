<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\UserProfileController;
Route::get('/login', [AuthController::class, 'showLogin']) ->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
    Route::get('/bagian', [AuthController::class, 'bagian'])->name('bagian');
    Route::get('/level', [AuthController::class, 'level'])->name('level');
    Route::get('/status', [AuthController::class, 'status'])->name('status');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::get('/proyek', [AuthController::class, 'proyek'])->name('proyek');
    Route::get('/jenis_pesan', [AuthController::class, 'jenis_pesan'])->name('jenis_pesan');
    Route::get('/mode_jam_kerja', [AuthController::class, 'mode_jam_kerja'])->name('mode_jam_kerja');
    Route::get('/status_jam_kerja', [AuthController::class, 'status_jam_kerja'])->name('status_jam_kerja');
    Route::get('/dashboard', [UserProfileController::class, 'index'])->name('dashboard');
    Route::get('profile', [UserProfileController::class, 'show'])->name('profile');
    Route::post('userprofile/update', [UserProfileController::class, 'update'])->name('userprofile.update');

});
 Route::get('/register', [AuthController::class, 'register'])->name('register');
 Route::post('/register', [AuthController::class, 'registerPost']);


