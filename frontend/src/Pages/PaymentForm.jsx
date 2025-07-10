import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import api from "../Http";


const CARD_ELEMENT_OPTIONS = {
    style: {
        marginTop: "10px"
        ,
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSize: "16px",
            "::placeholder": {
                color: "#a0aec0",
            },
        },
        invalid: {
            color: "#e53e3e",
            iconColor: "#e53e3e",
        },
    },
};

const PaymentForm = () => {
    const location = useLocation();
    const formData = location.state;
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        const faceapi = async () => {
            try {
                const response = await api.post('create-payment-intent', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        faceapi()
    }, [formData]);

   


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
            }
        });


        if (result.error) {
            alert("Payment failed: " + result.error.message);
        } else {
            if (result.paymentIntent.status === "succeeded") {
                navigate('/admin/orderlists')
                alert("✅ Payment successful!");
                // alert("✅ Payment successful!");
            }
        }
    };



    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="my-32 bg-slate-100 mx-auto max-w-lg shadow-md flex flex-col text-xl py-10 px-4 rounded-md">
                <h2 className="text-center text-primary mb-10 text-3xl font-bold">Stripe Payment Gateway</h2>
                <CardElement options={CARD_ELEMENT_OPTIONS} className="py-5 px-4 text-primary text-2xl" />
                <button
                    type="submit"
                    className="text-white bg-green-500 py-3 shadow-md rounded-md hover:bg-green-600 mt-6 inline-flex justify-center gap-2"
                    disabled={!stripe || !clientSecret}
                >
                    <span className="inline-flex items-center">
                        <span>{formData.total}</span>
                        <span><FaBangladeshiTakaSign /></span>
                    </span>
                    <span>Pay Now</span>
                </button>
            </form>
        </>
    );
};

export default PaymentForm;
