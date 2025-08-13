<?php

namespace App\Models\Bagian;

use Illuminate\Database\Eloquent\Model;

class Bagians extends Model
{
    protected $table = 'bagian'; // Specify the table name if it differs from the model name

    protected $primaryKey = 'id';

    protected $fillable = ['nama',]; // Specify the fillable attributes if needed

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $timestamps = false; // Enable timestamps if your table has created_at and updated_at columns
}
