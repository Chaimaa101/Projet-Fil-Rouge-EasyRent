<?php

namespace App\Listeners;

use App\Events\ReservationPaid;
use App\Notifications\ReservationPaidNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateInvoiceAndNotify implements ShouldQueue
{

    use Queueable;

    public function handle(ReservationPaid $event)
    {
        $reservation = $event->reservation;

        // Update statuses
        $reservation->update(['status' => 'paid']);
        $reservation->vehicule->update(['status' => 'loue']);

        // Notify user
        $reservation->user->notify(
            new ReservationPaidNotification($reservation)
        );

    }
}



