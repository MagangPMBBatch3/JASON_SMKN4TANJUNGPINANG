<?php

namespace App\Models\JenisPesan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisPesan extends Model
{

    use SoftDeletes;
    protected $table = 'jenis_pesan'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime', // For soft deletes
    ];
}
