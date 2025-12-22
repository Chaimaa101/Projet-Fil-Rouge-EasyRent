<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserDetailsRequest extends FormRequest
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
            'user_id'=> 'required|exists:users,id',
            'adresse' => 'required|string|max:255',
            'CNI' => 'required|string|max:100|unique:user_details,CNI',
            'tel' => 'required|string|max:20',
            'photo_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'permi_licence' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'genre' => 'required|string|in:male,female,other',
            'date_naissance' => 'required|date|before:today',
        ];
    }

    public function messages()
    {
        return [
            'user.required' => "L'utilisateur est requis.",
            'user.exists' => "L'utilisateur spécifié n'existe pas.",
            'adresse.required' => "L'adresse est requise.",
            'CNI.required' => "Le CNI est requis.",
            'CNI.unique' => "Ce CNI est déjà utilisé.",
            'tel.required' => "Le numéro de téléphone est requis.",
            'genre.required' => "Le genre est requis.",
            'genre.in' => "Le genre doit être l'un des suivants : male, female, other.",
            'date_naissance.required' => "La date de naissance est requise.",
            'date_naissance.before' => "La date de naissance doit être une date passée.",
        ];  
    }
}
