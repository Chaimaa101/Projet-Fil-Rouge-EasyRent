<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marque extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'image',
    ];

    public function vehicules()
    {
        return $this->hasMany(Vehicule::class);
    }
}
