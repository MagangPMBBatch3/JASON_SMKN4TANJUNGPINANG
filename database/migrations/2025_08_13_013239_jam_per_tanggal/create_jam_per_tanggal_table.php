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
        Schema::create('jam_per_tanggal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_profile_id')->nullable()->constrained('user_profile')->onUpdate('cascade')->nullOnDelete();
            $table->foreignId('proyek_id')->nullable()->constrained('proyek')->onUpdate('cascade')->nullOnDelete();
            $table->dateTime('tanggal')->nullable();
            $table->decimal('jam', 5, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jam_per_tanggal');
    }
};
