<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\RegisterMail;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $infos = $request->validated();
            $user = User::create($infos);
            $token = $user->createToken($user->nom)->plainTextToken;

            $data = [
                'title' => 'Bienvenue !',
                'body' => '   Votre inscription a été effectuée avec succès. Nous sommes ravis de vous compter parmi nos utilisateurs !',
                'url' => 'http://localhost:5173/confirm'
            ];

            Mail::to($user->email)->queue(new RegisterMail($data));

            return [
                'message' => 'Inscription réussie.',
                'user' => [

                    'id' => $user->id,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'role' => $user->role
                ],
                'token' => $token
            ];
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }


public function login(LoginRequest $request)
{
    try {
        $request->validated();

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Les informations sont incorrectes.'
            ], 401); 
        }

        $token = $user->createToken($user->nom)->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'role' => $user->role
            ],
            'token' => $token
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Une erreur est survenue : ' . $e->getMessage()
        ], 500); 
    }
}


    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return [
                'message' => 'Vous êtes déconnecté avec succès.'
            ];
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $user->update($request->only([
            'nom',
            'prenom',
            'email'
        ]));

        $details = $user->details()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'adresse',
                'CNI',
                'tel',
                'genre',
                'date_naissance',
                'permi_licence'
            ])
        );

        if ($request->hasFile('photo_profil')) {

            $uploadedPhoto = Cloudinary::upload(
                $request->file('photo_profil')->getRealPath(),
                [
                    'folder' => 'profiles',
                    'transformation' => [
                        'width' => 400,
                        'height' => 400,
                        'crop' => 'fill'
                    ]
                ]
            );

            $details->photo_profil = $uploadedPhoto->getSecurePath();
        }
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès'
        ]);
    }

    public function notifications(Request $request)
    {
        $notifications = $request->user()->notifications()->orderBy('created_at', 'desc')->get();
        return response()->json(['notifs'=> $notifications]);
    }
       public function markAsRead($id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return response()->json(['success' => true]);
    }
}
