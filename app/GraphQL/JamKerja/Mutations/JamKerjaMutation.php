<?php

namespace App\GraphQL\JamKerja\Mutations;

use App\Models\JamKerja\JamKerja;

class JamKerjaMutation {
    public function restore ($_, array $args): ?JamKerja
    {
        return JamKerja::withTrashed()->find($args['id'])?->restore()
        ? JamKerja::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?JamKerja
    {
        $jam_kerja = JamKerja::withTrashed()->find($args['id']);
        if ($jam_kerja) {
            $jam_kerja->forceDelete();
            return $jam_kerja;
        }
        return null;
    }
}
