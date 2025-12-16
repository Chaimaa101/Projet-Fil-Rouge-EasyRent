<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use App\Http\Requests\StoreVehiculeRequest;
use App\Http\Requests\UpdateVehiculeRequest;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $vehicules = Vehicule::with('marque')->paginate(10);
            return response()->json($vehicules, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve vehicles'], 500);
        }
    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehiculeRequest $request)
    {
        try {
           $data = $request->validated();
              $vehicule = Vehicule::create($data);
                return response()->json('created', 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create vehicle'], 500);
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicule $vehicule)
    {
        try {
            return response()->json($vehicule->load('marque'), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve vehicle'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehiculeRequest $request, Vehicule $vehicule)
    {
        try {
            $data = $request->validated();
            $vehicule->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update vehicle'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicule $vehicule)
    {
        try {
            $vehicule->delete();
            return response()->json('deleted', 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete vehicle'], 500);
        }
    }
}
