<?php

namespace App\Http\Controllers\AuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController {
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login (Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back ()->withErrors([
            'email' => 'Email atau Password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }

    public function bagian()
    {
        return view('bagian.index');
    }

    public function jam_per_tanggal()
    {
        return view('jampertanggal.index');

    }
    public function level()
    {
        return view('level.index');
    }
    public function pesan()
    {
        return view('pesan.index');
    }

    public function status()
    {
        return view('status.index');
    }

    public function user()
    {
        return view('user.index');
    }

    public function proyek()
    {
        return view('proyek.index');
    }

     public function jenis_pesan()
    {
        return view('jenis_pesan.index');
    }

    public function mode_jam_kerja()
    {
        return view('mode.index');
    }

    public function status_jam_kerja()
    {
        return view('statusjamkerja.index');
    }

    public function user_profile()
    {
        return view('userprofile.index');
    }

     public function register()
    {
        return view('auth.register');
    }

    public function aktivitas()
    {
        return view('aktivitas.index');
    }
     public function proyek_user()
    {
        return view('proyekuser.index');
    }
    public function keterangan()
    {
        return view('keterangan.index');
    }



}

