<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'color',
        'annee',
        'prix_day',
        'description',
        'registration_number',
        'seats',
        'transmission',
        'carburant',
        'status',
        'immatriculation',
        'category_id',
        'marque_id',
    ];


    public function marque()
    {
        return $this->belongsTo(Marque::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function images()
    {
        return $this->hasMany(Vehicule_images::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }
}
