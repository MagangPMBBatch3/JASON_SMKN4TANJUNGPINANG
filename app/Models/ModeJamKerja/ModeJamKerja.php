<?php

namespace App\Models\ModeJamKerja;

use Illuminate\Database\Eloquent\Model;

class ModeJamKerja extends Model
{
    protected $table = 'mode_jam_kerja'; // Specify the table name if it differs from the model name

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
