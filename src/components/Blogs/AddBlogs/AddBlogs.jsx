/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthProvider } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';

const AddBlogs = () => {
    const { user } = useContext(AuthProvider);
    const today = new Date();
    const date = `${today.getDate()}/ ${today.getMonth() + 1}/ ${today.getFullYear()}`;
    const [blogPhoto, setBPhoto] = useState();
    const [blogPhotoP, setBPhotoP] = useState();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handlePost = (data) => {
        const title = data.title;
        const description = data.description;
        const time = date;
        const userName = user.displayName;
        const email = user?.email;
        const verify = user.emailVerified;
        const photo = new FormData();
        photo.append('file', blogPhoto);
        photo.append('upload_preset', 'photoupload');
        photo.append('cloud_name', 'dnhefldpl');
        fetch('https://api.cloudinary.com/v1_1/dnhefldpl/image/upload', {
            method: 'post',
            body: photo
        })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    const blog = {
                        title, description, time, userName, verify, prev: data.url, email
                    }
                    fetch('https://ubit-back-end.vercel.app/add-blog', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(blog)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                navigate('/dashboard/my-blogs');
                            }
                        })
                }
            })
    }

    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-xl font-semibold text-gray-700'>Add Your Blog</h1>
            <form onSubmit={handleSubmit(handlePost)}>
                <div className="py-2">
                    <div className="photo-box border border-slate-400 cursor-pointer overflow-hidden h-72 rounded-md flex items-center justify-center flex-col border-dashed" onClick={() => document.querySelector('.photo').click()}>
                        <input onChange={(e) => {
                            setBPhoto(e.target.files[0]);
                            setBPhotoP(URL.createObjectURL(e.target.files[0]));
                        }} type="file" name="front-image" id="image" draggable='true' className='photo' hidden />
                        {
                            blogPhoto ? <img className='preview w-1/2' src={blogPhotoP} alt='Front' /> : <div className='py-20 flex justify-center items-center flex-col gap-5'>
                                <p className='text-gray-500'>Upload Blog Photo</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 9.6875C7.88705 9.6875 7.1875 10.387 7.1875 11.25C7.1875 12.1129 7.88705 12.8125 8.75 12.8125C9.61295 12.8125 10.3125 12.1129 10.3125 11.25C10.3125 10.387 9.61295 9.6875 8.75 9.6875ZM5.3125 11.25C5.3125 9.35153 6.85153 7.8125 8.75 7.8125C10.6485 7.8125 12.1875 9.35153 12.1875 11.25C12.1875 13.1485 10.6485 14.6875 8.75 14.6875C6.85153 14.6875 5.3125 13.1485 5.3125 11.25Z" fill="#9E9C9C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.6825 19.5059C11.1203 21.2553 9.49096 23.648 7.7684 26.7098C7.51451 27.161 6.94289 27.321 6.49164 27.0671C6.04039 26.8131 5.8804 26.2416 6.13428 25.7904C7.89296 22.6645 9.59805 20.1448 11.2839 18.257C12.9655 16.3739 14.6736 15.068 16.4492 14.4531C18.259 13.8264 20.066 13.9438 21.8476 14.7743C23.598 15.5901 25.2939 17.0785 26.9781 19.1451C27.3051 19.5465 27.245 20.1371 26.8436 20.4641C26.4422 20.7913 25.8517 20.731 25.5246 20.3296C23.9339 18.3776 22.45 17.1238 21.0555 16.4736C19.6922 15.8383 18.389 15.7656 17.0629 16.2249C15.7025 16.696 14.2489 17.7519 12.6825 19.5059Z" fill="#9E9C9C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.05155 4.55148C3.16508 3.43795 4.67531 2.8125 6.25 2.8125H15.35C15.8678 2.8125 16.2875 3.23224 16.2875 3.75C16.2875 4.26776 15.8678 4.6875 15.35 4.6875H6.25C5.17253 4.6875 4.13921 5.11546 3.37738 5.8773C2.61553 6.63915 2.1875 7.67254 2.1875 8.75V21.25C2.1875 22.3274 2.6155 23.3606 3.37738 24.1225C4.13926 24.8845 5.17259 25.3125 6.25 25.3125H21.25C22.3274 25.3125 23.3608 24.8845 24.1226 24.1225C24.8845 23.3606 25.3125 22.3274 25.3125 21.25V15C25.3125 14.4823 25.7323 14.0625 26.25 14.0625C26.7678 14.0625 27.1875 14.4823 27.1875 15V21.25C27.1875 22.8247 26.562 24.3349 25.4485 25.4484C24.335 26.5619 22.8248 27.1875 21.25 27.1875H6.25C4.67524 27.1875 3.16503 26.5619 2.05155 25.4484C0.938061 24.3349 0.3125 22.8247 0.3125 21.25V8.75C0.3125 7.1753 0.93804 5.66499 2.05155 4.55148Z" fill="#9E9C9C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M23.4375 0.0999451C23.9553 0.0999451 24.375 0.519677 24.375 1.03744V11.0374C24.375 11.5552 23.9553 11.9749 23.4375 11.9749C22.9197 11.9749 22.5 11.5552 22.5 11.0374V1.03744C22.5 0.519677 22.9197 0.0999451 23.4375 0.0999451Z" fill="#9E9C9C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22.7756 0.374531C23.1417 0.00841633 23.7352 0.00841633 24.1013 0.374531L28.1013 4.37454C28.4674 4.74065 28.4674 5.33424 28.1013 5.70036C27.7352 6.06648 27.1417 6.06648 26.7756 5.70036L23.4384 2.36326L20.1013 5.70036C19.7352 6.06648 19.1416 6.06648 18.7756 5.70036C18.4094 5.33424 18.4094 4.74065 18.7756 4.37454L22.7756 0.374531Z" fill="#9E9C9C" />
                                </svg>
                            </div>
                        }
                    </div>
                </div>
                <div className="py-2">
                    <label htmlFor="title" className='label'>Title</label>
                    <input type="text" id='title' className='input input-bordered rounded-md w-full' {...register("title")} />
                </div>
                <div className="py-2">
                    <label htmlFor="description" className='label'>Description</label>
                    <textarea name="description" {...register('description')} id="description" rows="5" className="textarea textarea-bordered w-full rounded-md"></textarea>
                </div>
                <div className="pt-3 pb-5">
                    <button className='btn btn-secondary block text-center mx-auto w-1/3 capitalize'>Post Now</button>
                </div>
            </form>
        </div>
    );
};

export default AddBlogs;