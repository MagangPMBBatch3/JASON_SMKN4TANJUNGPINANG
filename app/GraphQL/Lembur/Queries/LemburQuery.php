<?php

namespace App\GraphQL\Lembur\Queries;

use App\Models\Lembur\Lembur;

class LemburQuery
{
    public function allArsip($_, array $args)
    {
        return Lembur::with(['users_profile', 'proyek'])
            ->whereHas('users_profile') // Hanya ambil yang punya users_profile
            ->onlyTrashed()
            ->get();
    }
}
