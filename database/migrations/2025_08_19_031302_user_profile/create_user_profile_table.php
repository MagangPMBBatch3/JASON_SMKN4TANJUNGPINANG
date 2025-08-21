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
    Schema::create('user_profile', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained('users')->onUpdate('cascade')->nullOnDelete();
        $table->string('nama_lengkap')->nullable();
        $table->string('nrp')->nullable();
        $table->text('alamat')->nullable();
        $table->string('foto')->nullable();
        $table->foreignId('bagian_id')->nullable()->constrained('bagian')->onUpdate('cascade')->nullOnDelete();
        $table->foreignId('level_id')->nullable()->constrained('levels')->onUpdate('cascade')->nullOnDelete();
        $table->foreignId('status_id')->nullable()->constrained('statuses')->onUpdate('cascade')->nullOnDelete();
        $table->timestamps(); // created_at, updated_at
    });
}

    public function down(): void
    {
    Schema::dropIfExists('user_profile');
    }
};
