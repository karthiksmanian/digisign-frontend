import { FaFacebookF, FaGoogle, FaLinkedin, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { auth, provider } from '../../../context/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastStyles from './auth.module.css'

export default function Signup({ isLogin }: { isLogin: any }) {
    const [currentUser, setCurrentUser] = useState<any>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [showToast, setShowToast] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            console.log("data", data);
            setCurrentUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (error: any) {
            setShowToast(true);
            toast.error('' + error.message);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (password == repassword) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                console.log("userCredential", userCredential)
                const user = userCredential.user
                localStorage.setItem('token', JSON.stringify(user))
                localStorage.setItem('user', JSON.stringify(user))
                router.push('/dashboard')
            } else {
                throw new Error("Passwords do not match")
            }
        } catch (error) {
            setShowToast(true);
            toast.error('' + error);
        }
    }

    useEffect(() => {
        setShowToast(true);
        const timeout = setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setCurrentUser(localStorage.getItem('user'))
        currentUser && router.push('/dashboard')
    }, [])

    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            {showToast && (
                <ToastContainer
                    toastClassName={toastStyles["toast-class"]}
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
            )}
            <div className='bg-gray-700 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-2/5 bg-gray-900 text-white rounded-l-2xl py-36 px-12'>
                    <h2 className='text-3xl font-bold mb-2'>Hello!</h2>
                    <div className='border-2 w-10 border-white inline-block mb-2'></div>
                    <p>Already have your account?</p>
                    <p className='mb-10'>Sign in now!</p>
                    <a onClick={() => isLogin(true)} className='cursor-pointer border-2 border-white rounded-full px-12 py-2 inline-block font-semibold transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900 hover:transition-delay-300'>Sign in</a>
                </div>
                <div className='w-3/5 p-5 bg-gray-200 rounded-r-2xl'>
                    <div className='text-right text-gray-900 font-bold'><span className='text-gray-500'>Digi</span>Sign</div>
                    <div className='py-10 items-center'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create your account</h2>
                        <div className='border-2 w-10 border-gray-900 inline-block mb-2'></div>
                        <div className='flex justify-center mb-2'>
                            <button onClick={handleSignUp} className="flex px-4 py-2 border gap-2 border-slate-700 rounded-lg text-gray-700 hover:bg-gray-800 hover:border-gray-800 hover:text-slate-300 hover:shadow transition duration-150">
                                <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                <span className='text-sm'>Sign up with Google</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='text-gray-500 my-3'>or create your social login account</div>
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
                            <div className="flex flex-col items-center mb-3">
                                <div className="bg-gray-100 flex w-64 p-2 rounded-lg">
                                    <MdLockOutline className='text-gray-400 mr-2' />
                                    <input required onChange={(e) => setRepassword(e.target.value)} type="password" name="repassword" placeholder='re-enter password' className='bg-gray-100 outline-none text-gray-800 text-sm flex-1'></input>
                                </div>
                            </div>
                            <button type='submit' className='border-2 border-gray-700 text-gray-900 rounded-full px-12 py-2 inline-block font-semibold transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white'>Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
} 