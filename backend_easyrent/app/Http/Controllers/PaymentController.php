<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController extends Controller
{
    // Process the payment
    public function processPayment(Request $request)
    {
        try {
            
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $amount = $request->amount * 100; // Convert to cents

        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'usd',
            'payment_method_types' => ['card'],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
