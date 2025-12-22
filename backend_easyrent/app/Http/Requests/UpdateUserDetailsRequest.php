<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'=> 'sometimes|exists:users,id',
            'adresse' => 'sometimes|string|max:255',
            'CNI' => 'sometimes|string|max:100|unique:user_details,CNI',
            'tel' => 'sometimes|string|max:20',
            'photo_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'permi_licence' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'genre' => 'sometimes|string|in:male,female,other',
            'date_naissance' => 'sometimes|date|before:today',
        ];
    }

    public function messages()
    {
        return [
            'user.exists' => "L'utilisateur spécifié n'existe pas.",
            'CNI.unique' => "Ce CNI est déjà utilisé.",
            'genre.in' => "Le genre doit être l'un des suivants : male, female, other.",
            'date_naissance.before' => "La date de naissance doit être une date passée.",
        ];  
    }
}
