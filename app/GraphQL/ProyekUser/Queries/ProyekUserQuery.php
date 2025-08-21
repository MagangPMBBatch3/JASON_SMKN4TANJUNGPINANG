<?php

namespace App\GraphQL\ProyekUser\Queries;

use App\Models\ProyekUser\ProyekUser;

class ProyekUserQuery {
     public function allArsip($_, array $args)
    {
        return ProyekUser::onlyTrashed()->get();
    }
}
