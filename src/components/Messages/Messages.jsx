/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const Messages = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);
    const { data: messages = [] } = useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/message');
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className='container mx-auto px-4 pb-5'>
            <h1 className='text-xl font-semibold text-gray-700'>Messages: {messages.length}</h1>
            <div className="products mt-6">
                <div className="overflow-x-auto shadow-md rounded-xl z-[50]">
                    <table className="table table-lg table-pin-rows table-pin-cols rounded-xl z-[50] overflow-hidden">
                        <thead className='bg-neutral'>
                            <tr className='bg-neutral text-white'>
                                <td>Sn</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Message</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messages.map((message, i) =>
                                    <tr key={message._id}>
                                        <td className='capitalize'>{i + 1}</td>
                                        <td className='capitalize'>{message.name}</td>
                                        <td className='lowercase'>{message.email}</td>
                                        <td className='capitalize'>{message.message}</td>
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

export default Messages;