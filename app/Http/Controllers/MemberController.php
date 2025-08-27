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

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // Hapus profil juga kalau ada
        if ($user->profile) {
            $user->profile->delete();
        }

        $user->delete();

        return redirect()->route('members.index')
                         ->with('success', 'Member berhasil dihapus');
    }

}
