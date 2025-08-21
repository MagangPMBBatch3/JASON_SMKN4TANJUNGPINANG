<?php

namespace App\Models\Aktivitas;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aktivitas extends Model
{

    use SoftDeletes;
    protected $table = 'aktivitas'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'bagian_id',
        'no_wbs',
        'nama',
    ];
     protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

     public function bagian() {
        return $this->belongsTo(\App\Models\Bagian\Bagians::class);
    }
}
