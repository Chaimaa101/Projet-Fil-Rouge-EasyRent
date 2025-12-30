<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Gate;

class InvoiceController extends Controller
{

    public function show(Reservation $reservation)
    {
        Gate::authorize('is-owner', $reservation);

        if ($reservation->status !== 'paid') {
            abort(403, 'Invoice not available');
        }

        $pdf = Pdf::loadView('invoice', [
            'reservation' => $reservation
        ]);

        return $pdf->stream("invoice-{$reservation->id}.pdf");
    }

    public function download(Reservation $reservation)
    {
        Gate::authorize('is-owner', $reservation);

        if ($reservation->status !== 'paid') {
            abort(403, 'Invoice not available');
        }

        $pdf = Pdf::loadView('invoice', [
            'reservation' => $reservation
        ]);

        return $pdf->download("invoice-{$reservation->id}.pdf");
    }
}

