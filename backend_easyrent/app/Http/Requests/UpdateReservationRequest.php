<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
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
            'user_id' => 'sometimes|exists:users,id',
            'vehicule_id' => 'sometimes|exists:vehicules,id',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'total_price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|string|in:pending,confirmed,cancelled',
            'frait_retard' => 'nullable|numeric|min:0',
        ];
    }

       public function messages(): array
    {
        return [
            'user_id.exists' => 'L\'utilisateur sélectionné n\'existe pas.',
            
            'vehicule_id.exists' => 'Le véhicule sélectionné n\'existe pas.',
            
            'start_date.date' => 'La date de début doit être une date valide.',
            
            'end_date.date' => 'La date de fin doit être une date valide.',
            'end_date.after' => 'La date de fin doit être postérieure à la date de début.',
            
            'total_price.numeric' => 'Le prix total doit être un nombre.',
            'total_price.min' => 'Le prix total ne peut pas être négatif.',
            
            'status.string' => 'Le statut doit être une chaîne de caractères.',
            'status.in' => 'Le statut doit être l\'un des suivants: pending, confirmed, cancelled.',
            
            'frait_retard.numeric' => 'Les frais de retard doivent être un nombre.',
            'frait_retard.min' => 'Les frais de retard ne peuvent pas être négatifs.',
        ];
    }
}
