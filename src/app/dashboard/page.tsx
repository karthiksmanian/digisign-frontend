"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, TableMetaData } from "./components/table";
import UploadPdf from "./components/upload-pdf";
import NavBar from "./components/nav-bar";
import { getPdfDetails } from "./api/get-pdf-details";
import Toaster from "@/components/ui/toaster";

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
      getPdfDetails().then((results) => {
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
      console.log(e);
    }
  }, []);

  return (
    <div>
      <Toaster />
      <NavBar popUp={showPopup} setPopUp={setShowPopup} email={email} />
      <DataTable data={data ? data : []} />
      {showPopup && <UploadPdf setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Dashboard;
