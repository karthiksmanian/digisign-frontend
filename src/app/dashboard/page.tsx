"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, TableMetaData } from "./components/table";
import { getPdfDetails } from "./api/get-pdf-details";
import UploadPdf from "./components/upload-pdf";
import NavBar from "./components/nav-bar";
import Toaster from "@/components/ui/toaster";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TableMetaData[]>();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState<string>("#");
  const router = useRouter();

  useEffect(() => {
    const userJSONString: string | null = localStorage.getItem("user");
    if (!userJSONString) {
      router.push("/auth");
      return;
    }

    const userJSON = JSON.parse(userJSONString);
    setEmail(userJSON.email || "#");

    const fetchPdfDetails = async () => {
      try {
        const results = await getPdfDetails();
        if (results && results.pdfs) {
          const formattedData = results.pdfs.map((result: any) => ({
            file_id: result.file_id,
            filename: result.filename,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPdfDetails();
  }, [router]);

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
