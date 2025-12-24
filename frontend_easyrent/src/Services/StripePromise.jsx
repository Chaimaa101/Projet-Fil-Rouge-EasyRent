import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import api from "./api";

let stripePromise;

export const getStripe = async () => {
  if (!stripePromise) {
    const { data } = await api.get("/stripe/public-key");
    stripePromise = loadStripe(data.key);
    console.log(stripePromise

    )
  }
  return stripePromise;
};
