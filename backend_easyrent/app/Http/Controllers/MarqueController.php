<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use App\Http\Requests\StoreMarqueRequest;
use App\Http\Requests\UpdateMarqueRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MarqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $marques = Marque::with('vehicules')->get();
            return ['marques' =>  $marques];
        } catch (\Exception $e) {
            return ['error'=>$e->getMessage()];
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMarqueRequest $request)
    {
        try {
           $data = $request->validated();

            
        if ($request->hasFile('image')) {
            $cloudinary = Cloudinary::upload($request->file('image')->getRealPath());
            $data['image'] = $cloudinary->getSecurePath(); 
        }
              $marque = Marque::create($data);
                return ['message' =>'created','marque' =>$marque ];

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Marque $marque)
    {
        try {
            return $marque;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
          return ['message' =>'updated','marque' =>$marque ];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marque $marque)
    {
        try {
            $marque->delete();
            return ['message' =>'deleted'];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
