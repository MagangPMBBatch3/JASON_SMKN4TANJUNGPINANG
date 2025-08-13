<?php

namespace App\GraphQL\StatusJamKerja\Mutations;

use App\Models\StatusJamKerja\StatusJamKerja;

class StatusJamKerjaMutation {
    public function restore ($_, array $args): ?StatusJamKerja
    {
        return StatusJamKerja::withTrashed()->find($args['id'])?->restore()
        ? StatusJamKerja::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?StatusJamKerja
    {
        $status_jam_kerja = StatusJamKerja::withTrashed()->find($args['id']);
        if ($status_jam_kerja) {
            $status_jam_kerja->forceDelete();
            return $status_jam_kerja;
        }
        return null;
    }
}
