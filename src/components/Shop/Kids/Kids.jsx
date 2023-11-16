/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { AuthProvider } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Kids = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { user } = useContext(AuthProvider);
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/category?category=Kids');
            const data = await res.json();
            return data
        }
    });
    const navigate = useNavigate();
    const addToCart = (i) => {
        document.getElementById(`my_modal_${i}`).showModal();
    }
    const handleUpdate = (product, e, i) => {
        e.preventDefault();
        const form = e.target;
        const size = form.size.value;
        const productId = product._id;
        const productName = product.productName;
        const price = product.price;
        const date = new Date();
        const userName = user.displayName;
        const email = user.email;
        const today = `${date.getDate()}/ ${date.getMonth()}/ ${date.getFullYear()}`;
        const cartSend = {
            productId, productName, price, today, size, userName, email
        }

        fetch(`https://ubit-back-end.vercel.app/cart`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartSend)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Product Updated To Cart");
                    refetch();
                    document.getElementById(`close${i}`).click();
                    navigate('/dashboard/cart')
                }
            })
    }
    return (
        <div className='container mx-auto px-4 pb-5'>
            <h1 className='text-xl font-semibold text-gray-700'>For Kids</h1>
            <div className="pt-8">
                <div className="flex flex-wrap justify-center h-100 gap-5">
                    {
                        products.map((product, i) =>
                            <div key={product._id} className="card shop-hover w-96 bg-base-100 shadow-xl relative overflow-hidden">
                                <figure className='h-64 relative'> <div className="front-hover">
                                    <img className='one' src={product.frontImage} alt={product.productName} />
                                    <img className='two absolute -top-20 opacity-0 left-0 right-0 w-full' src={product.backPhoto} alt={product.productName} />
                                </div></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.productName}</h2>
                                    <p>{product.description}</p>
                                    <h2><b>Category : </b>{product.category}</h2>
                                    <h2><b>Condition : </b>{product.condition}</h2>
                                    <h2 className='capitalize'><b>Availability : </b>{product.availability}</h2>
                                    <h2 className='text-lg font-semibold flex items-center gap-2'>$ {
                                        product.availability == 'sold' ? '0' : <p><del className='text-gray-400'>{product.regularPrice}</del> {product.price}</p>
                                    }</h2>
                                    <div className="card-actions justify-between items-center">
                                        <p className='text-xs text-gray-500 font-bold'>Added in {product.date}</p>
                                        <button onClick={() => addToCart(i)} disabled={product.availability == 'sold' && true} className="btn btn-secondary capitalize">Add to cart</button>
                                    </div>
                                </div>
                                {
                                    product.availability == 'sold' && <div className='absolute bg-zinc-300 w-full flex items-center bg-opacity-80 justify-center h-full'>
                                        <h4 className='bg-black text-xl text-center text-white w-full'>Sold</h4>
                                    </div>
                                }
                                <dialog id={`my_modal_${i}`} className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id={`close${i}`}>✕</button>
                                        </form>
                                        <h3 className="font-bold text-lg">{product.productName}</h3>
                                        <p className="py-4">Please Select Your Size</p>
                                        <form onSubmit={(e) => handleUpdate(product, e, i)} className='form-control'>
                                            <div className="py-2 lg:flex justify-between items-end gap-3">
                                                <div className='lg:w-1/2 w-full'>
                                                    <label htmlFor="size" className='label font-semibold text-md'>Size</label>
                                                    <select name="size" id="size" className='select select-bordered rounded-md w-full'>
                                                        <option value={'S'}>S</option>
                                                        <option value={'M'}>M</option>
                                                        <option value={'L'}>L</option>
                                                        <option value={'XL'}>XL</option>
                                                        <option value={'XXL'}>XXL</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button className='btn btn-md btn-secondary capitalize'>Add to cart</button>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Kids;