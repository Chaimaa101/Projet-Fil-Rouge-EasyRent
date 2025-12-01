<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicule_id',
        'nom',
        'montant_reduction',
        'statut',
        'date_limit',
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }
}
