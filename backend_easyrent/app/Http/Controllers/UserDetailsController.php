<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use App\Http\Requests\StoreUserDetailsRequest;
use App\Http\Requests\UpdateUserDetailsRequest;
use Illuminate\Support\Facades\Gate; 

class UserDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return UserDetails::with('user')->get();
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserDetailsRequest $request)
    {

        try {
            $data = $request->validated();
            $userDetails = UserDetails::create($data);
            return response()->json('created', 201);
        } catch (\Throwable $th) {
            return response()->json(['error' =>  $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(UserDetails $userDetails)
    {
        try {
            return response()->json($userDetails->load('user'), 200);
        } catch (\Throwable $th) {
            return response()->json(['error' =>$th->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserDetailsRequest $request, UserDetails $userDetails)
    {
         Gate::authorize('is-owner', $userDetails);

        try {
            $data = $request->validated();
            $userDetails->update($data);
            return response()->json('updated', 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserDetails $userDetails)
    {
         Gate::authorize('is-owner', $userDetails);

        try {
            $userDetails->delete();
            return response()->json('deleted', 200);
        } catch (\Throwable $th) {
            return response()->json(['error' =>  $th->getMessage()], 500);
        }
    }
}
