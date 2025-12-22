<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAvisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'avis' => 'required|string|min:5|max:1000',
            'rating' => 'required|integer|min:1|max:5',
            'user_id' => 'required|exists:users,id',
            'vehicule_id' => 'required|exists:vehicules,id',
        ];
    }

    public function messages(): array
    {
        return [
            'avis.required' => 'Le commentaire est obligatoire.',
            'avis.min' => 'Le commentaire doit contenir au moins 5 caractères.',
            'avis.max' => 'Le commentaire est trop long.',

            'rating.required' => 'La note est obligatoire.',
            'rating.integer' => 'La note doit être un nombre.',
            'rating.min' => 'La note minimale est 1.',
            'rating.max' => 'La note maximale est 5.',

            'user_id.required' => 'Utilisateur requis.',
            'user_id.exists' => 'Utilisateur invalide.',

            'vehicule_id.required' => 'Véhicule requis.',
            'vehicule_id.exists' => 'Véhicule invalide.',
        ];
    }
}
