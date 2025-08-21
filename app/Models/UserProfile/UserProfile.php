<?php

namespace App\Models\UserProfile;

use Illuminate\Database\Eloquent\Model;


class UserProfile extends Model
{
   

    protected $table = 'user_profile';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'nrp',
        'alamat',
        'foto',
        'bagian_id',
        'level_id',
        'status_id',

    ];

    protected $casts = [
        'deleted_at' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function bagian() {
        return $this->belongsTo(\App\Models\Bagian\Bagians::class);
    }

    public function level() {
        return $this->belongsTo(\App\Models\Level\Level::class);
    }

    public function status() {
        return $this->belongsTo(\App\Models\Status\Statuses::class);
    }
}
