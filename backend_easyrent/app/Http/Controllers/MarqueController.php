<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use App\Http\Requests\StoreMarqueRequest;
use App\Http\Requests\UpdateMarqueRequest;

class MarqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $marques = Marque::all();
            return response()->json($marques, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve marques'], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMarqueRequest $request)
    {
        try {
           $data = $request->validated();
              $marque = Marque::create($data);
                return response()->json('created', 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create marque'], 500);
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Marque $marque)
    {
        try {
            return response()->json($marque, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve marque'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMarqueRequest $request, Marque $marque)
    {
        try {
            $data = $request->validated();
            $marque->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update marque'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marque $marque)
    {
        try {
            $marque->delete();
            return response()->json('deleted', 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete marque'], 500);
        }
    }
}
