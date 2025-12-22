<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule_images extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicule_id',
        'path',
        'public_id',
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }
}
