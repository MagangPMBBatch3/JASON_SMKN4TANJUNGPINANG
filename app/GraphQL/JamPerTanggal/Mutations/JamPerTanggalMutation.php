<?php

namespace App\GraphQL\JamPerTanggal\Mutations;

use App\Models\JamPerTanggal\JamPerTanggal;

class JamPerTanggalMutation {
     public function restore ($_, array $args): ?JamPerTanggal
    {
        return JamPerTanggal::withTrashed()->find($args['id'])?->restore()
        ? JamPerTanggal::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?JamPerTanggal
    {
        $jam_per_tanggal = JamPerTanggal::withTrashed()->find($args['id']);
        if ($jam_per_tanggal) {
            $jam_per_tanggal->forceDelete();
            return $jam_per_tanggal;
        }
        return null;
    }
}
