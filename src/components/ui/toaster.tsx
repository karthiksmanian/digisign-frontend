import { ToastContainer } from "react-toastify";
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <ToastContainer
      theme="dark"
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
  )
}

export default Toaster