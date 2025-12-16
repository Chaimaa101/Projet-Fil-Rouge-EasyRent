<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $reservations = Reservation::with(['vehicule', 'client'])->paginate(10);
            return response()->json($reservations, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve reservations'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        try {
           $data = $request->validated();
              $reservation = Reservation::create($data);
                return response()->json('created', 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create reservation'], 500);
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        try {
            return response()->json($reservation->load(['vehicule', 'client']), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve reservation'], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        try {
            $data = $request->validated();
            $reservation->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update reservation'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        try {
            $reservation->delete();
            return response()->json('deleted', 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete reservation'], 500);
        }
    }
}
