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
        Schema::table('user_profile', function (Blueprint $table) {
            // Make columns nullable
            $table->string('nama_lengkap')->nullable()->change();
            $table->string('nrp')->nullable()->change();
            $table->text('alamat')->nullable()->change();
            $table->string('foto')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_profile', function (Blueprint $table) {
            // Revert back to NOT NULL (optional)
            $table->string('nama_lengkap')->nullable(false)->change();
            $table->string('nrp')->nullable(false)->change();
            $table->text('alamat')->nullable(false)->change();
            $table->string('foto')->nullable(false)->change();
        });
    }
};
