<?php

namespace Database\Seeders;

use App\Models\Avis;
use App\Models\Marque;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use App\Models\UserDetails;
use App\Models\Vehicule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::factory()->create([
            'nom' => 'Chaimaa',
            'prenom' => 'Admin',
            'email' => 'chaimaa@gmail.com',
            'password' => Hash::make('chaimaa'),
            'role' => 'admin',
        ]);

        $users = User::factory(10)->create()->each(function ($user) {
            UserDetails::factory()->create(['user_id' => $user->id]);
        });

        $marques = Marque::factory(10)->create();

        $vehicules = Vehicule::factory(12)->create()->each(function ($vehicule) use ($marques) {
            $vehicule->marque_id = $marques->random()->id;
            $vehicule->save();
        });

        $reservations = Reservation::factory(20)->create()->each(function ($reservation) use ($users, $vehicules) {
            $reservation->user_id = $users->random()->id;
            $reservation->vehicule_id = $vehicules->random()->id;
            $reservation->save();
        });

        Avis::factory(3)->create()->each(function ($avis) use ($users, $reservations) {
            $avis->user_id = $users->random()->id;
            $avis->reservation_id = $reservations->random()->id;
            $avis->save();
        });


    }
}
