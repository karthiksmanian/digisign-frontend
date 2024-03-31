import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { transporter, mailOptions } from '../api/nodemailer';
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export const ShareModal: React.FC<{ fileId: string; fileName: string; sharedTo: { [key: string]: boolean }, onClose: () => void; }> = ({ fileId, fileName, sharedTo, onClose }) => {

  const [email, setEmail] = useState('');
  const falseArray: string[] = [];
  const trueArray: string[] = [];

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

  const handleShare = () => {

  }

  useEffect(() => {
    for (const key in sharedTo) {
      if (sharedTo.hasOwnProperty(key)) {
        if (sharedTo[key] === false) {
          falseArray.push(key);
        } else if (sharedTo[key] === true) {
          trueArray.push(key);
        }
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-60 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-white p-5 rounded-lg shadow-lg z-10">
        <div className="flex mb-2 gap-3">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to share..."
            className="bg-gray-100 p-2 rounded-md outline-none text-gray-800 text-sm flex-1"
          />
          <Button className="bg-blue-600 hover:bg-blue-900" onClick={handleShare}>Share</Button>
        </div>
        <ul className="text-lg font-bold mb-2 font-bold text-sm">Yet to sign</ul>
        <ul className="text-lg font-bold mb-2 font-bold text-sm">Signed</ul>
        {/* <Button className="bg-blue-600 hover:bg-blue-900" onClick={sendEmail}>Invite</Button> */}
        <Button variant="outline" className="text-red-500 hover:text-red-500" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
