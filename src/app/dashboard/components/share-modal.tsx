import { useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { transporter, mailOptions } from '../api/nodemailer';
import { toast } from "react-toastify";

export const ShareModal: React.FC<{ fileId: string; fileName: string; sharedTo: { [key: string]: boolean }, onClose: () => void; }> = ({ fileId, fileName, sharedTo, onClose }) => {

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

  const handleInvite = () => {

  }

  useEffect(() => {
    const falseArray: string[] = [];
    const trueArray: string[] = [];

    for (const key in sharedTo) {
      if (sharedTo.hasOwnProperty(key)) {
        if (sharedTo[key] === false) {
          falseArray.push(key);
        } else if (sharedTo[key] === true) {
          trueArray.push(key);
        }
      }
    }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10">
        <div className="text-lg font-bold mb-2">File Details</div>
        <div className="mb-2"><strong>File ID:</strong> {fileId}</div>
        <div><strong>Filename:</strong> {fileName}</div>
        <div className="mt-4 flex justify-between">
          {/* <Button className="bg-blue-600 hover:bg-blue-900" onClick={sendEmail}>Invite</Button> */}
          <Button className="bg-blue-600 hover:bg-blue-900" onClick={handleInvite}>Invite</Button>
          <Button variant="outline" className="text-red-500 hover:text-red-500" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
