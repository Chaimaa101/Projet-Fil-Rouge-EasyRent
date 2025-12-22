<?php

namespace App\Http\Controllers;

use App\Events\UserRegistered;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\RegisterMail;
use App\Models\User;
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

            // event(new UserRegistered($user));
            $data = [
                'title' => 'Bienvenue !',
                'body' => '   Votre inscription a été effectuée avec succès. Nous sommes ravis de vous compter parmi nos utilisateurs !',
               'url' => 'http://localhost:5173/confirm/' . $user->nom
            ];
             
            Mail::to($user->email)->queue(new RegisterMail($data));

            return [
                'message' => 'Inscription réussie.',
                'user' =>[
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
                return [
                    'message' => 'Les informations sont incorrectes.'
                ];
            }

            $token = $user->createToken($user->nom)->plainTextToken;

            return [
                'message' => 'Connexion réussie.',
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

}