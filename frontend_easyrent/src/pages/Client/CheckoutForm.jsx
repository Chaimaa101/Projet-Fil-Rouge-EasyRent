import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../Services/api';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage('');

    try {
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
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.succes('Paiement réussi ! ✅');
      }
    } catch (error) {
      toast.error('Erreur lors du paiement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-teal-200"
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Paiement
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Carte bancaire
        </label>
        <div className="p-3 border border-teal-300 rounded-md bg-teal-50">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>

      <div className="mb-4 text-gray-700">
        <p>Total à payer: <span className="font-semibold text-teal-600">100 MAD</span></p>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Payer'}
      </button>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">
          {message}
        </p>
      )}
    </form>
  );
}
