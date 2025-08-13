<?php

namespace App\Models\ProyekUser;

use Illuminate\Database\Eloquent\Model;

class ProyekUser extends Model
{
    protected $table = 'proyek_user';
    protected $fillable = [
        'proyek_id',
        'users_profile_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function users_profile() {
        return $this->belongsTo(\App\Models\UserProfile\UserProfile::class);
    }

    public function proyek() {
        return $this->belongsTo(\App\Models\Proyek\Proyek::class);
    }

}
