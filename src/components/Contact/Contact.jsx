/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthProvider } from '../../Context/Context';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { user } = useContext(AuthProvider);
    const { register, handleSubmit, reset } = useForm();
    const sendMessage = (data) => {
        const name = data.name || user.displayName;
        const email = data.email || user.email;
        const message = data.message;

        const send = {
            name, email, message
        }

        fetch('https://ubit-back-end.vercel.app/message', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(send)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Thanks For Message, We Will Reply Soon Via Email");
                    reset()
                }
            })
    }
    return (
        <div className='container mx-auto px-5'>
            <div className="pt-24">
                <h1 className="text-center text-3xl font-bold pb-3">Contact Us</h1>
                <p className="text-center text-xl font-semibold pb-14">Feel free to write any complain or suggestion</p>
                <div className="md:flex gap-6">
                    <div className="w-full md:w-2/4">
                        <h1 className='text-2xl font-bold'>Ubit Company</h1>
                        <p className='text-lg py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum fermentum molestie. Nam tincidunt quis nisl sed fringilla. Cras eget elit at sem sollicitudin dapibus.
                            Feel free to contact with us by using the details below.</p>

                        <div className="flex gap-3 items-center">
                            <div className="rounded-full bg-pink-500 w-10 h-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                            </div>
                            <p className='text-xl font-semibold'>+880 1234567890</p>
                        </div>
                        <div className="flex gap-3 items-center py-4">
                            <div className="rounded-full bg-pink-500 w-10 h-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                </svg>
                            </div>
                            <p className='text-xl font-semibold'>info@ubit.com</p>
                        </div>
                        <div className="flex gap-3 items-center pb-4">
                            <div className="rounded-full bg-pink-500 w-10 h-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </div>
                            <p className='text-xl font-semibold'>123 Dhaka Banani</p>
                        </div>
                    </div>
                    <div className="w-full px-5 pb-8">
                        <h1 className="text-2xl font-bold pb-4">Leave Your Message</h1>
                        <div className="shadow bg-white rounded-md p-4">
                            <form onSubmit={handleSubmit(sendMessage)}>
                                <div className="py-2 grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="name" className='label'>Full Name</label>
                                        <input type="text" readOnly={user?.uid} defaultValue={user?.displayName} {...register('name')} className='input input-bordered rounded-md w-full' />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className='label'>Email</label>
                                        <input type="email" readOnly={user?.uid} defaultValue={user?.email} {...register('email')} className='input input-bordered rounded-md w-full' />
                                    </div>
                                </div>
                                <div className="py-2">
                                    <label htmlFor="message" className='label'>Message</label>
                                    <textarea name="message" {...register('message')} id="message" rows="4" className='w-full rounded-md textarea textarea-bordered'></textarea>
                                </div>
                                <div className="text-center">
                                    <button className='btn btn-secondary w-52 mt-5'>Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;