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
        Schema::create('vehicules', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('color');
            $table->integer('annee');
            $table->decimal('prix_day', 10, 2);
            $table->text('description')->nullable();
            $table->string('registration_number')->nullable();
            $table->integer('seats')->nullable();
            $table->enum('transmission',['manuelle','automatique']);
            $table->enum('carburant',['essence','diesel','electronique','hybride']);
            $table->enum('status',['disponible','loue','maintenance','indisponible'])->default('disponible');
            $table->string('immatriculation')->unique();
            $table->foreignId('marque_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicules');
    }
};
