<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserDetails>
 */
class UserDetailsFactory extends Factory
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
            'adresse' => fake()->address(),
            'CNI' => fake()->unique()->numerify('CNI##########'),
            'tel' => fake()->phoneNumber(),
            'photo_profil' => fake()->imageUrl(200, 200, 'people'),
            'permi_licence' => fake()->unique()->numerify('PERMI##########'),
            'genre' => fake()-> randomElement(['male', 'female', 'other']),
            'date_naissance' => fake()->date('Y-m-d', '-18 years'),
        ];
    }   
}
