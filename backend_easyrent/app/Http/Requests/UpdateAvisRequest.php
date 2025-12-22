<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvisRequest extends FormRequest
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
        ];
    }
}
