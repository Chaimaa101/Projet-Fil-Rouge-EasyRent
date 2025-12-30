<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'user _id',
        'payment_method',
        'payment_intent_id',
        'amount',
        'status',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
