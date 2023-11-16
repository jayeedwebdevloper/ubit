/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { AuthProvider } from '../../Context/Context';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Blogs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { user } = useContext(AuthProvider);
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch("https://ubit-back-end.vercel.app/blogs");
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className='container mx-auto px-4'>
            <div className="pt-28 pb-5">
                <h1 className='text-center text-3xl font-bold'>Blogs</h1>
                <div className="pt-5">
                    {
                        blogs.map(blog =>
                            <div key={blog._id} className="md:flex block gap-5 py-4 px-4">
                                <div className="overflow-hidden rounded-md w-11/12">
                                    <img className='w-full' src={blog.prev} alt={blog.title} />
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-2xl font-semibold'>{blog.title}</h1>
                                    <div className='flex items-center gap-5 text-sm font-semibold py-3 text-gray-500'>
                                        <div className="flex items-center gap-2">
                                            <p>Author : {blog.userName}</p>{blog.verify ? <svg className='p-0 mt-1' xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#0048ff" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#c2c2c2" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                            </svg>}
                                        </div>
                                        <p>Posted : {blog.time}</p>
                                    </div>
                                    <p>{blog.description}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-center">
                    <Link to={'/dashboard/add-blogs'} className='btn btn-secondary capitalize w-40 rounded-md my-6 mx-auto text-center'>Add Your Own Blog</Link>
                </div>
            </div>
        </div>
    );
};

export default Blogs;