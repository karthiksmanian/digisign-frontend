'use client'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

export default function Page() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-500'>
            <ToastContainer
                theme='dark'
                closeButton={false}
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {isLoginPage ? (<Login isLogin={setIsLoginPage} />) : (<Signup isLogin={setIsLoginPage} />)}
        </div>
    );
}