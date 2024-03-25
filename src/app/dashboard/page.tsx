'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { DataTable } from "./components/Table";
import UploadPdf from "./components/UploadPdf";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditorPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter()

  useEffect(() => {
    localStorage.getItem('user') === '' && router.push('/auth')
  }, [])

  return (
    <div className="">
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
      <NavBar popUp={showPopup} setPopUp={setShowPopup} user={{email:'abishek@gmail.com'}}/>
      <DataTable />
      {showPopup &&
        <UploadPdf setShowPopup={setShowPopup} />}
    </div>
  );
};

export default EditorPage;
