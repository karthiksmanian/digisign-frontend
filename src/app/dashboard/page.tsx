'use client'

import React, { useEffect } from "react"
import { useRouter } from 'next/navigation';
import { DataTable } from "./components/Table";
import { auth } from '../../context/firebase-config'
import { signOut } from "firebase/auth"
import UploadPdf from "./components/UploadPdf";
import NavBar from "./components/NavBar";

const EditorPage: React.FC = () => {
  const router = useRouter()

  const handleLogOut = async () => {
    await signOut(auth)
    localStorage.setItem('user', '')
    router.push('/auth')
  }

  const handleUploadPdf = () => {
    
  }

  useEffect(() => {
    localStorage.getItem('user') === '' && router.push('/auth')
  }, [])

  return (
    <div className="">
      <NavBar />
      <button onClick={handleLogOut} className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
      <button onClick={handleUploadPdf} className="absolute top-0 right-0 mt-4 mr-20 px-4 py-2 bg-blue-500 text-white rounded">Upload Pdf</button>
      <h1>Editor Page</h1>
      <DataTable />
      <UploadPdf />
      {/* Add your editor-related content here */}
    </div>
  );
};

export default EditorPage;
