<?php

namespace App\GraphQL\JamKerja\Queries;

use App\Models\JamKerja\JamKerja;

class JamKerjaQuery {
    public function allArsip($_, array $args)
    {
        return JamKerja::with(['users_profile', 'proyek', 'aktivitas', 'status_jam_kerja', 'mode_jam_kerja'])
            ->whereHas('users_profile') // Hanya ambil yang punya users_profile
            ->onlyTrashed()
            ->get();
    }
}
