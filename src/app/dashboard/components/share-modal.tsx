import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { transporter, mailOptions } from '../api/nodemailer';
import { toast } from "react-toastify";

export const ShareModal: React.FC<{ fileId: string; fileName: string; sharedTo: { [key: string]: boolean }, onClose: () => void; }> = ({ fileId, fileName, sharedTo, onClose }) => {

  const [email, setEmail] = useState('');
  const [sentForSigning, setSentForSigning] = useState<string[]>([]);
  const [signedUsers, setSignedUsers] = useState<string[]>([]);

  // const sendEmail = async () => {
  //   try {
  //     await transporter.sendMail({
  //       ...mailOptions,
  //       text: "Greetings! You have a document to sign...",
  //       html: "<h1>PSG Tech Digi Sign</h1><p>" + fileId + filename + "</p>"
  //     });
  //     toast.success('Invite sent successfully!')
  //   } catch(error: any) {
  //     toast.error(error);
  //   } 
  // }

  interface SharePDFRequest {
    emails: string[];
    file_ids: string[];
  }

  const updateSharedTo = async (email: string, fileId: string) => {
    try {
      const requestBody: SharePDFRequest = {
        emails: [email],
        file_ids: [fileId]
      };

      const response = await fetch("http://localhost:8001/pdfs/share", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to share PDF');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleShare = async () => {
    try {
      if (!isValidEmail(email)) {
        toast.error('Invalid Email!');
        return
      }
      await updateSharedTo(email, fileId);
      setSentForSigning(prevArray => [...prevArray, email]);
      toast.success('Pdf shared to ' + email)
    } catch (error: any) {
      toast.error(error as string)
    }
  }

  const populateArrays = () => {
    const falseKeys: string[] = [];
    const trueKeys: string[] = [];

    Object.entries(sharedTo).forEach(([key, value]) => {
      if (value) {
        trueKeys.push(key);
      } else {
        falseKeys.push(key);
      }
    });

    setSentForSigning(falseKeys);
    setSignedUsers(trueKeys);
  };

  useEffect(() => {
    populateArrays();
  }, [sharedTo]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-60 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-white p-5 rounded-lg shadow-lg z-10">
        <div className="flex mb-3 gap-3">
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to share..."
            className="bg-gray-100 p-2 rounded-md outline-blue-200 text-gray-800 text-sm flex-1"
          />
          <Button className="bg-blue-600 hover:bg-blue-900" onClick={handleShare}>Share</Button>
        </div>
        <div className="text-lg bg-gray-800 text-white rounded-md cursor-default py-2 text-center font-semibold mb-2 text-sm">Sent for signing</div>
        <ul className="text-lg mb-2 text-sm">
          {
            sentForSigning.map((row, index) => {
              return <li className={`text-center p-1 ${index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-100'}`} key={index}>{row}</li>;
            })
          }
        </ul>
        <div className="text-lg bg-gray-800 text-white rounded-md cursor-default py-2 text-center font-semibold mb-2 text-sm">Signed</div>
        <ul className="text-lg mb-2 text-sm">
          {
            signedUsers.map((row, index) => {
              return <li className={`text-center p-1 ${index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-100'}`} key={index}>{row}</li>;
            })
          }
        </ul>
        <div className="flex justify-end">
          <Button variant="outline" className="text-red-500 hover:text-red-500" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
