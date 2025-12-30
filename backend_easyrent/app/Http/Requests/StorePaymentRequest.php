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
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:credit_card,cash,paypal',
            'status' => 'required|in:completed,pending,failed',
        ];
    }

    public function messages(): array
    {
        return [
           
            'amount.required' => 'Le montant est obligatoire.',
            'amount.numeric' => 'Le montant doit être un nombre valide.',
            'amount.min' => 'Le montant doit être supérieur à 0.',

            'payment_method.required' => 'Le mode de paiement est obligatoire.',
            'payment_method.in' => 'Mode de paiement invalide.',

            'status.required' => 'Le statut du paiement est obligatoire.',
            'status.in' => 'Statut invalide.',
        ];
    }
}
