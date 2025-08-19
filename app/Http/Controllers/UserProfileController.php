<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\UserProfile\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserProfileController extends Controller
{
    public function index()
    {
        // Only get existing profile for dashboard, don't create if doesn't exist
        $userProfile = UserProfile::where('user_id', Auth::id())->first();

        return view('dashboard.index', compact('userProfile'));
    }

    public function show()
    {
        // Get or create profile for profile page
        $userProfile = UserProfile::firstOrCreate(
            ['user_id' => Auth::id()],
            [
                'nama_lengkap' => '',
                'nrp' => '',
                'alamat' => '',
                'foto' => ''
            ]
        );

        return view('profile.index', compact('userProfile'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'nullable|string|max:255',
            'nrp' => 'nullable|string|max:50',
            'alamat' => 'nullable|string|max:500',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        $userProfile = UserProfile::firstOrCreate(['user_id' => Auth::id()]);

        // Handle file upload first
        $updateData = $request->only(['nama_lengkap', 'nrp', 'alamat']);

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($userProfile->foto && Storage::disk('public')->exists($userProfile->foto)) {
                Storage::disk('public')->delete($userProfile->foto);
            }

            $path = $request->file('foto')->store('userphotos', 'public');
            $updateData['foto'] = $path;
        }

        $userProfile->update($updateData);

        return redirect()->route('profile')->with('success', 'Profil berhasil diupdate');
    }
}
