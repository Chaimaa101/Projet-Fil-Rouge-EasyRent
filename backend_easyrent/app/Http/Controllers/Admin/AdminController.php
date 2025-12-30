<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Payment;
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
            'loue'      => Vehicule::where('status', 'loue')->count(),
           'revenus' => Payment::where('status', 'success')->sum('amount'),

        ]);
    }

    public function reservations()
    {
        return response()->json(
            Reservation::with(['user', 'vehicule'])->latest()->paginate(6)
        );
    }

     public function paiments(){
       try {
         $paiments = Payment::with('reservation','user')->latest()->paginate(6);
        return $paiments;
       } catch (\Throwable $th) {
        return $th->getMessage();
       }
    }

      public function avis()
    {
        $avis = Avis::with('user')->latest()->paginate(6);
        return response()->json($avis);
    }

    public function updateVehiculeStatus(Request $request,Vehicule $vehicule)
    {
        try {
            $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        $vehicule->update([
            'status' => $request->status
        ]);

        return response()->json($vehicule);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function toggleVehiculeIsTop(Request $request,Vehicule $vehicule)
    {
        try {

         $vehicule->update([
            'isTop' => ! $vehicule->isTop
        ]);

        return response()->json($vehicule);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function toggleAvisIsPublic(Request $request,Avis $avis)
    {
        try {

        $avis->update([
            'isPublic' => ! $avis->isPublic
        ]);


        return response()->json($avis);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
