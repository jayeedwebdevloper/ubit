/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <h1 className='md:text-8xl text-3xl text-gray-500 font-semibold'>404</h1>
            <h1 className='md:text-3xl text-lg text-gray-500 font-semibold py-2'>Page Not Found</h1>
           <Link to={'/'} className='btn btn-secondary capitalize rounded-md text-lg mt-3'>Go Back</Link>
        </div>
    );
};

export default Error;