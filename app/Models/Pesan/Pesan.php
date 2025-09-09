<?php

namespace App\Models\Pesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pesan extends Model
{
    use SoftDeletes;
    protected $table = 'pesan'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'pengirim',
        'penerima',
        'isi',
        'tgl_pesan',
        'jenis_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function jenis_pesan() {
        return $this->belongsTo(\App\Models\JenisPesan\JenisPesan::class,'jenis_id', 'id');
    }
    public function user_pengirim() {
        return $this->belongsTo(\App\Models\User::class,'pengirim', 'id');
    }
    public function user_penerima() {
        return $this->belongsTo(\App\Models\User::class,'penerima', 'id');
    }
}
