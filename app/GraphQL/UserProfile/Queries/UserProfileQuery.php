<?php

namespace App\GraphQL\UserProfile\Queries;

use App\Models\UserProfile\UserProfile;

class UserProfileQuery {
    public function allArsip($_, array $args)
    {
        return UserProfile::onlyTrashed()->get();
    }
}
