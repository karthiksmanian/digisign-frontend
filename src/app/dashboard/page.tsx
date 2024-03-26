"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, TableMetaData } from "./components/Table";
import UploadPdf from "./components/UploadPdf";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetPdfDetails } from "./api/get-pdf-details";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TableMetaData[]>();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState<string>("#");
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("user") == "" && router.push("/auth");
    const userJSONString: string | null = localStorage.getItem("user");
    const userJSON = JSON.parse(userJSONString ? userJSONString : "");
    setEmail(userJSON.email || "#");

    try {
      GetPdfDetails().then((results) => {
        setData(
          results &&
            results.pdfs.map((result: any) => {
              return {
                file_id: result.file_id,
                filename: result.filename,
              };
            })
        );
      });
    } catch (e) {
      // console.log(e);
    }
  }, []);

  return (
    <div>
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
      <NavBar popUp={showPopup} setPopUp={setShowPopup} email={email} />
      <DataTable data={data ? data : []} />
      {showPopup && <UploadPdf setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Dashboard;
