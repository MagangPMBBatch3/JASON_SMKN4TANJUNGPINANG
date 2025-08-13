<?php

namespace App\Models\Keterangan;

use Illuminate\Database\Eloquent\Model;

class Keterangan extends Model
{
    protected $table = "keterangan";

    protected $primaryKey = "id";

    protected $fillabble = [
        'bagian_id',
        'proyek_id',
        'tanggal',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

     public function proyek() {
        return $this->belongsTo(\App\Models\Proyek\Proyek::class);
    }

    public function bagian() {
        return $this->belongsTo(\App\Models\Bagian\Bagians::class);
    }
}
