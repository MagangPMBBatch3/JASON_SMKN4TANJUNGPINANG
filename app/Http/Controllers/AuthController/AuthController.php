<?php

namespace App\Http\Controllers\AuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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

    public function dashboard()
    {
        return view('dashboard.index');
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

    public function level()
    {
        return view('level.index');
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


}

