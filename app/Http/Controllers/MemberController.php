<?php

namespace App\Http\Controllers;

use App\Models\User;

class MemberController  {
     public function index()
    {
        $users = User::with('profile')
            ->where('role', 'user')
            ->get();

    
        return view('members.index', compact('users'));
    }
}
