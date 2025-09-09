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
        Schema::create('pesan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengirim')->nullable()->constrained('users')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('penerima')->nullable()->constrained('users')->onUpdate('cascade')->nullOnDelete();
            $table->text('isi');
            $table->dateTime('tgl_pesan');
            $table->foreignId('jenis_id')->nullable()->constrained('jenis_pesan')->onUpdate('cascade')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesan');
    }
};
