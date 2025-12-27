<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vehicule_id',
        'start_date',
        'end_date',
        'total_price',
        'days',
        'status',
        'frait_retard',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
