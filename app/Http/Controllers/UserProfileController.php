<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\UserProfile\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Proyek\Proyek;
use App\Models\Lembur\Lembur;
use App\Models\Bagian\Bagians;
use App\Models\Level\Level;

class UserProfileController extends Controller
{
    public function index()
    {

        $totalProyek = Proyek::count();
        $totalUser = User::where('role', 'user')->count();
        $totalLembur = Lembur::count();

        $userProfile = UserProfile::where('user_id', Auth::id())->first();

        return view('dashboard.index', compact(
            'totalProyek',
            'totalUser',
            'userProfile',
            'totalLembur'

        ));


    }

     public function show($id=null)
     {
        // Admin bisa lihat profil siapa saja, user biasa hanya profilnya sendiri
         $targetUserId = (Auth::user()->role === 'admin' && $id)
        ? $id
        : Auth::id();



        $userProfile = UserProfile::firstOrCreate(
        ['user_id' => $targetUserId],
        [
            'nama_lengkap' => '',
            'nrp' => '',
            'alamat' => '',
            'bagian_id' => '',
            'level_id' => '',
            'foto' => ''
        ]
    );
    $bagians = Bagians::all();
    $levels = Level::all();

    return view('profile.index', compact('userProfile', 'bagians', 'levels'));

}


    public function update(Request $request, $id=null)
    {
        $request->validate([
            'nama_lengkap' => 'nullable|string|max:255',
            'nrp' => 'nullable|string|max:50',
            'alamat' => 'nullable|string|max:500',
            'bagian_id' => 'nullable|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

       // Admin bisa edit siapa saja, user biasa hanya dirinya sendiri
    $targetUserId = (Auth::user()->role === 'admin' && $id)
        ? $id
        : Auth::id();

    $userProfile = UserProfile::firstOrCreate(['user_id' => $targetUserId]);


        // Handle file upload first
        $updateData = $request->only(['nama_lengkap', 'nrp', 'alamat', 'bagian_id', 'level']);

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($userProfile->foto && Storage::disk('public')->exists($userProfile->foto)) {
                Storage::disk('public')->delete($userProfile->foto);
            }

            $path = $request->file('foto')->store('userphotos', 'public');
            $updateData['foto'] = $path;
        }

        $userProfile->update($updateData);

        return redirect()->route('profile.ofUser', $targetUserId)
        ->with('success', 'Profil berhasil diupdate');
    }



}
