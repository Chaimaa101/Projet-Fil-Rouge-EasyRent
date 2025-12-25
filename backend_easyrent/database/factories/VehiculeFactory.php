<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicule>
 */
class VehiculeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'category_id' => \App\Models\Category::factory(),
          'marque_id' => \App\Models\Marque::factory(),
          'nom' => fake()->word(),
            'color' => fake()->safeColorName(),
            'annee' => fake()->year(),                  
            'prix_day' => fake()->numberBetween(50, 500),
            'description' => fake()->paragraph(),
            'registration_number' => strtoupper(fake()->bothify('??## ???')),
            'seats' => fake()->numberBetween(2, 7),
            'transmission' => fake()->randomElement(['manuelle','automatique']),
            'carburant' => fake()->randomElement(['essence','diesel','electronique','hybride']),    
            'status' => fake()->randomElement(['disponible','loue','maintenance','indisponible']),
            'immatriculation' => strtoupper(fake()->bothify('??#-####-??')),    

        ];
    }
}
