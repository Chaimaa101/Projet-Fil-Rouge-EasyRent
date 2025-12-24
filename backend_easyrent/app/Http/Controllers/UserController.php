<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::paginate(10);
            return $users;
        } catch (\Exception $e) {
                      return response()->json(['error' => $e->getMessage()]);

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserController $request)
    {
        try {
           $data = $request->validated();
              $user = User::create($data);
                return response()->json('created', 201);

        } catch (\Exception $e) {
                       return response()->json(['error' => $e->getMessage()]);

            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            return response()->json($user, 200);
        } catch (\Exception $e) {
                       return response()->json(['error' => $e->getMessage()]);

        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
              $data = $request->validate(
               ['role' => 'required|in:admin,client']

            );
            $user->update($data);
            return response()->json('updated', 200);
        } catch (\Exception $e) {
                      return response()->json(['error' => $e->getMessage()]);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json('deleted', 204);
        } catch (\Exception $e) {
                       return response()->json(['error' => $e->getMessage()]);

        }
    }
}
