<?php

namespace App\Http\Controllers;

use App\Models\JamKerja\JamKerja;

class JamKerjaController {
     public function index()
    {

        $jamkerjasAktif = JamKerja::with(['users_profile', 'proyek', 'aktivitas', 'status_jam_kerja', 'mode_jam_kerja'])
            ->whereHas('users_profile')
            ->get();

        $jamkerjasArsip = JamKerja::with(['users_profile', 'proyek', 'aktivitas', 'status_jam_kerja', 'mode_jam_kerja'])
            ->whereHas('users_profile')
            ->onlyTrashed()
            ->get();

        return view('JamKerja.index', compact('jamkerjasAktif', 'jamkerjasArsip'));
    }
}
