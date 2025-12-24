import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../Services/api';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // 1️⃣ Call backend to create PaymentIntent
    const { data } = await api.post('/create-payment', { amount: 100 }); // $1.00

    // 2️⃣ Confirm the payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Paiement réussi !');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Payer
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
