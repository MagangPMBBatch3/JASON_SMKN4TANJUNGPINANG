<?php

namespace App\Models\Lembur;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lembur extends Model
{
    use SoftDeletes;
    protected $table = 'lembur'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'users_profile_id',
        'proyek_id',
        'tanggal',
    ];
     protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

       public function users_profile() {
        return $this->belongsTo(\App\Models\UserProfile\UserProfile::class, 'users_profile_id', 'id');
    }

    public function proyek() {
        return $this->belongsTo(\App\Models\Proyek\Proyek::class, 'proyek_id', 'id');
    }

}
