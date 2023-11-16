/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from '../../assets/slide-1.png';
import slide2 from '../../assets/slide-2.png';
import slide3 from '../../assets/slide-3.png';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../Context/Context';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import banner1 from '../../assets/banner1.jpg';
import secure from '../../assets/secure.png';

const Home = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);
    const { user } = useContext(AuthProvider);
    const { register, handleSubmit, reset } = useForm();
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/products');
            const data = await res.json();
            return data;
        }
    });
    const { data: mens = [] } = useQuery({
        queryKey: ["mens"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/category?category=Men');
            const data = await res.json();
            return data
        }
    });
    const { data: womens = [] } = useQuery({
        queryKey: ["womens"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/category?category=Women');
            const data = await res.json();
            return data
        }
    });
    const { data: shoes = [] } = useQuery({
        queryKey: ["shoes"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/category?category=Shoes');
            const data = await res.json();
            return data
        }
    });
    const { data: blogs = [] } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/blogs');
            const data = await res.json();
            return data;
        }
    });
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
        <div className='container mx-auto px-4 pt-20 main-slide'>
            <Carousel autoPlay>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pb-5 md:pb-0'>
                    <img className='w-1/4' src={slide1} alt="summer" />
                    <div className="content-slider flex justify-start items-start flex-col ps-5">
                        <h5 className='text-sm lg:text-2xl pb-2 font-semibold'>Summer 2019 Sale</h5>
                        <h2 className='text-2xl lg:text-5xl xl:text-7xl font-semibold pb-2'>Summer Collection</h2>
                        <p className='text-md lg:text-lg font-semibold pb-4'>All sizes and price ranges</p>
                        <button className='btn btn-sm lg:btn-md btn-default capitalize lg:text-lg'>Discover Now</button>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pb-5 md:pb-0'>
                    <img className='w-1/4' src={slide2} alt="winter" />
                    <div className="content-slider flex justify-start items-start flex-col ps-5">
                        <h5 className='text-sm lg:text-2xl pb-2 font-semibold'>Winter 2019 Sale</h5>
                        <h2 className='text-2xl lg:text-5xl xl:text-7xl font-semibold pb-2'>Winter Collection</h2>
                        <p className='text-md lg:text-lg font-semibold pb-4'>All sizes and price ranges</p>
                        <button className='btn btn-sm lg:btn-md btn-default capitalize lg:text-lg'>Discover Now</button>
                    </div>
                </div>
            </Carousel>
            <div className="w-full pt-4">
                <img className='w-full mx-auto' src={banner1} alt="ubit" />
            </div>
            <div className="pb-5 pt-16">
                <h1 className='text-center font-bold text-neutral text-4xl'>Categories</h1>
                <p className='text-center text-lg py-3'>Stunning collection that will not leave you …</p>
                <div className="flex h-max justify-center flex-wrap gap-5 mt-5">
                    {
                        mens.map((product, i) => {
                            if (i == 0) {
                                return <div key={product._id} className="card h-100 bg-base-100 shadow-xl">
                                    <figure className='h-64'><img src={product.frontImage} alt={product.productName} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Collection For Men's</h2>

                                        <div className="card-actions justify-end">
                                            <Link to={'/shop/men'} className="btn bg-pink-500 hover:bg-pink-700 capitalize text-white">Browse Now</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                    {
                        womens.map((product, i) => {
                            if (i <= 2) {
                                return <div key={product._id} className="card h-100 w-80 bg-base-100 shadow-xl">
                                    <figure className='h-64'><img src={product.frontImage} alt={product.productName} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Collection For Women's</h2>

                                        <div className="card-actions justify-end">
                                            <Link to={'/shop/women'} className="btn bg-pink-500 hover:bg-pink-700 capitalize text-white">Browse Now</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                    {
                        shoes.map((product, i) => {
                            if (i <= 1) {
                                return <div key={product._id} className="card h-100 w-80 bg-base-100 shadow-xl">
                                    <figure className='h-64'><img src={product.frontImage} alt={product.productName} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Collection For Shoes</h2>

                                        <div className="card-actions justify-end">
                                            <Link to={'/shop/shoe'} className="btn bg-pink-500 hover:bg-pink-700 capitalize text-white">Browse Now</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
                <div className="flex justify-center py-12">
                    <Link to={'/shop/all'} className='btn btn-sm bg-pink-500 hover:bg-pink-700 capitalize text-white'>Browse All Categories</Link>
                </div>
            </div>
            <div className="py-4">
                <h1 className='text-4xl font-semibold text-neutral text-center pb-10'>Blogs</h1>
                <div className="flex flex-wrap gap-4 justify-center">
                    {
                        blogs.map((blog, i) => {
                            if (i <= 5) {
                                return <div key={blog._id} className="card w-72 bg-base-100 shadow-xl pb-4">
                                    <figure><img className="w-full h-52" src={blog.prev} alt={blog.title} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{blog.title}</h2>
                                    </div>
                                    <div className="card-actions justify-start ps-4">
                                        <Link to={'/blogs'} className='btn bg-pink-500 text-white hover:bg-pink-800 capitalize'>See Blogs</Link>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
            <div className="py-4">
                <h1 className='text-4xl font-semibold text-neutral text-center pb-10'>Contact</h1>
                <div className="shadow bg-white rounded-md p-4 w-11/12 md:w-3/5 mx-auto">
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
            <div className="pt-8 pb-4">
                <img className='md:w-1/2 mx-auto' src={secure} alt="ubit" />
            </div>
        </div>
    );
};

export default Home;