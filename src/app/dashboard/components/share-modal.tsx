import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { removeShare } from '../api/remove-share'

export const ShareModal: React.FC<{ fileId: string; fileName: string; sharedTo: { [key: string]: boolean }, onClose: () => void; }> = ({ fileId, fileName, sharedTo, onClose }) => {

  const [email, setEmail] = useState('');
  const [sentForSigning, setSentForSigning] = useState<string[]>([]);
  const [signedUsers, setSignedUsers] = useState<string[]>([]);

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

      const userJson = localStorage.getItem('user');
      if (!userJson) {
        throw new Error('User data not found in localStorage');
      }

      const user = JSON.parse(userJson);
      const accessToken: string = user.stsTokenManager.accessToken;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdfs/share`, {
        method: 'POST',
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to share PDF');
      }
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
        toast.warning('Enter valid email!');
        return
      }
      await updateSharedTo(email, fileId);
      setSentForSigning(prevArray => [...prevArray, email]);
      toast.success('Pdf shared to ' + email);
      setEmail('');
    } catch (error: any) {
      toast.error(error as string)
    }
  }

  const handleRemoveShare = async (index: number) => {
    try {
      var emailToRemove: string = sentForSigning[index];
      const response: boolean = await removeShare(fileId, emailToRemove);
      if (response) {
        var new_emails = sentForSigning.filter((email) => email !== emailToRemove)
        setSentForSigning(new_emails)
        toast.success('Share access removed');
      }
    } catch (e: any) {
      toast.error(e as string);
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
            value={email}
            placeholder="Enter email to share..."
            className="bg-gray-100 p-2 border rounded-md outline-blue-200 text-gray-800 text-sm flex-1"
          />
          <Button className="bg-blue-600 hover:bg-blue-900" onClick={handleShare}>Share</Button>
        </div>
        <div className="text-lg bg-gray-800 text-white rounded-md cursor-default py-2 text-center font-semibold mb-2 text-sm">Yet to sign</div>
        <ul className="text-lg mb-2 text-sm">
          {
            sentForSigning.map((row, index) => {
              return (
                (index != 0) ?
                  <div className="flex w-full items-center justify-between">
                    <li className='text-center w-full py-1 px-4 rounded border m-1 bg-gray-200' key={index}>{row}</li>
                    <div className="mr-1">
                      <FaTrash title='remove access' className="cursor-pointer mx-3 text-red-700 hover:text-red-500" onClick={() => handleRemoveShare(index)} />
                    </div>
                  </div>
                  :
                  <div className="flex w-full items-center justify-between">
                    <li className='text-center w-full py-1 px-4 rounded border m-1 bg-gray-300' key={index}>{row} (you)</li>
                  </div>
              );
            })
          }
        </ul>
        <div className="text-lg bg-gray-800 text-white rounded-md cursor-default py-2 text-center font-semibold mb-2 text-sm">Signed</div>
        <ul className="text-lg mb-2 text-sm">
          {
            signedUsers.map((row, index) => {
              return <li className='text-center w-full py-1 px-4 rounded border m-1 bg-gray-200' key={index}>{row}</li>;
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
