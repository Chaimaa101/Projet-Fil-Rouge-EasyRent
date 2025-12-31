<?php

namespace App\Http\Controllers;

use App\Events\ReservationPaid;
use App\Models\Reservation;
use App\Models\Payment; // Crée un modèle Payment si tu as une table séparée
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController extends Controller
{
    public function getUserPaiments(Request $request){
       try {
         $myPaiments = $request->user()->paiments()->with('reservation')->get();
        return $myPaiments;
       } catch (\Throwable $th) {
        return $th->getMessage();
       }
    }
   public function createPayment(Request $request,Reservation $reservation)
{
    Stripe::setApiKey(config('services.stripe.secret'));

    $paymentIntent = PaymentIntent::create([
        'amount' => $reservation->total_price * 100,
        'currency' => 'usd',
    ]);

    $request->user()->paiments()->create([
        'reservation_id'    => $reservation->id,
        'payment_intent_id' => $paymentIntent->id,
        'amount' => $reservation->total_price * 100,
        'payment_method' => 'card',
        'status'            => 'pending',
    ]);

    return response()->json([
        'clientSecret' => $paymentIntent->client_secret,
    ]);
}

     
public function confirmPayment(Reservation $reservation)
{
    Stripe::setApiKey(config('services.stripe.secret'));

    $payment = Payment::where('reservation_id', $reservation->id)->first();

    $intent = PaymentIntent::retrieve($payment->payment_intent_id);

    if ($intent->status !== 'succeeded') {
        return response()->json(['error' => 'Payment failed'], 400);
    }

    $payment->update(['status' => 'success']);

    event(new ReservationPaid($reservation));

    return response()->json(['message' => 'Payment confirmed']);
}


}
