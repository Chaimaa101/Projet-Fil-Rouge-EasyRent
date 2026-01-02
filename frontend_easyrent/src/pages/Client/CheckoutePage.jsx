import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { getStripe } from './../../Services/StripePromise.jsx';

export default function CheckoutPage() {
   const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    getStripe().then((stripe) => {
      setStripePromise(stripe);
    });
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
