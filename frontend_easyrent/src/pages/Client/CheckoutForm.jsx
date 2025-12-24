import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:8000/api/create-payment-intent",
      { amount: 50 } 
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      alert("Paiement réussi 🎉");
    }
  };
console.log(STRIPE_PUBLIC_KEY)
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Payer</button>
    </form>
  );
}
