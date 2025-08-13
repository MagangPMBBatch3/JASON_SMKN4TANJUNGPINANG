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
         Schema::create('jam_kerja', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_profile_id')->nullable()->constrained('users_profile')->onUpdate('cascade')->nullOnDelete();
            $table->string('no_wbs', 50);
            $table->string('kode_proyek', 50)->unique();
            $table->foreignId('proyek_id')->nullable()->constrained('proyek')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('aktivitas_id')->nullable()->constrained('aktivitas')->onUpdate('cascade')->nullOnDelete();
            $table->date('tanggal');
            $table->decimal('jumlah_jam', 5, 2);
            $table->text('keterangan');
            $table->foreignId('status_id')->nullable()->constrained('status_jam_kerja')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('mode_id')->nullable()->constrained('mode_jam_kerja')->onUpdate('cascade')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jam_kerja');
    }
};
