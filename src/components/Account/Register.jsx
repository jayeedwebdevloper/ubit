/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthProvider } from '../../Context/Context';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { updateUser, githubSign, googleSign, createUser } = useContext(AuthProvider);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cPass, setCPass] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [passError, setPError] = useState(false);
    const [pErrorM, setPEM] = useState('');
    const [pMatchM, setPMM] = useState('');
    const [passMatch, setPMatch] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from.pathname || '/';

    const { data: usersMongo = [] } = useQuery({
        queryKey: ['usersMongo'],
        queryFn: async () => {
            const res = await fetch('https://ubit-back-end.vercel.app/users');
            const data = await res.json();
            return data;
        }
    })

    const matching = () => {
        if (pass == cPass) {
            setPMatch(false)
            setPMM('')
        } else {
            setPMatch(true);
            setPMM("Password Doesn't Match");
        }
    }
    const validation = () => {
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+-]{8,16}$/.test(pass)) {
            setPError(true);
            setPEM("Password Must Be At Least 8 & Maximum 16 Character, 1 Letter & 1 Number")
        } else {
            setPError(false);
            setPEM('')
        }
    }

    const registerAccount = (e) => {
        e.preventDefault();

        const account = {
            fullName, email, role: status, address
        }
        createUser(email, pass)
            .then(result => {
                const user = {
                    displayName: fullName
                }
                updateUser(user)
                    .then(() => {
                        fetch('https://ubit-back-end.vercel.app/add-user', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(account)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    navigate("/");
                                }
                            })
                    })
            })
    }
    const google = () => {
        document.getElementById('my_modal_3').showModal();
    }
    const googleSignInTrue = () => {
        if (status.length != 0) {
            document.getElementById("close").click();
            googleSign()
                .then((result) => {
                    const user = result.user;
                    const account = {
                        fullName: user.displayName, email: user.email, role: status, address, verify: user.emailVerified
                    }
                    fetch('https://ubit-back-end.vercel.app/add-user', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(account)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                navigate("/");
                            }
                        })
                })
        }

    }
    const github = () => {
        document.getElementById('my_modal_2').showModal();
    }
    const githubSignInTrue = () => {
        if (status.length != 0) {
            document.getElementById("close1").click();
            githubSign()
                .then((result) => {
                    const user = result.user;
                    const account = {
                        fullName: user.displayName, email: user.email, role: status, address, verify: user.emailVerified
                    }
                    fetch('https://ubit-back-end.vercel.app/add-user', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(account)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                navigate("/");
                            }
                        })
                })
        }

    }
    return (
        <div className='container mx-auto px-4'>
            <div className="pt-28 pb-8">
                <h1 className='text-center text-3xl font-bold text-neutral'>Register Your Account</h1>
                <div className="flex justify-center items-center w-full pt-8">
                    <div className='bg-white shadow-md rounded-lg px-8 lg:w-1/2 w-full'>
                        <form onSubmit={registerAccount} className='form-control'>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <div className="py-2">
                                    <label htmlFor="fullName" className='label'>Full Name</label>
                                    <input onChange={(e) => setFullName(e.target.value)} type="text" id='fullName' required className='input input-bordered rounded-md w-full' />
                                </div>
                                <div className="py-2">
                                    <label htmlFor="email" className='label'>Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' required className='w-full rounded-md input input-bordered' />
                                </div>
                                <div className="py-2">
                                    <label htmlFor="pass" className='label'>Password</label>
                                    <input onChange={(e) => setPass(e.target.value)} onKeyUp={validation} type="password" id='pass' required className='w-full rounded-md input input-bordered' />
                                    <p className='text-sm text-red-800 font-semibold pt-3'>{pErrorM}</p>
                                </div>
                                <div className="py-2">
                                    <label htmlFor="cPass" className='label'>Confirm Password</label>
                                    <input onChange={(e) => setCPass(e.target.value)} onKeyUp={matching} type="password" id='cPass' required className='w-full rounded-md input input-bordered' />
                                    <p className='text-sm text-red-800 font-semibold pt-3'>{pMatchM}</p>
                                </div>
                            </div>
                            <div className="py-2">
                                <label htmlFor="status" className='label'>Account Type</label>
                                <select required onChange={(e) => setStatus(e.target.value)} className='select select-bordered rounded-md w-full' name="status" id="status">
                                    <option disabled={status.length != 0} defaultValue={'select'}>Select</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <div className="py-2">
                                {
                                    status == 'buyer' ? <>
                                        <label htmlFor="addressH" className='label'>Receiving Address</label>
                                        <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressH" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Home/ Receiving Address'></textarea>
                                    </> : status == 'seller' ? <>
                                        <label htmlFor="addressC" className='label'>Shop Address</label>
                                        <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressC" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Shop/ Company Address'></textarea>
                                    </> : undefined
                                }
                            </div>
                            <div className="py-2 flex justify-between">
                                <Link to={'/login'} className='text-sm cursor-pointer font-semibold text-fuchsia-600 hover:text-fuchsia-800'>Have Existing Account ?</Link>
                            </div>
                            <div className="py-4 text-center">
                                <button disabled={(fullName == '' || fullName.length == 0 && email == '' || email.length == 0 && pass == '' || pass.length == 0 && cPass == '' || cPass.length == 0 && status == '' || status == 'select' || status.length == 0 && pMatchM != '' || pMatchM.length != 0) ? true : address.length == 0 || address == '' && pErrorM != '' || pErrorM.length != 0 ? true : false} className='btn btn-secondary btn-wide rounded-xl'>Register</button>
                            </div>
                        </form>
                        <div className="divider">Or</div>
                        <div className="flex justify-center gap-5 pb-6">
                            <button onClick={() => google()} className='btn btn-ghost btn-sm w-2/5 capitalize bg-slate-200'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg> Google</button>
                            <button onClick={() => github()} className='btn btn-ghost btn-sm w-2/5 capitalize bg-slate-200'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg> GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button id='close' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Please Select The Account Type</h3>
                    <div>
                        <div className="py-2">
                            <select required onChange={(e) => setStatus(e.target.value)} className='select select-bordered rounded-md w-full' name="status" id="status">
                                <option disabled={status.length != 0} defaultValue={'select'}>Select</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        {
                            status == 'buyer' ? <>
                                <label htmlFor="addressH" className='label'>Receiving Address</label>
                                <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressH" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Home/ Receiving Address'></textarea>
                            </> : status == 'seller' ? <>
                                <label htmlFor="addressC" className='label'>Shop Address</label>
                                <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressC" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Shop/ Company Address'></textarea>
                            </> : undefined
                        }
                        <button onClick={googleSignInTrue} disabled={status.length == 0 || status == '' && address.length == 0 || address == ''} className='btn btn-secondary capitalize block text-center mx-auto w-28 mt-4'>Sign In</button>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button id='close1' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Please Select The Account Type</h3>
                    <div>
                        <div className="py-2">
                            <select required onChange={(e) => setStatus(e.target.value)} className='select select-bordered rounded-md w-full' name="status" id="status">
                                <option disabled={status.length != 0} defaultValue={'select'}>Select</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        {
                            status == 'buyer' ? <>
                                <label htmlFor="addressH" className='label'>Receiving Address</label>
                                <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressH" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Home/ Receiving Address'></textarea>
                            </> : status == 'seller' ? <>
                                <label htmlFor="addressC" className='label'>Shop Address</label>
                                <textarea onKeyUpCapture={(e) => setAddress(e.target.value)} name="address" id="addressC" className='textarea textarea-bordered rounded-md w-full' rows="3" placeholder='Enter Your Shop/ Company Address'></textarea>
                            </> : undefined
                        }
                        <button onClick={githubSignInTrue} disabled={status.length == 0 || status == '' && address.length == 0 || address == ''} className='btn btn-secondary capitalize block text-center mx-auto w-28 mt-4'>Sign In</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Register;