<?php

namespace App\GraphQL\ProyekUser\Mutations;

use App\Models\ProyekUser\ProyekUser;

class ProyekUserMutation {
     public function restore ($_, array $args): ?ProyekUser
    {
        return ProyekUser::withTrashed()->find($args['id'])?->restore()
        ? ProyekUser::find($args['id'])
        : null;
    }

    public function forceDelete($_, array $args): ?ProyekUser
    {
        $profile = ProyekUser::withTrashed()->find($args['id']);
        if ($profile) {
            $profile->forceDelete();
            return $profile;
        }
        return null;
    }
}
