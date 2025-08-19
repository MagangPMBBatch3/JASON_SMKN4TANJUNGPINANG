<?php

namespace App\GraphQL\UserProfile\Mutations;

use App\Models\UserProfile\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserProfileMutation
{
    public function update($_, array $args): ?UserProfile
    {
        $userProfile = UserProfile::find($args['id']);
        if (!$userProfile) {
            throw new \Exception('User profile not found');
        }

        $input = $args['input'];
        $input['user_id'] = Auth::id(); // Ensure user_id is set
        $input['bagian_id'] = $input['bagian_id'] ?? $userProfile->bagian_id;
        $input['level_id'] = $input['level_id'] ?? $userProfile->level_id;
        $input['status_id'] = $input['status_id'] ?? $userProfile->status_id;

        if (isset($args['foto'])) {
            // Delete old photo if exists
            if ($userProfile->foto) {
                Storage::disk('public')->delete($userProfile->foto);
            }
            // Store new photo
            $file = $args['foto']; // Uploaded file object
            $path = $file->store('profiles', 'public');
            $input['foto'] = $path;
        }

        $userProfile->update($input);

        return $userProfile;
    }

    public function restore($_, array $args): ?UserProfile
    {
        return UserProfile::withTrashed()->find($args['id'])?->restore()
            ? UserProfile::find($args['id'])
            : null;
    }

    public function forceDelete($_, array $args): ?UserProfile
    {
        $profile = UserProfile::withTrashed()->find($args['id']);
        if ($profile) {
            $profile->forceDelete();
            return $profile;
        }
        return null;
    }
}
