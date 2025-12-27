<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'days' => 'required|numeric',
            'total_price' => 'required|numeric|min:0',
            'status' => 'nullable|string|in:pending,paid,cancelled',
            'frait_retard' => 'nullable|numeric|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            
            'start_date.required' => 'La date de début est obligatoire.',
            'start_date.date' => 'La date de début doit être une date valide.',
            'start_date.after_or_equal' => 'La date de début ne peut pas être antérieure à aujourd\'hui.',
            
            'end_date.required' => 'La date de fin est obligatoire.',
            'end_date.date' => 'La date de fin doit être une date valide.',
            'end_date.after' => 'La date de fin doit être postérieure à la date de début.',
            
            'total_price.required' => 'Le prix total est obligatoire.',
            'total_price.numeric' => 'Le prix total doit être un nombre.',
            'total_price.min' => 'Le prix total ne peut pas être négatif.',
            
            'status.string' => 'Le statut doit être une chaîne de caractères.',
            'status.in' => 'Le statut doit être l\'un des suivants: en_attente, confirmée, annulée, terminée.',
            
            'frait_retard.numeric' => 'Les frais de retard doivent être un nombre.',
            'frait_retard.min' => 'Les frais de retard ne peuvent pas être négatifs.',
        ];
    }


}