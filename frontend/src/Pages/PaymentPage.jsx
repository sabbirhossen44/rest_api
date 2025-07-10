import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

// Stripe publishable key
// const stripePromise = loadStripe("pk_test_your_publishable_key_here");
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </>
    );
};

export default PaymentPage;
