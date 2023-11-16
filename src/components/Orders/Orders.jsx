/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Orders = () => {
    const { data: orders = [], refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/orders');
            const data = await res.json();
            return data;
        }
    });
    const deliver = (order) => {
        fetch(`https://ubit-back-end.vercel.app/orders/deliver/${order._id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ delivered: "delivered" })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged || data.modifiedCount > 0) {
                    fetch(`https://ubit-back-end.vercel.app/cart?paymentId=${order.paymentId}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                toast.success('Order Is Delivered');
                                refetch()
                            }
                        })
                }
            })
    }
    return (
        <div className='container mx-auto px-5'>
            <h1 className='text-xl font-semibold text-gray-700'>Orders : {orders.length}</h1>
            <div className="products mt-6">
                <div className="overflow-x-auto shadow-md rounded-xl z-[50]">
                    <table className="table table-lg table-pin-rows table-pin-cols rounded-xl z-[50] overflow-hidden">
                        <thead className='bg-neutral'>
                            <tr className='bg-neutral text-white'>
                                <td>Sn</td>
                                <td>Product Name</td>
                                <td>User Name</td>
                                <td>Product ID</td>
                                <td>Price</td>
                                <td>Size</td>
                                <td>Email</td>
                                <td>Payment ID</td>
                                <td>Payment Status</td>
                                <td>Date</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, i) =>
                                    <tr key={order._id}>
                                        <td className='capitalize'>{i + 1}</td>
                                        <td className='capitalize'>{order.productName}</td>
                                        <td className='capitalize'>{order.userName}</td>
                                        <td className='capitalize'>{order.productId}</td>
                                        <td className='capitalize'>{order.price}</td>
                                        <td className='capitalize'>{order.size}</td>
                                        <td className='capitalize'>{order.email}</td>
                                        <td className='capitalize'>{order.paymentId}</td>
                                        <td className='capitalize'>{order.payStatus}</td>
                                        <td className='capitalize'>{order.today}</td>
                                        <td className='capitalize'>
                                            {
                                                order?.delivered == 'delivered' ? <p>Delivered</p> : <button onClick={() => deliver(order)} className='btn btn-sm capitalize btn-info'>Approve</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;