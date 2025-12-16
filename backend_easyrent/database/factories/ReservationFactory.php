<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'user_id' => \App\Models\User::factory(),
            'vehicule_id' => \App\Models\Vehicule::factory(),
            'start_date' => fake()->dateTimeBetween('now', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+2 months'),
            'total_price' => fake()->randomFloat(2, 100, 1000),
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
            'frait_retard' => fake()->randomFloat(2, 0, 50),
        ];
    }
}
