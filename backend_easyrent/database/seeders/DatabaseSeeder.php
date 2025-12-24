<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Avis;
use App\Models\Marque;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use App\Models\UserDetails;
use App\Models\Vehicule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create()->each(function ($user) {
            UserDetails::factory(1)->create([
                'user_id' => $user->id,
            ]); 
            Notification::factory(1)->create([
                'user_id' => $user->id,
            ]);
        });

       $marques = Marque::factory(10)->create(); 
            $vehicules =Vehicule::factory(12)->create([
                'marque_id' => $marques->random()->id,
            ]);
       

       
   $reservations = Reservation::factory(20)->create([
            'user_id' => $users->random()->id,
            'vehicule_id' => $vehicules->random()->id,
        ]);

        Avis::factory(30)->create([
            'user_id' => $users->random()->id,
            'vehicule_id' => $vehicules->random()->id,
        ]);

          Payment::factory()->create([
        'reservation_id' => $reservations->random()->id,
    ]);   

        User::factory()->create([
            'nom' => 'Admin ',
            'prenom' => 'chaimaa',
            'email' => 'admin@gmal.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

    }

}
