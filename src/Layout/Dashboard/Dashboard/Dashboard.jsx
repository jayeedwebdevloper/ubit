/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import Header from '../../../Shared/Header/Header';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthProvider } from '../../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../../../hook/useAdmin';

const Dashboard = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);
    const { user } = useContext(AuthProvider);
    const [isAdmin] = useAdmin(user?.email);
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://ubit-back-end.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <>
            <Header></Header>
            <div className="dashboard-body w-full pt-20 relative">
                <div className="dash-menu md:w-64 shadow-md md:h-screen pt-4 pb-4 md:fixed left-0 bg-base-100">
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button md:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> Dashboard Menu
                            </label>
                        </div>
                        <div className="drawer-side pt-20 z-[500]">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className='md:hidden menu p-4 w-52 min-h-full bg-base-200 text-base-content'>

                                {
                                    !isAdmin ? undefined :
                                        <>
                                            <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-buyer'}>Buyers</NavLink></li>
                                            <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-seller'}>Sellers</NavLink></li>
                                            <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-products'}>Products</NavLink></li>
                                            <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/messages'}>Messages</NavLink></li>
                                            <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/orders'}>Orders</NavLink></li>
                                        </>
                                }
                                {
                                    users.role == 'seller' ? <>
                                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/my-products'}>My Products</NavLink></li>
                                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/add-product'}>Add Product</NavLink></li>
                                    </> : undefined
                                }
                                {
                                    users.role == 'buyer' ? <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/cart'}>Cart</NavLink></li> : undefined
                                }
                                {
                                    !isAdmin ? undefined : <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-blogs'}>All Blogs</NavLink></li>
                                }
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/my-blogs'}>My Blogs</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/add-blogs'}>Add Blogs</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <ul className='md:block hidden'>
                        {
                            !isAdmin ? undefined : <>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-buyer'}>Buyers</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-seller'}>Sellers</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-products'}>Products</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/messages'}>Messages</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/orders'}>Orders</NavLink></li>
                            </>
                        }
                        {
                            users.role == 'seller' ? <>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/my-products'}>My Products</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/add-product'}>Add Product</NavLink></li>
                            </> : undefined
                        }
                        {
                            users.role == 'buyer' ? <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/cart'}>Cart</NavLink></li> : undefined
                        }
                        {
                            !isAdmin ? undefined : <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/all-blogs'}>All Blogs</NavLink></li>
                        }
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/my-blogs'}>My Blogs</NavLink></li>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-8 nav-link'} to={'/dashboard/add-blogs'}>Add Blogs</NavLink></li>
                    </ul>
                </div>
                <div className="dash-page md:ps-72 md:pt-4 pt-6">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;