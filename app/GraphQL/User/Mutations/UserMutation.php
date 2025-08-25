<?php

namespace App\GraphQL\User\Mutations;

use App\Models\User;
use App\Models\UserProfile\UserProfile;
use Illuminate\Support\Facades\Hash;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class UserMutation
{
    public function restore($_, array $args): ?User
    {
        return User::withTrashed()->find($args['id'])->restore()
            ? User::withTrashed()->find($args['id'])
            : null;
    }

    public function forceDelete($_, array $args): ?User
    {
        $user = User::withTrashed()->find($args['id']);
        if ($user) {
            $user->forceDelete();
            return $user;
        }
        return null;

    }
    public function register($_, array $args, GraphQLContext $context)
    {
        // Buat User
        $user = User::create([
            'nama' => $args['nama'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
        ]);

        // Buat UserProfile kosong otomatis
        UserProfile::create([
            'user_id' => $user->id,
            'nama_lengkap' => $args['nama'], // bisa auto isi nama dari register
            'nrp' => '',
            'alamat' => '',
            'foto' => ''
        ]);

        return $user;
    }

}

