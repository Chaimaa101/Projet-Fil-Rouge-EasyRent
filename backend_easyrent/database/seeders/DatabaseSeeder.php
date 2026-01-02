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
            'email' => 'chaima@gmail.com',
            'password' => Hash::make('chaimaa'),
            'role' => 'admin',
        ]);


        UserDetails::factory()->create(['user_id' => $admin->id]);

        $users = User::factory(10)->create();
        
        foreach ($users as $user) {
            UserDetails::factory()->create(['user_id' => $user->id]);
        }

        $marques = Marque::factory(10)->create();

     
        $vehicules = Vehicule::factory(12)->create();
        foreach ($vehicules as $vehicule) {
            $vehicule->update([
                'marque_id' => $marques->random()->id
            ]);
        }

    
        $reservations = [];
        for ($i = 0; $i < 20; $i++) {
            $reservation = Reservation::factory()->create([
                'user_id' => $users->random()->id,
                'vehicule_id' => $vehicules->random()->id,
            ]);
            $reservations[] = $reservation;
        }

       
        foreach ($reservations as $reservation) {
           
                Payment::factory()->create([
                    'reservation_id' => $reservation->id,
                    'user_id' => $reservation->user_id,
                ]);
        
        }

        $avisCount = min(15, count($reservations)); 
        $selectedReservations = $reservations;
        shuffle($selectedReservations);
        
        for ($i = 0; $i < $avisCount; $i++) {
            $reservation = $selectedReservations[$i];
            Avis::factory()->create([
                'user_id' => $reservation->user_id,
                'reservation_id' => $reservation->id,
            ]);
        }
    }
}