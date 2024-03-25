'use client'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function Page() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-500'>
            <ToastContainer
                theme='dark'
                closeButton={false}
                position="bottom-center"
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