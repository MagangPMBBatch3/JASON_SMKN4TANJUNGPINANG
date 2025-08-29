    <?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\AuthController\AuthController;
    use App\Http\Controllers\UserProfileController;
    use App\Http\Controllers\MemberController;
    use App\Http\Controllers\LemburController;


    Route::get('/login', [AuthController::class, 'showLogin']) ->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth')->group(function () {

        Route::get('/bagian', [AuthController::class, 'bagian'])->name('bagian');
        Route::get('/level', [AuthController::class, 'level'])->name('level');
        Route::get('/status', [AuthController::class, 'status'])->name('status');

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/user', [AuthController::class, 'user'])->name('user');

        Route::get('/proyek', [AuthController::class, 'proyek'])->name('proyek');
        Route::get('/jam_per_tanggal', [AuthController::class, 'jam_per_tanggal'])->name('jam_per_tanggal');
        Route::get('/jenis_pesan', [AuthController::class, 'jenis_pesan'])->name('jenis_pesan');
        Route::get('/mode_jam_kerja', [AuthController::class, 'mode_jam_kerja'])->name('mode_jam_kerja');
        Route::get('/pesan', [AuthController::class, 'pesan'])->name('pesan');
        Route::get('/status_jam_kerja', [AuthController::class, 'status_jam_kerja'])->name('status_jam_kerja');
        Route::get('/keterangan', [AuthController::class, 'keterangan'])->name('keterangan');
        Route::get('/dashboard', [UserProfileController::class, 'index'])->name('dashboard');


            Route::get('/profile', [UserProfileController::class, 'show'])->name('profile');
            Route::get('/profile/edit', [UserProfileController::class, 'edit'])->name('profile.edit');
            Route::post('/userprofile/update/{id}', [UserProfileController::class, 'update'])->name('userprofile.update');
            Route::get('/profile/{id}', [UserProfileController::class, 'edit']) ->name('profile.ofUser');






        Route::get('/aktivitas', [AuthController::class, 'aktivitas'])->name('aktivitas');
        Route::get('/proyek_user', [AuthController::class, 'proyek_user'])->name('proyek_user');



        Route::get('/members', [MemberController::class, 'index'])->name('members.index');
        Route::delete('/members/{id}', [MemberController::class, 'destroy'])->name('members.destroy');

        Route::get('/lembur', [LemburController::class, 'index'])->name('lembur');
    });

    Route::get('/register', [AuthController::class, 'register'])->name('register');




