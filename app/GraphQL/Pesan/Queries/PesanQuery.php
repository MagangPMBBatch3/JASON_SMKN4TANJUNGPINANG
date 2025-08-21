<?php

namespace App\GraphQL\Pesan\Queries;

use App\Models\Pesan\Pesan;

class PesanQuery {
     public function allArsip($_, array $args)
    {
        return Pesan::onlyTrashed()->get();
    }
}

