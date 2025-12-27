<?php

namespace App\Http\Controllers;

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
            $vehicules = Vehicule::with('marque','category','images')->paginate(9);
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
    DB::beginTransaction();

    try {
        $vehicule = Vehicule::create(
            $request->except('images')
        );

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {

                $uploaded = Cloudinary::upload(
                    $image->getRealPath(),
                    ['folder' => 'vehicules']
                );

                $vehicule->images()->create([
                    'path' => $uploaded->getSecurePath(),
                    'public_id' => $uploaded->getPublicId(),
                ]);
            }
        }

        DB::commit();

        return response()->json([
            'message' => 'Vehicule created',
            'vehicule' => $vehicule->load('images')
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();
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
            $vehicule->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
