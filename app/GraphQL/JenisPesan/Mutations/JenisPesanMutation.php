<?php

namespace App\GraphQL\JenisPesan\Mutations;

use App\Models\JenisPesan\JenisPesan;

class JenisPesanMutation {

    public function restore ($_, array $args): ?JenisPesan
    {
        return JenisPesan::withTrashed()->find($args['id'])?->restore()
        ? JenisPesan::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?JenisPesan
    {
        $jenis_pesan = JenisPesan::withTrashed()->find($args['id']);
        if ($jenis_pesan) {
            $jenis_pesan->forceDelete();
            return $jenis_pesan;
        }
        return null;
    }
}
