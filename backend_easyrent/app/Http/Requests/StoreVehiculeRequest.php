<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehiculeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'marque_id' => 'nullable|exists:marques,id',
            'nom' => 'required|string|max:100',
            'annee' => 'required|integer|min:1900|max:' . date('Y'),
            'color' => 'required|string|max:50',
            'prix_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'registration_number' => 'required|string|max:50|unique:vehicules,registration_number',
            'seats' => 'required|integer|min:1',
            'transmission' => 'required|string|in:manual,automatic',
            'carburant' => 'required|string|in:petrol,diesel,electric,hybrid',
            'statut' => 'required|string|in:available,rented,maintenance',
            'immatriculation' => 'required|string|max:100|unique:vehicules,immatriculation',
            'type' => 'required|string|max:50', 
        ];  
    }

    public function messages()
    {
        return [
            'marque_id.exists' => "La marque spécifiée n'existe pas.",
            'nom.required' => "Le nom du véhicule est requis.",
            'annee.required' => "L'année du véhicule est requise.",
            'annee.min' => "L'année du véhicule doit être supérieure ou égale à 1900.",
            'annee.max' => "L'année du véhicule ne peut pas être dans le futur.",
            'color.required' => "La couleur du véhicule est requise.",
            'prix_day.required' => "Le prix par jour est requis.",
            'prix_day.min' => "Le prix par jour doit être au moins de 0.",
            'registration_number.required' => "Le numéro d'immatriculation est requis.",
            'registration_number.unique' => "Ce numéro d'immatriculation est déjà utilisé.",
            'seats.required' => "Le nombre de sièges est requis.",
            'seats.min' => "Le nombre de sièges doit être au moins de 1.",
            'transmission.required' => "Le type de transmission est requis.",
            'transmission.in' => "Le type de transmission doit être manuel ou automatique.",
            'carburant.required' => "Le type de carburant est requis.",
            'carburant.in' => "Le type de carburant doit être petrol, diesel, electric ou hybrid.",
            'statut.required' => "Le statut du véhicule est requis.",
            'statut.in' => "Le statut du véhicule doit être available, rented ou maintenance.",
            'immatriculation.required' => "L'immatriculation est requise.",
            'immatriculation.unique' => "Cette immatriculation est déjà utilisée.",
            'type.required' => "Le type de véhicule est requis.",
        ];  
    }
}
