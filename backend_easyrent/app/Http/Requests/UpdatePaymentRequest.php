<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'reservation_id' => 'sometimes|exists:reservations,id',
            'amount' => 'sometimes|numeric|min:0',
            'payment_method' => 'sometimes|in:credit_card,cash,paypal',
            'statut' => 'sometimes|in:completed,pending,failed',
        ];
    }

    public function messages(): array
    {
        return [
            'reservation_id.exists' => 'Cette réservation n\'existe pas.',

            'amount.numeric' => 'Le montant doit être un nombre valide.',
            'amount.min' => 'Le montant doit être supérieur à 0.',

            'payment_method.in' => 'Mode de paiement invalide.',

            'statut.in' => 'Statut invalide.',
        ];
    }
}
