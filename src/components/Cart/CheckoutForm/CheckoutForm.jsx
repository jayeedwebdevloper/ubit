/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ order, closeModal, i, refetch }) => {
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState();
    const price = +(order.price);



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://ubit-back-end.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        const { paymentIntent, err } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: order.userName,
                        email: order.email,
                    },
                },
            },
        );

        if (err) {
            setCardError(err.message);
            return
        }
        if (paymentIntent.status == 'succeeded') {
            const paymentId = paymentIntent.id;
            const payStatus = 'Paid';

            const pay = {
                paymentId,
                payStatus
            }

            fetch(`https://ubit-back-end.vercel.app/paid/${order._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(pay)
            }).then(res => res.json()).then(data => {
                if (data.acknowledged || data.modifiedCount > 0) {
                    toast.success("Payment is successful, You will get email soon", { duration: "1000" });
                    const orders = {
                        productId: order.productId, productName: order.productName, price: order.price, size: order.size, today: order.today, userName: order.userName, email: order.email, paymentId, payStatus, deliver: "pending"
                    }
                    fetch('https://ubit-back-end.vercel.app/orders/paid', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(orders)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                refetch();
                            }
                        })
                    closeModal(i);
                    refetch();
                }
            })

        }
    }
    return (

        <div>
            <form onSubmit={handleSubmit} className='form-control'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success rounded-md mt-5 btn-sm capitalize' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {
                    cardError && <p className='text-red-500'>{cardError}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;