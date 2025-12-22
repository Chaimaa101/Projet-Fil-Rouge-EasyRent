<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehiculeRequest extends FormRequest
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
            'marque_id' => 'nullable|exists:marques,id',
            'nom' => 'sometimes|string|max:100',
            'annee' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'color' => 'sometimes|string|max:50',
            'prix_day' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'registration_number' => 'sometimes|string|max:50|unique:vehicules,registration_number',
            'seats' => 'sometimes|integer|min:1',
            'transmission' => 'sometimes|string|in:manuel,automatique',
            'carburant' => 'sometimes|string|in:essence,diesel,electronique,hybride',
            'statut' => 'sometimes|string|in:disponible,loue,maintenance,indisponible',
            'immatriculation' => 'sometimes|string|max:100|unique:vehicules,immatriculation',
            'type' => 'sometimes|string|max:50', 
        ];  
    }

    public function messages()
    {
        return [
            'marque_id.exists' => "La marque spécifiée n'existe pas.",
          
            'annee.min' => "L'année du véhicule doit être supérieure ou égale à 1900.",
            'annee.max' => "L'année du véhicule ne peut pas être dans le futur.",
            'prix_day.min' => "Le prix par jour doit être au moins de 0.",
            'registration_number.unique' => "Ce numéro d'immatriculation est déjà utilisé.",
            'seats.min' => "Le nombre de sièges doit être au moins de 1.",
            'transmission.in' => "Le type de transmission doit être manuel ou automatique.",
            'carburant.in' => "Le type de carburant doit être petrol, diesel, electric ou hybrid.",
            'statut.in' => "Le statut du véhicule doit être available, rented ou maintenance.",
            'immatriculation.unique' => "Cette immatriculation est déjà utilisée.",
        ];  
    }
}
