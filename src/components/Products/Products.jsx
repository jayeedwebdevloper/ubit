/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const Products = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);

    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/products');
            const data = await res.json();
            return data;
        }
    });
    const updateProduct = (i) => {
        document.getElementById(`my_modal_${i}`).showModal();
    }
    const handleUpdate = (id, e, i) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.thisName.value;
        const regularPrice = form.regularPriceThis.value;
        const price = form.thisPrice.value;
        const availability = form.thisAvail.value;
        const updateProduct = {
            productName, regularPrice, price, availability
        }
        fetch(`https://ubit-back-end.vercel.app/product/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Product Updated Successfully");
                    refetch();
                    document.getElementById(`close${i}`).click();
                }
            })


    }
    const deleteTheProduct = (product) => {
        const confirmDelete = confirm(`Are You Sure For Delete ${product.productName} ?`);
        if (confirmDelete) {
            fetch(`https://ubit-back-end.vercel.app/product/d/${product._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Product Is Deleted");
                        refetch();
                    }
                })
        }
    }
    return (
        <div className='container mx-auto px-4 pb-5'>
            <h1 className='text-xl font-semibold text-gray-700'>All Products: {products.length}</h1>
            <div className="products mt-6">
                <div className="overflow-x-auto shadow-md rounded-xl z-[50]">
                    <table className="table table-lg table-pin-rows table-pin-cols rounded-xl z-[50] overflow-hidden">
                        <thead className='bg-neutral'>
                            <tr className='bg-neutral text-white'>
                                <td>Sn</td>
                                <td>Name</td>
                                <td>Category</td>
                                <td>Regular Price</td>
                                <td>Offer</td>
                                <td>Condition</td>
                                <td>Availability</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, i) =>
                                    <tr key={product._id}>
                                        <td className='capitalize'>{i + 1}</td>
                                        <td className='capitalize'>{product.productName}</td>
                                        <td className='capitalize'>{product.category}</td>
                                        <td className='capitalize'>$ {product.regularPrice}</td>
                                        <td className='capitalize'>$ {product.price}</td>
                                        <td className='capitalize'>{product.condition}</td>
                                        <td className='capitalize'>{product.availability}</td>
                                        <td className='capitalize'>
                                            <button className='btn btn-ghost btn-sm btn-circle' onClick={() => updateProduct(i)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg></button>
                                            <button onClick={() => deleteTheProduct(product)} className='btn btn-sm btn-ghost btn-circle'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg></button>

                                            <dialog id={`my_modal_${i}`} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id={`close${i}`}>✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">{product.productName}</h3>
                                                    <p className="py-4">Update This Product Right Now</p>
                                                    <form onSubmit={(e) => handleUpdate(product._id, e, i)} className='form-control'>
                                                        <div className="py-2">
                                                            <label htmlFor="thisName" className='label font-semibold text-md'>Product Name</label>
                                                            <input type="text" className='input input-bordered rounded-md w-full' name="thisName" id="thisName" defaultValue={product.productName} />
                                                        </div>
                                                        <div className="py-2">
                                                            <label htmlFor="regularPriceThis" className='label font-semibold text-md'>Regular Price</label>
                                                            <input type="number" className='input input-bordered rounded-md w-full' name="regularPriceThis" id="regularPriceThis" defaultValue={product.regularPrice} />
                                                        </div>
                                                        <div className="py-2">
                                                            <label htmlFor="thisPrice" className='label font-semibold text-md'>Price</label>
                                                            <input type="number" className='input input-bordered rounded-md w-full' name="thisPrice" id="thisPrice" defaultValue={product.price} />
                                                        </div>
                                                        <div className="py-2 lg:flex justify-between items-end gap-3">
                                                            <div className='lg:w-1/2 w-full'>
                                                                <label htmlFor="thisAvail" className='label font-semibold text-md'>Availability</label>
                                                                <select name="thisAvail" id="thisAvail" className='select select-bordered rounded-md w-full'>
                                                                    <option value="available">Available</option>
                                                                    <option value="sold">Sold</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button className='btn btn-md btn-secondary'>Update</button>
                                                    </form>
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
    );
};

export default Products;