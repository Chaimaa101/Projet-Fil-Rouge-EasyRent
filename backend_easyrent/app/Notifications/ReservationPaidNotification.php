<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

   
class ReservationPaidNotification extends Notification
{
    use Queueable;

    public $reservation;

    public function __construct($reservation)
    {
        $this->reservation = $reservation;
    }

    // Canaux de notification : base de données + email
    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    // Stockage dans la base de données
    public function toDatabase($notifiable)
    {
        return [
            'reservation_id' => $this->reservation->id,
            'vehicule' => $this->reservation->vehicule->nom,
            'message' => 'Votre réservation a été confirmée !',
            'invoice_path' => $this->reservation->invoice_path
        ];
    }

    // Contenu de l'email
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Réservation Confirmée')
                    ->line('Votre réservation a été confirmée avec succès.')
                    ->action('Télécharger la facture',  $this->reservation->invoice_path)
                    ->line('Merci d\'avoir choisi notre service !');
    }
}

