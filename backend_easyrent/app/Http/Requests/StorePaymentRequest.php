<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'reservation_id' => 'required|exists:reservations,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:credit_card,cash,paypal',
            'statut' => 'required|in:completed,pending,failed',
        ];
    }

    public function messages(): array
    {
        return [
            'reservation_id.required' => 'La réservation est obligatoire.',
            'reservation_id.exists' => 'Cette réservation n\'existe pas.',

            'amount.required' => 'Le montant est obligatoire.',
            'amount.numeric' => 'Le montant doit être un nombre valide.',
            'amount.min' => 'Le montant doit être supérieur à 0.',

            'payment_method.required' => 'Le mode de paiement est obligatoire.',
            'payment_method.in' => 'Mode de paiement invalide.',

            'statut.required' => 'Le statut du paiement est obligatoire.',
            'statut.in' => 'Statut invalide.',
        ];
    }
}
