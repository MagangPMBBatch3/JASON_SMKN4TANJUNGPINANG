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
            $table->string('pengirim', 100)->unique();
            $table->string('penerima', 100)->unique();
            $table->text('isi');
            $table->integer('parent_id');
            $table->dateTime('tgl_pesan');
            $table->foreignId('jenis_id')->nullable()->constrained('jenis_pesan')->onUpdate('cascade')->nullOnDelete();
            $table->timestamps();
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
