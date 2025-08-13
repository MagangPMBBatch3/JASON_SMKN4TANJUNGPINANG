<?php

namespace App\GraphQL\ModeJamKerja\Mutations;

use App\Models\ModeJamKerja\ModeJamKerja;

class ModeJamKerjaMutation {
     public function restore ($_, array $args): ?ModeJamKerja
    {
        return ModeJamKerja::withTrashed()->find($args['id'])?->restore()
        ? ModeJamKerja::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?ModeJamKerja
    {
        $mode_jam_kerja = ModeJamKerja::withTrashed()->find($args['id']);
        if ($mode_jam_kerja) {
            $mode_jam_kerja->forceDelete();
            return $mode_jam_kerja;
        }
        return null;
    }
}
