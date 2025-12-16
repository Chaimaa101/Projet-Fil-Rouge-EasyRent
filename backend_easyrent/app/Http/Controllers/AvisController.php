<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Http\Requests\StoreAvisRequest;
use App\Http\Requests\UpdateAvisRequest;
use Illuminate\Support\Facades\Auth;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avis = Avis::with('user')->paginate(4);
        return response()->json($avis);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAvisRequest $request)
    {
        try {
            $data = $request->validated();
            $avis = $request->user()->avis()->create($data);
            return response()->json([
                'message' => 'Avis créé avec succès.',
                'avis' => $avis
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la création de l\'avis: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Avis $avis)
    {
        try {
            $avis->load('user');
            return response()->json($avis);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération de l\'avis: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAvisRequest $request, Avis $avis)
    {
        try {
            $data = $request->validated();
            $avis->update($data);
            return response()->json([
                'message' => 'Avis mis à jour avec succès.',
                'avis' => $avis
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour de l\'avis: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avis $avis)
    {
        try {
            $avis->delete();
            return response()->json([
                'message' => 'Avis supprimé avec succès.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression de l\'avis: ' . $e->getMessage()
            ], 500);
        }
    }
}
