<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Vehicule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $reservations = Auth::user()->reservations()->with(['vehicule', 'user'])->get();
            return $reservations;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request,Vehicule $vehicule)
    {
        try {
            $data = $request->validated();
           $data['vehicule_id'] = $vehicule->id;
              $request->user()->reservations()->create($data);

                return response()->json('created', 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage() ], 500);
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        try {
            return response()->json($reservation->load(['vehicule', 'user']), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        try {
             Gate::authorize('is-owner', $reservation);
            $data = $request->validated();
            $reservation->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        try {
             Gate::authorize('is-owner', $reservation);
            $reservation->delete();
            return response()->json('deleted', 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
