"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, TableMetaData } from "./components/table";
import { getPdfDetails, getPdfDetailsToSign } from "./api/get-pdf-details";
import UploadPdf from "./components/upload-pdf";
import NavBar from "./components/nav-bar";
import Toaster from "@/components/ui/toaster";
import SideMenu from "./components/sidemenu";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TableMetaData[]>();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState<string>("#");
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Added Documents");

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
        let results;
        if (selectedOption === "Added Documents") {
          results = await getPdfDetails();
        } else if (selectedOption === "Documents to be signed") {
          results = await getPdfDetailsToSign();
        }
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
  }, [router, selectedOption]);

  const handleOptionSelect = async (option: string) => {
    if (option !== selectedOption) {
      console.log(`Selected option changed: ${option}`);
      setSelectedOption(option);
    }
  };

  return (
    <div>
      <Toaster />
      <NavBar popUp={showPopup} setPopUp={setShowPopup} email={email} />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <SideMenu onSelectOption={handleOptionSelect} />
        <DataTable data={data ? data : []} />
      </div>
      {showPopup && <UploadPdf setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Dashboard;
