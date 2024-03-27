'use client'

import Toaster from '@/components/ui/toaster';
import Login from './components/login';
import Signup from './components/signup';
import { useState } from 'react';

export default function Page() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-500'>
            <Toaster />
            {isLoginPage ? (<Login isLogin={setIsLoginPage} />) : (<Signup isLogin={setIsLoginPage} />)}
        </div>
    );
}