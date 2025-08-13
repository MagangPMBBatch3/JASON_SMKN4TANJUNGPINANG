<?php

namespace App\Models\Pesan;

use Illuminate\Database\Eloquent\Model;

class Pesan extends Model
{
    protected $table = 'pesan'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama',
        'pengiriman',
        'penerima',
        'isi',
        'parent_id',
        'tgl_pesan',
        'jenis_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function jenis_pesan() {
        return $this->belongsTo(\App\Models\JenisPesan\JenisPesan::class);
    }
}
