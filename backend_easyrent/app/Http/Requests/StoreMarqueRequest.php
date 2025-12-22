<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarqueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255|unique:marques,nom',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de la marque est obligatoire.',
            'nom.unique' => 'Cette marque existe déjà.',
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'Formats acceptés : jpg, jpeg, png, webp.',
            'image.max' => 'La taille de l\'image ne doit pas dépasser 2MB.',
        ];
    }
}
