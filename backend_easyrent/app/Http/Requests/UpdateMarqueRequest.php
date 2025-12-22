<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMarqueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

   public function rules(): array
    {
        return [
            'nom' => 'sometimes|string|max:255|unique:marques,nom',
            'image' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'Formats acceptés : jpg, jpeg, png, webp.',
            'image.max' => 'La taille de l\'image ne doit pas dépasser 2MB.',
        ];
    }
}
