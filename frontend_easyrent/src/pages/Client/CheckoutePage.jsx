import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../Services/StripePromise";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
