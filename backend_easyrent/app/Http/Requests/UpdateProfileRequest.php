<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'sometimes|max:255',
            'prenom' => 'sometimes|max:255',
            'email' => 'sometimes|email|unique:users,email',
            'password' => 'sometimes|confirmed',
            'role' => 'in:client,admin',
        ];
    }

    /**
     * Messages de validation personnalisés
     */
    public function messages(): array
    {
        return [
    
            'nom.max' => 'Le prénom ne doit pas dépasser 255 caractères.',

            'prenom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'email.email' => 'Veuillez saisir une adresse email valide.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            
            'role.in' => 'Le rôle sélectionné est invalide.',
        ];
    }
}
