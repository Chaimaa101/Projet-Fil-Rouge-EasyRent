<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
 public function rules()
{
    return [
        'nom'    => 'required|min:3',
        'phone'   => 'required|min:10',
        'email'   => 'required|email',
        'message' => 'required|min:10',
    ];
}

public function messages()
{
    return [
        'nom.required'    => 'Le nom est obligatoire.',
        'nom.min'         => 'Le nom doit contenir au moins 3 caractères.',

        'phone.required'   => 'Le numéro de téléphone est obligatoire.',
        'phone.min'        => 'Le numéro de téléphone doit contenir au moins 10 chiffres.',

        'email.required'   => 'L\'adresse e-mail est obligatoire.',
        'email.email'      => 'L\'adresse e-mail doit être valide.',

        'message.required' => 'Le message est obligatoire.',
        'message.min'      => 'Le message doit contenir au moins 10 caractères.',
    ];
}

}
