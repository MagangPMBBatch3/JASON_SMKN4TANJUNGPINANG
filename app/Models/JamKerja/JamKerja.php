<?php

namespace App\Models\JamKerja;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JamKerja extends Model
{
    use SoftDeletes;
    protected $table = 'jam_kerja'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'users_profile_id',
        'no_wbs',
        'kode_proyek',
        'proyek_id',
        'aktivitas_id',
        'tanggal',
        'jumlah_jam',
        'keterangan',
        'status_id',
        'mode_id',
    ];
     protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

     public function mode_jam_kerja() {
        return $this->belongsTo(\App\Models\ModeJamKerja\ModeJamKerja::class, 'status_id');
    }

    public function status_jam_kerja() {
        return $this->belongsTo(\App\Models\StatusJamKerja\StatusJamKerja::class, 'mode_id');
    }
    public function aktivitas() {
        return $this->belongsTo(\App\Models\Aktivitas\Aktivitas::class);
    }

    public function users_profile() {
        return $this->belongsTo(\App\Models\UserProfile\UserProfile::class, 'users_profile_id', 'id');
    }
    public function proyek() {
        return $this->belongsTo(\App\Models\Proyek\Proyek::class);
    }


}
