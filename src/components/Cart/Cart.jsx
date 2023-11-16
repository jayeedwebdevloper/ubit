/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthProvider } from '../../Context/Context';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const Cart = () => {
    const { user } = useContext(AuthProvider);
    const { data: carts = [], refetch } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://ubit-back-end.vercel.app/cart/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    const stripePromise = loadStripe(import.meta.env.VITE_StripKey);
    const deleteCart = (id) => {
        fetch(`https://ubit-back-end.vercel.app/cart/d/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Your Cart Is Deleted');
                    refetch();
                }
            })
    }
    const closeModal = (i) => {
        document.getElementById(`close${i}`).click();
    }
    return (
        <div className='container mx-auto px-5'>
            <div className="pt-2 pb-5">
                <h1 className='text-2xl font-semibold'>Your Cart : {carts.length}</h1>
                <div className="products mt-6">
                    <div className="overflow-x-auto shadow-md rounded-xl z-[50]">
                        <table className="table table-lg table-pin-rows table-pin-cols rounded-xl z-[50] overflow-hidden">
                            <thead className='bg-neutral'>
                                <tr className='bg-neutral text-white'>
                                    <td>Sn</td>
                                    <td>Product ID</td>
                                    <td>Product Name</td>
                                    <td>Size</td>
                                    <td>Price</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts.map((cart, i) =>
                                        <tr key={cart._id}>
                                            <td>{i + 1}</td>
                                            <td>{cart.productId}</td>
                                            <td>{cart.productName}</td>
                                            <td>{cart.size}</td>
                                            <td><p>${cart.price}</p></td>
                                            <td className='flex gap-2 items-center'>
                                                {
                                                    cart?.paid == 'Paid' ? "Pending" : <><button onClick={() => document.getElementById(`my_modal_${i}`).showModal()} className='btn btn-sm btn-accent capitalize'>Cash Out</button>
                                                        <button onClick={() => deleteCart(cart._id)} className='btn btn-sm btn-ghost'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0000" viewBox="0 0 16 16">
                                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                        </svg></button></>
                                                }
                                                <dialog id={`my_modal_${i}`} className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id={`close${i}`}>✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-lg">{cart.productName}</h3>
                                                        <p className="py-4">Please Pay $ {cart.price} For Order</p>
                                                        <Elements stripe={stripePromise}>
                                                            <CheckoutForm order={cart} closeModal={closeModal} i={i} refetch={refetch}></CheckoutForm>
                                                        </Elements>
                                                    </div>
                                                </dialog>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;