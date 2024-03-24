'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { DataTable } from "./components/Table";
import UploadPdf from "./components/UploadPdf";
import NavBar from "./components/NavBar";

const EditorPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter()

  useEffect(() => {
    localStorage.getItem('user') === '' && router.push('/auth')
  }, [])

  return (
    <div className="">
      <NavBar popUp={showPopup} setPopUp={setShowPopup} />
      <DataTable />
      {showPopup &&
        <UploadPdf setShowPopup={setShowPopup} />}
    </div>
  );
};

export default EditorPage;
