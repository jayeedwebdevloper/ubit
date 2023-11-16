/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Header from '../../Shared/Header/Header';
import { NavLink, Outlet } from 'react-router-dom';

const Shop = () => {
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div>
            <div className="dashboard-body w-full pt-20 md:flex">
                <div className="dash-menu md:w-72 shadow-md pt-4 pb-4 bg-base-100">
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">

                            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button md:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> Category
                            </label>
                        </div>
                        <div className="drawer-side pt-20 z-[500]">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className='md:hidden menu p-4 w-52 min-h-full bg-base-200 text-base-content'>
                                <h1 className='text-xl font-semibold ps-8 py-2'>Category</h1>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/all'}>All</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/women'}>Women's</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/men'}>Men's</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/kid'}>Kids</NavLink></li>
                                <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/shoe'}>Shoes</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <ul className='md:block hidden'>
                        <h1 className='text-xl font-semibold ps-8 py-2'>Category</h1>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/all'}>All</NavLink></li>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/men'}>Men's</NavLink></li>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/women'}>Women's</NavLink></li>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/kid'}>Kids</NavLink></li>
                        <li className='w-full'><NavLink className={'block py-2 text-md font-semibold w-full ps-9 nav-link'} to={'/shop/shoe'}>Shoes</NavLink></li>
                    </ul>
                </div>
                <div className="dash-page w-full ps-5 md:pt-4 pt-6">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Shop;