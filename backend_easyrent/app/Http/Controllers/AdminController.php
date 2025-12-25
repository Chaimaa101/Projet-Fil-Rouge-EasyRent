<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Reservation;
use App\Models\Vehicule;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'users'        => User::count(),
            'vehicles'     => Vehicule::count(),        
            'reservations' => Reservation::count(),
            'pending'      => Reservation::where('status', 'pending')->count(),
            'confirmed'    => Reservation::where('status', 'confirmed')->count(),
        ]);
    }

    public function reservations()
    {
        return response()->json(
            Reservation::with(['user', 'vehicule'])->latest()->get()
        );
    }

    public function updateReservationStatus(Request $request,Reservation $reservation)
    {
        try {
            $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $reservation->update([
            'status' => $request->statut
        ]);

        return response()->json($reservation);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
