import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { auth, provider } from '../../../context/firebase-config'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function Login({ isLogin }: { isLogin: Function }) {
    const [currentUser, setCurrentUser] = useState<any>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            setCurrentUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (error: any) {
            toast.error('' + error.message)
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            localStorage.setItem('user', JSON.stringify(user))
            router.push('/dashboard')
        } catch (error: any) {
            toast.error('' + error.message)
        }
    }

    const handleForgotPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent")
        } catch (error: any) {
            toast.error('' + error.message)
        }
    };

    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
        currentUser && router.push('/dashboard')
    }, [currentUser])

    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <div className='bg-gray-700 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5 bg-gray-200 rounded-tl-2xl rounded-bl-2xl'>
                    <div className='text-left text-gray-900 font-bold'><span className='text-gray-500'>Digi</span>Sign</div>
                    <div className='py-10 items-center'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Sign in to your account</h2>
                        <div className='border-2 w-10 border-gray-900 inline-block mb-2'></div>
                        <div className='flex justify-center mb-2'>
                            <button onClick={handleSignIn} className="flex px-4 py-2 border gap-2 border-slate-700 rounded-lg text-gray-700 hover:bg-gray-800 hover:border-gray-800 hover:text-slate-300 hover:shadow transition duration-150">
                                <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                <span className='text-sm'>Sign up with Google</span>
                            </button>
                        </div>
                        <div className='text-gray-500 my-3'>or use your social login account</div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center mb-3">
                                <div className="bg-gray-100 flex w-64 p-2 rounded-lg">
                                    <FaRegEnvelope className='text-gray-400 mr-2' />
                                    <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='email' className='bg-gray-100 outline-none text-gray-800 text-sm flex-1'></input>
                                </div>
                            </div>
                            <div className="flex flex-col items-center mb-3">
                                <div className="bg-gray-100 flex w-64 p-2 rounded-lg">
                                    <MdLockOutline className='text-gray-400 mr-2' />
                                    <input required onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='password' className='bg-gray-100 outline-none text-gray-800 text-sm flex-1'></input>
                                </div>
                            </div>
                            <div className="my-3 flex justify-center">
                                <div className="w-64 flex justify-end">
                                    <a onClick={(e) => handleForgotPassword(email)} className='text-xs text-blue-900 font-bold cursor-pointer'>Forgot password?</a>
                                </div>
                            </div>
                            <button className='border-2 border-gray-700 text-gray-900 rounded-full px-12 py-2 inline-block font-semibold transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:transition-delay-300'>Sign in</button>
                        </form>
                    </div>
                </div>
                <div className='w-2/5 bg-gray-900 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                    <h2 className='text-3xl font-bold mb-2'>Hello!</h2>
                    <div className='border-2 w-10 border-white inline-block mb-2'></div>
                    <p className='mb-10'>Doesn't have your account? Create one now!</p>
                    <a onClick={() => { isLogin(false) }} className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900 hover:transition-delay-300 cursor-pointer'>Sign up</a>
                </div>
            </div>
        </main>
    );
}