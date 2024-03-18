// `app/page.tsx` is the UI for the `/` URL
'use client'
import Attachments from './components/Attachments';
import { useEffect } from "react"
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()
    useEffect(() => {
        localStorage.getItem('user') === '' && router.push('/auth')
    },[])
    return <Attachments/>
}