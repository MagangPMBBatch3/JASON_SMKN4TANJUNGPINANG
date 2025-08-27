<?php

namespace App\Http\Controllers;

use App\Models\Lembur\Lembur;

class LemburController {
     public function index()
    {

        $lembursAktif = Lembur::with(['users_profile', 'proyek'])
            ->whereHas('users_profile')
            ->get();

        $lembursArsip = Lembur::with(['users_profile', 'proyek'])
            ->whereHas('users_profile')
            ->onlyTrashed()
            ->get();

        return view('lembur.index', compact('lembursAktif', 'lembursArsip'));
    }
}
