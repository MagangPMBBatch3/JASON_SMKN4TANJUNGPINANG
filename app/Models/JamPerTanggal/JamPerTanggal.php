<?php

namespace App\Models\JamPerTanggal;

use Illuminate\Database\Eloquent\Model;

class JamPerTanggal extends Model
{
     protected $table = 'jam_per_tanggal'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'tanggal',
        'jam',
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
