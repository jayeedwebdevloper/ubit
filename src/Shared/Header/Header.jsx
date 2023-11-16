/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthProvider } from '../../Context/Context';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
    const [menu, setMenu] = useState('hidden');
    const { user, logOut, verify } = useContext(AuthProvider);
    const { data: carts = [], refetch } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://ubit-back-end.vercel.app/cart/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    const { data: checkUser = [] } = useQuery({
        queryKey: ["checkUser", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://ubit-back-end.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    const menuControl = () => {
        if (menu == 'hidden') {
            setMenu('block');
        } else {
            setMenu('hidden');
        }
    }
    const signOut = () => {
        logOut()
            .then(() => {
                toast.success('Your Account Signed Out')
            })
    };
    const verifyEmail = () => {
        verify()
            .then(() => {
                toast.success("We Send Verification Email, Please Check");
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    return (
        <header className='shadow-sm pb-3 pt-1 bg-base-100 fixed left-0 z-[400] right-0 top-0'>
            <div className="container mx-auto px-4">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <Link to={'/'}><img className='w-16' src={logo} alt="UBIT" /></Link>
                    </div>
                    <div className="flex-none gap-2">
                        <ul className={`menubar ${menu} md:flex md:static absolute gap-2 bg-base-100 z-[100] md:z-auto shadow-sm md:shadow-none p-3 md:bg-transparent left-0 w-full top-full`}>
                            <li className='my-2 md:my-0'><NavLink to={'/'} className="font-bold px-2 nav-link hover:text-[#ff3da1] hover:underline hover:underline-offset-8">home</NavLink></li>
                            <li className='my-2 md:my-0'><NavLink to={'/shop/all'} className="font-bold px-2 nav-link hover:text-[#ff3da1] hover:underline hover:underline-offset-8">shop</NavLink></li>
                            <li className='my-2 md:my-0'><NavLink to={'/blogs'} className="font-bold px-2 nav-link hover:text-[#ff3da1] hover:underline hover:underline-offset-8">blogs</NavLink></li>
                            <li className='my-2 md:my-0'><NavLink to={'/about'} className="font-bold px-2 nav-link hover:text-[#ff3da1] hover:underline hover:underline-offset-8">about</NavLink></li>
                            <li className='my-2 md:my-0'><NavLink to={'/contact'} className="font-bold px-2 nav-link hover:text-[#ff3da1] hover:underline hover:underline-offset-8">contact</NavLink></li>
                        </ul>
                        <button onClick={() => menuControl()} className="btn btn-square block md:hidden bg-base-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        {
                            user?.uid ? <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="rounded-full">
                                        {
                                            user?.photoURL ? <img src={user.photoURL} alt={user?.displayName} /> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                            </svg>
                                        }
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[200] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li className='py-1 font-semibold'><p className='flex items-center'>{user.displayName}{user.emailVerified ? <svg className='p-0 ' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#0048ff" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg> : <button onClick={verifyEmail} className='btn btn-error btn-xs capitalize'>Verify Now</button>}</p></li>
                                    <li>
                                        <NavLink to={'/dashboard'} className={'my-1 font-bold'}>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    {
                                        checkUser.role == 'buyer' && <li><NavLink to={'/dashboard/cart'} className={'flex justify-between my-1 font-bold'}>Cart
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                {
                                                    carts.length > 0 && <span className="badge badge-sm indicator-item">{carts.length}</span>}
                                            </div>
                                        </NavLink></li>
                                    }
                                    <li><button onClick={() => signOut()} className='btn btn-sm btn-error my-1 font-bold capitalize'>Sign Out</button></li>
                                </ul>
                            </div>
                                :
                                <Link to={'/login'} className='btn btn-ghost btn-md btn-circle'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg></Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;