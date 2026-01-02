<?php

namespace App\Http\Controllers;

use App\Events\VehiculeCreated;
use App\Models\Vehicule;
use App\Http\Requests\StoreVehiculeRequest;
use App\Http\Requests\UpdateVehiculeRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\DB;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $vehicules = Vehicule::with('marque','category','images')->latest()->paginate(9);
            return response()->json($vehicules, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

public function getTopVehicules()
    {
        try {
            $vehicules = Vehicule::where('isTop',true)->with('marque','category','images')->get();
            return response()->json($vehicules, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
    /**
     * Store a newly created resource in storage.
     */
 
public function store(StoreVehiculeRequest $request)
{

    try {
        $vehicule = Vehicule::create(
            $request->except('images')
        );
         if ($request->hasFile('images')) {
            event(new VehiculeCreated(
                $vehicule,
                $request->file('images')
            ));
        }

        return response()->json([
            'message' => 'Vehicule created',
            'vehicule' => $vehicule->load('images')
        ], 201);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(Vehicule $vehicule)
    {
        try {
            
            return response()->json($vehicule->load('marque','images'), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehiculeRequest $request, Vehicule $vehicule)
    {
        try {
            $data = $request->validated();
             if ($request->hasFile('images')) {
            event(new VehiculeCreated(
                $vehicule,
                $request->file('images')
            ));
        }
            $vehicule->update($data);
            return response()->json($vehicule);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
   
public function destroy(Vehicule $vehicule)
{
    DB::beginTransaction();

    try {
        // Load images relation
        $vehicule->load('images');

        // Delete images from Cloudinary
        foreach ($vehicule->images as $image) {
            if ($image->public_id) {
                Cloudinary::destroy($image->public_id);
            }
        }

        // Delete images from database
        $vehicule->images()->delete();

        // Delete vehicule
        $vehicule->delete();

        DB::commit();

        // 204 = no content
        return response()->noContent();

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }}
}
