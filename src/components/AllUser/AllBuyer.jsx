/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const AllBuyer = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`https://ubit-back-end.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });
    const deleteBuyer = (id) => {
        fetch(`https://ubit-back-end.vercel.app/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Buyer Is Deleted");
                    refetch();
                }
            })
    }
    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-xl font-semibold text-gray-700'>All Buyers</h1>
            <div className="buyer mt-6">
                <div className="overflow-x-auto shadow-md rounded-xl z-[50]">
                    <table className="table table-lg table-pin-rows table-pin-cols rounded-xl z-[50] overflow-hidden">
                        <thead className='bg-neutral'>
                            <tr className='bg-neutral text-white'>
                                <td>Sn</td>
                                <td>Name</td>
                                <td>Address</td>
                                <td>Email</td>
                                <td>Verification</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, i) =>
                                    user.role == "buyer" && <tr key={user._id}>
                                        <td>{i - 1}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.address}</td>
                                        <td>{user.email}</td>
                                        <td>{user.verify == true ? "Verified" : "Not Verified"}</td>
                                        <td><button onClick={() => deleteBuyer(user._id)} className='btn btn-sm btn-ghost'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg></button></td>
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

export default AllBuyer;