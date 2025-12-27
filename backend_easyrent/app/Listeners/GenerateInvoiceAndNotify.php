<?php

namespace App\Listeners;

use App\Events\ReservationPaid;
use App\Notifications\ReservationPaidNotification;
use Barryvdh\DomPDF\Facade\Pdf;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateInvoiceAndNotify implements ShouldQueue
{
    use Queueable;

    public function handle(ReservationPaid $event)
    {
         $reservation = $event->reservation;

        // Reservation
        $reservation->update(['status' => 'paid']);

        // Vehicle
        $reservation->vehicule->update(['status' => 'loue']);

        // 3️⃣ Generate PDF TEMPORAIRE
    $pdf = Pdf::loadView('invoice', compact('reservation'));

    $tempPath = storage_path("app/temp/invoice_{$reservation->id}.pdf");

    if (!file_exists(dirname($tempPath))) {
        mkdir(dirname($tempPath), 0755, true);
    }

    $pdf->save($tempPath); // ⬅️ fichier temporaire

    // 4️⃣ Upload Cloudinary
    $uploaded = Cloudinary::upload($tempPath, [
        'resource_type' => 'raw',
        'folder' => 'invoices',
        'public_id' => "invoice_{$reservation->id}",
    ]);

    $pdfUrl = $uploaded->getSecurePath();

    // 5️⃣ Save URL in DB
    $reservation->update([
        'invoice_path' => $pdfUrl
    ]);

        // Notification
        $reservation->user->notify(
            new ReservationPaidNotification($reservation)
        );
    }
    }

