<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
         'vehicule_id' => \App\Models\Vehicule::factory(),
         'nom' => fake()->word(),
         'montant_reduction' => fake()->numberBetween(10, 50),
         'statut' => fake()->randomElement(['active', 'inactive']),
         'date_limit' => fake()->dateTimeBetween('now', '+1 month'),
        ];
    }
}
