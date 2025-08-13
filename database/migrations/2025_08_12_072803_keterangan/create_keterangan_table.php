<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('keterangan', function (Blueprint $table) {
             $table->id();
             $table->foreignId('bagian_id')->nullable()->constrained('bagian')->onUpdate('cascade')->nullOnDelete();
             $table->foreignId('proyek_id')->nullable()->constrained('proyek')->onUpdate('cascade')->nullOnDelete();
             $table->date('tanggal')->nullable();
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keterangan');
    }
};
