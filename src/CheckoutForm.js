import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

export default function CheckoutForm() {
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <form id="payment-form" onSubmit={(e) => handleSubmit(e, elements, stripe)}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Elements>
  );
}
