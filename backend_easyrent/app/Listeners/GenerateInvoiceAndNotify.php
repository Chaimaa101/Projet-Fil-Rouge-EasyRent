<?php

namespace App\Listeners;

use App\Events\ReservationPaid;
use App\Notifications\ReservationPaidNotification;
use Barryvdh\DomPDF\Facade\Pdf ;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateInvoiceAndNotify implements ShouldQueue
{
    use Queueable;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */


    public function handle(ReservationPaid $event)
    {
        $reservation = $event->reservation;

        // 1️⃣ Update reservation status
        $reservation->update(['status' => 'paid']);

        // 2️⃣ Generate invoice PDF
        $pdf = Pdf::loadView('invoice', compact('reservation'));
        $path = "invoices/invoice_{$reservation->id}.pdf";

        $pdfPath = storage_path("invoices/invoice_{$reservation->id}.pdf");

        $uploadedFile = Cloudinary::upload($pdfPath, [
            'resource_type' => 'raw',   // important for PDF
            'folder' => 'invoices',
        ]);

        // Get URL
        $pdfUrl = $uploadedFile->getSecurePath();

        // Store URL in reservation
        $reservation->invoice_path = $pdfUrl;
        $reservation->save();
        // 3️⃣ Save invoice path (optional)
        $reservation->invoice_path = $path;
        $reservation->save();

        // 4️⃣ Notify user
        $reservation->user->notify(new ReservationPaidNotification($reservation));
    }
}
