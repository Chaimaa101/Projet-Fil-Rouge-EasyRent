import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../../Services/StripePromise";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";

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
