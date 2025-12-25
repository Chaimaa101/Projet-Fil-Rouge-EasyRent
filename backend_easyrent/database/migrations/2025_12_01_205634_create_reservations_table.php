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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicule_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
             $table->integer('days');
            $table->decimal('total_price', 10, 2);
            $table->string('invoice_path')->nullable();
            $table->enum('status',['pending', 'paid', 'cancelled'])->default('pending');
            $table->decimal('frait_retard', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
